import { userRepository } from '../../infrastructure/repositories/user.repository.js';

export const GetUserByIdsUseCase = async (userIds: string[]) => {
  const users = await userRepository.findByIds(userIds);

  return users;
};
