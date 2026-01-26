import Joi from 'joi';
import type { UpdateSongDto } from '../dtos/update-song.dto.js';

export const updateSongSchema = Joi.object<UpdateSongDto>({
  title: Joi.string().required(),
  year: Joi.number().positive().required(),
  genre: Joi.string().required(),
  performer: Joi.string().required(),
  duration: Joi.number().positive().optional().empty(),
  albumId: Joi.string().uuid().optional().empty(),
});
