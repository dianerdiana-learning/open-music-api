import Joi from 'joi';
import type { CreateAlbumDto } from '../dtos/create-album.dto.js';

export const createAlbumSchema = Joi.object<CreateAlbumDto>({
  name: Joi.string().required(),
  year: Joi.number().positive().required(),
});
