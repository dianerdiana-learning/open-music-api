import { Router } from 'express';

import { authenticateToken } from '@/middlewares/authenticate-token.js';
import { validateBody } from '@/middlewares/validate-body.js';
import { validateParams } from '@/middlewares/validate-params.js';

import { playlistController } from '../controllers/playlist.controller.js';
import { createPlaylistSchema } from '../../application/validators/create-playlist.schema.js';
import { songIdSchema } from '../../application/validators/song-id-schema.schema.js';

import { uuidSchema } from '@/shared/validators/uuid.schema.js';
import { validateFeatureAccess } from '../middlewares/validate-feature-access.middleware.js';

const router = Router();

router.use(authenticateToken);

// POST: create new playlist
router.post('/', validateBody(createPlaylistSchema), playlistController.createPlaylist);

// GET: owned playlists
router.get('/', playlistController.getPlaylists);

// DELETE: playlist
router.delete('/:id', validateParams(uuidSchema('id')), playlistController.deletePlaylist);

// POST: add a song to playlist
router.post(
  '/:id/songs',
  validateParams(uuidSchema('id')),
  validateBody(songIdSchema),
  validateFeatureAccess,
  playlistController.addSongToPlaylist,
);

// GET: playlist with songs
router.get(
  '/:id/songs',
  validateParams(uuidSchema('id')),
  validateFeatureAccess,
  playlistController.getPlaylistSongs,
);

// DELETE: remove a song from playlists
router.delete(
  '/:id/songs',
  validateParams(uuidSchema('id')),
  validateBody(songIdSchema),
  validateFeatureAccess,
  playlistController.deleteSongFromPlaylist,
);

// GET: playlist activities
router.get(
  '/:id/activities',
  validateParams(uuidSchema('id')),
  validateFeatureAccess,
  playlistController.getPlaylistActivites,
);

export { router as playlistRoute };
