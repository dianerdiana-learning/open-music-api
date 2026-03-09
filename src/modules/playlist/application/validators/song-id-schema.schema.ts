import Joi from 'joi';
import type { SongIdDto } from '../dtos/song-id-dto.dto.js';

export const songIdSchema = Joi.object<SongIdDto>({
  songId: Joi.string().required(),
});
