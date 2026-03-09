import { authRepository } from '../../infrastructure/repositories/auth.repository.js';
import type { RefreshTokenDto } from '../dtos/refresh-token.dto.js';

import { tokenManager } from '@/shared/security/jwt.service.js';
import { BadRequestError } from '@/shared/errors/app-error.js';

export const deleteAuthUseCase = async (dto: RefreshTokenDto) => {
  const { refreshToken } = dto;
  const { id } = tokenManager.verifyToken(refreshToken, 'refresh');
  const auth = await authRepository.findByUserId(id);

  if (!auth || auth.refreshToken !== refreshToken) {
    throw new BadRequestError('Invalid token');
  }

  const deleted = await authRepository.delete(auth);
  return deleted;
};
