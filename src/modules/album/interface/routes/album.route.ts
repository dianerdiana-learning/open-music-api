import { Router } from 'express';

import { albumController } from '../controllers/album.controller.js';
import { createAlbumSchema } from '../../application/validators/create-album.schema.js';
import { updateAlbumSchema } from '../../application/validators/update-album.schema.js';

import { validateBody } from '@/middlewares/validate-body.js';
import { validateParams } from '@/middlewares/validate-params.js';
import { uploadMiddleware } from '@/middlewares/upload-middleware.js';
import { authenticateToken } from '@/middlewares/authenticate-token.js';

import { uuidSchema } from '@/shared/validators/uuid.schema.js';

const router = Router();

router.post('/', validateBody(createAlbumSchema), albumController.createAlbum);
router.get('/:id', validateParams(uuidSchema('id')), albumController.getAlbumById);
router.put(
  '/:id',
  validateParams(uuidSchema('id')),
  validateBody(updateAlbumSchema),
  albumController.updateAlbum,
);
router.delete('/:id', validateParams(uuidSchema('id')), albumController.deleteAlbum);
router.post(
  '/:id/covers',
  validateParams(uuidSchema('id')),
  uploadMiddleware('cover'),
  albumController.uploadCover,
);

// Album Like
router.post(
  '/:id/likes',
  validateParams(uuidSchema('id')),
  authenticateToken,
  albumController.addAlbumLike,
);

router.delete(
  '/:id/likes',
  validateParams(uuidSchema('id')),
  authenticateToken,
  albumController.deleteAlbumLike,
);

router.get('/:id/likes', validateParams(uuidSchema('id')), albumController.getAlbumLikeCount);

export { router as albumRoute };
