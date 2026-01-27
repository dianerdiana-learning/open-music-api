// prettier-ignore

import { Router } from 'express';

import { albumController } from '../controllers/album.controller.js';
import { createAlbumSchema } from '../../application/validators/create-album.schema.js';
import { updateAlbumSchema } from '../../application/validators/update-album.schema.js';

import { validateBody } from '@/middlewares/validate-body.js';
import { validateParams } from '@/middlewares/validate-params.js';

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

export { router as albumRoute };
