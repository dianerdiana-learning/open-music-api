import Joi from 'joi';
import type { UpdateAlbumDto } from '../dtos/update-album.dto.js';
import { yearSchema } from '@/shared/validators/year.schema.js';

export const updateAlbumSchema = Joi.object<UpdateAlbumDto>({
  name: Joi.string().max(50).required(),
  year: yearSchema,
});
