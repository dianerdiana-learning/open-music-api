import express, { type Application, type NextFunction, type Request, type Response } from 'express';

import { env } from './configs/env.config.js';
import { errorHandler } from './middlewares/error-handler.js';

import { albumRoute } from './modules/album/interface/routes/album.route.js';

const app: Application = express();
const port = env.app.port;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method.toUpperCase()}: ${req.url}`);
  next();
});
app.use('/albums', albumRoute);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
