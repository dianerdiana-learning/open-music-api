import type { CreateUserDto } from '../dtos/create-user.dto.js';
import { userRepository } from '../../infrastructure/repositories/user.repository.js';
import { UserEntity } from '../../domain/entities/user.entity.js';

import { BadRequestError } from '@/shared/errors/app-error.js';
import { passwordService } from '@/shared/security/password.service.js';

export const createUserUseCase = async (dto: CreateUserDto) => {
  const { fullname, username, password } = dto;
  const existingUsername = await userRepository.findByUsername(username);

  if (existingUsername) {
    throw new BadRequestError('Username has already been taken');
  }

  const hashPassword = await passwordService.hash(password);
  const user = UserEntity.create({ fullname, username, password: hashPassword });

  await userRepository.save(user);

  return user;
};
