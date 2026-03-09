import 'dotenv/config';

export const env = {
  app: {
    port: process.env.PORT || 5000,
    host: process.env.HOST || 'localhost',
    baseUrl: process.env.BASE_URL || 'http://localhost:5000',
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
  cache: {
    host: process.env.REDIS_SERVER || 'redis://localhost:6379',
  },
};
