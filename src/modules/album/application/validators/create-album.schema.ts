import Joi from 'joi';
import type { CreateAlbumDto } from '../dtos/create-album.dto.js';
import { yearSchema } from '@/shared/validators/year.schema.js';

export const createAlbumSchema = Joi.object<CreateAlbumDto>({
  name: Joi.string().max(50).required(),
  year: yearSchema,
});
