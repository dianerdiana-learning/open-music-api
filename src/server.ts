import express, { type Application, type NextFunction, type Request, type Response } from 'express';

import { env } from './configs/env.config.js';
import { errorHandler } from './middlewares/error-handler.js';

import { albumRoute } from './modules/album/interface/routes/album.route.js';
import { songRoute } from './modules/song/interface/routes/song.route.js';
import { userRoute } from './modules/user/interface/routes/user.route.js';
import { authRoute } from './modules/auth/interface/routes/auth.route.js';
import { playlistRoute } from './modules/playlist/interface/routes/playlist.route.js';
import { collaborationRoute } from './modules/collaboration/interface/routes/collaboration.route.js';

const app: Application = express();
const port = env.app.port;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method.toUpperCase()}: ${req.url}`);
  next();
});
app.use('/albums', albumRoute);
app.use('/songs', songRoute);
app.use('/users', userRoute);
app.use('/authentications', authRoute);
app.use('/playlists', playlistRoute);
app.use('/collaborations', collaborationRoute);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
