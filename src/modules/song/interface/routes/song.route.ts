// prettier-ignore

import { Router } from 'express';

import { songController } from '../controllers/song.controller.js';
import { createSongSchema } from '../../application/validators/create-song.schema.js';
import { updateSongSchema } from '../../application/validators/update-song.schema.js';
import { getSongListSchema } from '../../application/validators/get-song-list.schema.js';

import { validateBody } from '@/middlewares/validate-body.js';
import { validateParams } from '@/middlewares/validate-params.js';
import { validateQuery } from '@/middlewares/validate-query.js';

import { uuidSchema } from '@/shared/validators/uuid.schema.js';

const router = Router();

router.get('/', validateQuery(getSongListSchema), songController.getSongList);
router.post('/', validateBody(createSongSchema), songController.createSong);
router.get('/:id', validateParams(uuidSchema('id')), songController.getSongById);
router.put(
  '/:id',
  validateParams(uuidSchema('id')),
  validateBody(updateSongSchema),
  songController.updateSong,
);
router.delete('/:id', validateParams(uuidSchema('id')), songController.deleteSong);

export { router as songRoute };
