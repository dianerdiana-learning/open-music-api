// prettier-ignore

import { Router } from 'express';

import { songController } from '../controllers/song.controller.js';
import { paramsIdSchema } from '../../application/validators/params-id.schema.js';
import { createSongSchema } from '../../application/validators/create-song.schema.js';
import { updateSongSchema } from '../../application/validators/update-song.schema.js';
import { getSongListSchema } from '../../application/validators/get-song-list.schema.js';

import { validateBody } from '@/middlewares/validate-body.js';
import { validateParams } from '@/middlewares/validate-params.js';
import { validateQuery } from '@/middlewares/validate-query.js';

const router = Router();

router.get('/', validateQuery(getSongListSchema), songController.getSongList);
router.post('/', validateBody(createSongSchema), songController.createSong);
router.get('/:id', validateParams(paramsIdSchema), songController.getSongById);
router.put(
  '/:id',
  validateParams(paramsIdSchema),
  validateBody(updateSongSchema),
  songController.updateSong,
);
router.delete('/:id', validateParams(paramsIdSchema), songController.deleteSong);

export { router as songRoute };
