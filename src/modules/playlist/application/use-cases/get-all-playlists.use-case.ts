import type { UserEntity } from '@/modules/user/domain/entities/user.entity.js';
import { userRepository } from '@/modules/user/infrastructure/repositories/user.repository.js';

import { playlistRepository } from '../../infrastructure/repositories/playlist.repository.js';

export const getAllPlaylistsUseCase = async (userId: string) => {
  const ownPlaylists = await playlistRepository.findAllOwned(userId);
  const userIds = ownPlaylists.map((playlist) => playlist.owner);
  const users = await userRepository.findByIds(userIds);

  const userMap = new Map<string, UserEntity>();

  users.forEach((user) => {
    userMap.set(user.id, user);
  });

  const playlists = ownPlaylists.map((playlist) => ({
    ...playlist,
    user: userMap.get(playlist.owner),
  }));

  return playlists;
};
