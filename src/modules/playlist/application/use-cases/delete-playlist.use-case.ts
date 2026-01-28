import { ForbiddenError, NotFoundError, UnauthorizedError } from '@/shared/errors/app-error.js';
import { playlistRepository } from '../../infrastructure/repositories/playlist.repository.js';
import { userRepository } from '@/modules/user/infrastructure/repositories/user.repository.js';

export const deletePlaylistUseCase = async (userId: string, playlistId: string) => {
  const user = await userRepository.findById(userId);
  if (!user) throw new UnauthorizedError('Invalid Credentials');

  const playlist = await playlistRepository.findById(playlistId);
  if (!playlist) throw new NotFoundError('Playlist is not found');

  const isOwner = playlist.owner === userId;
  if (!isOwner) throw new ForbiddenError('Forbidden Request');

  const deleted = await playlistRepository.delete(playlist);
  return deleted;
};
