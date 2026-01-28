import { userRepository } from '@/modules/user/infrastructure/repositories/user.repository.js';
import { collaborationRepository } from '@/modules/collaboration/infrastructure/repositories/collaboration.repository.js';

import { NotFoundError, UnauthorizedError } from '@/shared/errors/app-error.js';

import { playlistRepository } from '../../infrastructure/repositories/playlist.repository.js';

export const checkFeatureAccessUseCase = async (playlistId: string, userId: string) => {
  const playlist = await playlistRepository.findById(playlistId);
  if (!playlist) throw new NotFoundError('Playlist is not found');

  const isOwner = playlist.owner === userId;
  if (isOwner) return true;

  const user = await userRepository.findById(userId);
  if (!user) throw new UnauthorizedError('User is not found');

  const isCollaboratore = await collaborationRepository.findOne(playlistId, userId);

  return !!isCollaboratore;
};
