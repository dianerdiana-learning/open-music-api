import type { UserEntity } from '@/modules/user/domain/entities/user.entity.js';
import { userRepository } from '@/modules/user/infrastructure/repositories/user.repository.js';

import { playlistRepository } from '../../infrastructure/repositories/playlist.repository.js';
import { collaborationRepository } from '@/modules/collaboration/infrastructure/repositories/collaboration.repository.js';

export const getAllPlaylistsUseCase = async (userId: string) => {
  const collaborations = await collaborationRepository.findAllByPlaylistIdsOrUserIds(undefined, [
    userId,
  ]);

  const collaborationPlaylistIds = collaborations.map((c) => c.playlistId);
  const allPlaylists = await playlistRepository.findAll(userId, collaborationPlaylistIds);

  const userIds = allPlaylists.map((playlist) => playlist.owner);
  const users = await userRepository.findByIds(userIds);

  const userMap = new Map<string, UserEntity>();

  users.forEach((user) => {
    userMap.set(user.id, user);
  });

  const playlists = allPlaylists.map((playlist) => ({
    ...playlist,
    user: userMap.get(playlist.owner),
  }));

  return playlists;
};
