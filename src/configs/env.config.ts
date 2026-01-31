import 'dotenv/config';

export const env = {
  app: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
  },
  db: {
    host: process.env.PGHOST || 'localhost',
    port: Number(process.env.PGPORT) || 5432,
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || 'postgres',
    database: process.env.PGDATABASE || 'dcd_open_music',
  },
  token: {
    accessTokenKey: process.env.ACCESS_TOKEN_KEY || 'accessToken',
    refreshTokenKey: process.env.REFRESH_TOKEN_KEY || 'refreshToken',
  },
  rabbitmq: {
    server: process.env.RABBITMQ_SERVER || 'http://localhost:15672',
  },
  mail: {
    user: process.env.SMTP_USER || 'user@example.com',
    password: process.env.SMTP_PASSWORD || '',
    host: process.env.SMTP_HOST || '',
    port: Number(process.env.SMTP_PORT) || 587,
  },
  cache: {
    host: process.env.REDIS_SERVER || 'redis://localhost:6379',
  },
};
