import Joi from 'joi';
import type { CreatePlaylistDto } from '../dtos/create-playlist.dto.js';

export const createPlaylistSchema = Joi.object<CreatePlaylistDto>({
  name: Joi.string().min(3).max(50).required(),
});
