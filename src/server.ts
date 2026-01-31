import express, { type Application, type NextFunction, type Request, type Response } from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

import { env } from './configs/env.config.js';
import { rabbitMQConfig } from './configs/rabbitmq.config.js';
import { redisConfig } from './configs/redis.config.js';

import { errorHandler } from './middlewares/error-handler.js';

import { albumRoute } from './modules/album/interface/routes/album.route.js';
import { songRoute } from './modules/song/interface/routes/song.route.js';
import { userRoute } from './modules/user/interface/routes/user.route.js';
import { authRoute } from './modules/auth/interface/routes/auth.route.js';
import { playlistRoute } from './modules/playlist/interface/routes/playlist.route.js';
import { collaborationRoute } from './modules/collaboration/interface/routes/collaboration.route.js';
import { exportRoute } from './modules/export/interface/routes/export.route.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Application = express();
const port = env.app.port;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static Path
const uploadPath = path.join(__dirname, '../uploads');
app.use(express.static(uploadPath));

app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`${req.method.toUpperCase()}: ${req.url}`);
  next();
});
app.use('/albums', albumRoute);
app.use('/songs', songRoute);
app.use('/users', userRoute);
app.use('/authentications', authRoute);
app.use('/playlists', playlistRoute);
app.use('/collaborations', collaborationRoute);
app.use('/export', exportRoute);

app.use(errorHandler);

const startServer = async () => {
  try {
    // 1. Inisialisasi RabbitMQ
    await rabbitMQConfig.connect();
    await redisConfig.connect();

    // 2. Jalankan Express
    const server = app.listen(port, () => {
      console.log(`Server is Fire at http://localhost:${port}`);
    });

    // 3. Graceful Shutdown
    const shutdown = async () => {
      console.log('\n[Server] Shutting down...');
      await rabbitMQConfig.close(); // Menutup channel & koneksi RabbitMQ
      server.close(() => {
        console.log('[Server] HTTP server closed.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
