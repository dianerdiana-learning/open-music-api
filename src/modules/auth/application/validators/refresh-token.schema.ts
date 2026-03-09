import Joi from 'joi';
import type { RefreshTokenDto } from '../dtos/refresh-token.dto.js';

export const refreshTokenSchema = Joi.object<RefreshTokenDto>({
  refreshToken: Joi.string().required(),
});
