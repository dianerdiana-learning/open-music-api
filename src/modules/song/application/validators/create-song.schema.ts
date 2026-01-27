import Joi from 'joi';
import type { CreateSongDto } from '../dtos/create-song.dto.js';
import { yearSchema } from '@/shared/validators/year.schema.js';

export const createSongSchema = Joi.object<CreateSongDto>({
  title: Joi.string().max(50).required(),
  year: yearSchema,
  genre: Joi.string().max(50).required(),
  performer: Joi.string().max(50).required(),
  duration: Joi.number().positive().optional().empty(),
  albumId: Joi.string().uuid().optional().empty(),
});
