import { Router } from 'express';

import { exportPlaylistSchema } from '../../application/validators/export-playlist.schema.js';
import { exportController } from '../controllers/export.controller.js';

import { authenticateToken } from '@/middlewares/authenticate-token.js';
import { validateBody } from '@/middlewares/validate-body.js';
import { validateParams } from '@/middlewares/validate-params.js';
import { uuidSchema } from '@/shared/validators/uuid.schema.js';

const router = Router();

router.post(
  '/playlists/:playlistId',
  authenticateToken,
  validateParams(uuidSchema('playlistId')),
  validateBody(exportPlaylistSchema),
  exportController.exportPlaylist,
);

export { router as exportRoute };
