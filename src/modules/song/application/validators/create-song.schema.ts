import Joi from 'joi';
import type { CreateSongDto } from '../dtos/create-song.dto.js';

export const createSongSchema = Joi.object<CreateSongDto>({
  title: Joi.string().required(),
  year: Joi.number().positive().required(),
  genre: Joi.string().required(),
  performer: Joi.string().required(),
  duration: Joi.number().positive().optional().empty(),
  albumId: Joi.string().uuid().optional().empty(),
});
