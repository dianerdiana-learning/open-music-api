import Joi from 'joi';
import type { UpdateAlbumDto } from '../dtos/update-album.dto.js';

export const updateAlbumSchema = Joi.object<UpdateAlbumDto>({
  name: Joi.string().required(),
  year: Joi.number().positive().required(),
});
