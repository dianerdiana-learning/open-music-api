// prettier-ignore

import { Router } from 'express';

import { albumController } from '../controllers/album.controller.js';
import { paramsIdSchema } from '../../application/validators/params-id.schema.js';
import { createAlbumSchema } from '../../application/validators/create-album.schema.js';
import { updateAlbumSchema } from '../../application/validators/update-album.schema.js';

import { validateBody } from '@/middlewares/validate-body.js';
import { validateParams } from '@/middlewares/validate-params.js';

const router = Router();

router.post('/', validateBody(createAlbumSchema), albumController.createAlbum);
router.get('/:id', validateParams(paramsIdSchema), albumController.getAlbumById);
router.put(
  '/:id',
  validateParams(paramsIdSchema),
  validateBody(updateAlbumSchema),
  albumController.updateAlbum,
);
router.delete('/:id', validateParams(paramsIdSchema), albumController.deleteAlbum);

export { router as albumRoute };
