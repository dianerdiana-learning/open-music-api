import { createClient, type RedisClientType } from 'redis';
import { env } from './env.config.js';

const CACHE_EXPIRED_TIME = 60 * 30;

export class RedisConfig {
  private client: RedisClientType;

  constructor() {
    this.client = createClient({
      socket: {
        host: env.cache.host,
      },
    });
  }

  async connect() {
    if (this.client.isOpen) {
      console.log('[Redis]: Client is already connected');
    }

    this.client.on('error', (err) => console.error('[Redis]: Client Error ', err));
    await this.client.connect();
    console.log('[Redis]: Connected successfuly');
  }

  async setCache(key: string, value: any, ttl: number = CACHE_EXPIRED_TIME) {
    const data = typeof value === 'string' ? value : JSON.stringify(value);
    await this.client.setEx(key, ttl, data);
  }

  async getCache(key: string): Promise<any | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }

    return JSON.parse(data);
  }

  async delCache(key: string) {
    await this.client.del(key);
  }
}

export const redisConfig = new RedisConfig();
