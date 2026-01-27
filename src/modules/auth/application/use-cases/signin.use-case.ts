import { userRepository } from '@/modules/user/infrastructure/repositories/user.repository.js';

import { authRepository } from '../../infrastructure/repositories/auth.repository.js';
import { AuthEntity } from '../../domain/entities/auth.entity.js';
import type { SignInDto } from '../dtos/sign-in.dto.js';

import { UnauthorizedError } from '@/shared/errors/app-error.js';
import { tokenManager } from '@/shared/security/jwt.service.js';
import { passwordService } from '@/shared/security/password.service.js';

export const signInUseCase = async (dto: SignInDto) => {
  const { username, password } = dto;

  const user = await userRepository.findByUsername(username);
  if (!user) throw new UnauthorizedError('User is not found');

  const isMatched = await passwordService.compare(password, user.password);
  if (!isMatched) throw new UnauthorizedError('User is not found');

  const accessToken = tokenManager.generateAccessToken({
    userId: user.id,
    username: user.username,
  });
  const refreshToken = tokenManager.generateRefreshToken({
    userId: user.id,
    username: user.username,
  });

  const existingAuth = await authRepository.findByUserId(user.id);

  if (!existingAuth) {
    const auth = AuthEntity.create({ userId: user.id, refreshToken });
    await authRepository.save(auth);
  }

  return { accessToken, refreshToken };
};
