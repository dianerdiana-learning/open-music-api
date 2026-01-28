import { userRepository } from '@/modules/user/infrastructure/repositories/user.repository.js';
import { playlistRepository } from '../../infrastructure/repositories/playlist.repository.js';

import { ForbiddenError, NotFoundError, UnauthorizedError } from '@/shared/errors/app-error.js';
import { playlistSongActivityRepository } from '@/modules/playlist-song-activity/infrastructure/repositories/playlist-song-activity.repository.js';

export const getPlaylistActivityListUseCase = async (playlistId: string, userId: string) => {
  const user = await userRepository.findById(userId);
  if (!user) throw new UnauthorizedError('Invalid Credentials');

  const playlist = await playlistRepository.findById(playlistId);
  if (!playlist) throw new NotFoundError('Playlist is not found');

  const owner = playlist.owner === userId;
  if (!owner) throw new ForbiddenError('Forbidden request');

  const activites = await playlistSongActivityRepository.findAllByPlaylistId(playlistId);

  return {
    playlist,
    activites,
  };
};
