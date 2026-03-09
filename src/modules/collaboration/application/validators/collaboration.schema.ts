import Joi from 'joi';
import type { CollaborationDto } from '../dtos/collaboration.dto.js';

export const collaborationSchema = Joi.object<CollaborationDto>({
  playlistId: Joi.string().required(),
  userId: Joi.string().required(),
});
