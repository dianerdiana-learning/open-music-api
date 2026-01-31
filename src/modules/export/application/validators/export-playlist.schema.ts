import Joi from 'joi';
import type { ExportPlaylistDto } from '../dtos/export-playlist.dto.js';

export const exportPlaylistSchema = Joi.object<ExportPlaylistDto>({
  targetEmail: Joi.string().email().required(),
});
