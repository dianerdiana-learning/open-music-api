import Joi from 'joi';
import type { UpdateSongDto } from '../dtos/update-song.dto.js';
import { yearSchema } from '@/shared/validators/year.schema.js';

export const updateSongSchema = Joi.object<UpdateSongDto>({
  title: Joi.string().max(50).required(),
  year: yearSchema,
  genre: Joi.string().max(50).required(),
  performer: Joi.string().max(50).required(),
  duration: Joi.number().positive().optional().empty(),
  albumId: Joi.string().uuid().optional().empty(),
});
