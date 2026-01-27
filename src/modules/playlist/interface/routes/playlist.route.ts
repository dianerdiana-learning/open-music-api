import { Router } from 'express';

import { authenticateToken } from '@/middlewares/authenticate-token.js';
import { validateBody } from '@/middlewares/validate-body.js';
import { validateParams } from '@/middlewares/validate-params.js';

import { playlistController } from '../controllers/playlist.controller.js';
import { createPlaylistSchema } from '../../application/validators/create-playlist.schema.js';
import { songIdSchema } from '../../application/validators/song-id-schema.schema.js';

import { uuidSchema } from '@/shared/validators/uuid.schema.js';

const router = Router();

// prettier-ignore
{
  router.post('/', authenticateToken, validateBody(createPlaylistSchema), playlistController.createPlaylist);
  router.get('/', authenticateToken, playlistController.getPlaylists);
  router.delete('/:id', authenticateToken, validateParams(uuidSchema('id')), playlistController.deletePlaylist);

  router.post('/:id/songs', authenticateToken, validateParams(uuidSchema('id')), validateBody(songIdSchema), playlistController.addSongToPlaylist);
  router.get('/:id/songs', authenticateToken, validateParams(uuidSchema('id')), playlistController.getPlaylistSongs);
  router.delete('/:id/songs', authenticateToken, validateParams(uuidSchema('id')), validateBody(songIdSchema), playlistController.deleteSongFromPlaylist)
}

export { router as playlistRoute };
