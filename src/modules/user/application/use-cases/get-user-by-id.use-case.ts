import { userRepository } from '../../infrastructure/repositories/user.repository.js';
import { NotFoundError } from '@/shared/errors/app-error.js';

export const getUserByIdUseCase = async (userId: string) => {
  const user = await userRepository.findById(userId);

  if (!user) {
    throw new NotFoundError('User is not found');
  }

  return user;
};
