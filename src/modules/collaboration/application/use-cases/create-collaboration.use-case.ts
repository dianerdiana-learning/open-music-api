import { playlistRepository } from '@/modules/playlist/infrastructure/repositories/playlist.repository.js';
import { userRepository } from '@/modules/user/infrastructure/repositories/user.repository.js';

import type { CollaborationDto } from '../dtos/collaboration.dto.js';
import { CollaborationEntity } from '../../domain/entities/collaboration.entity.js';
import { collaborationRepository } from '../../infrastructure/repositories/collaboration.repository.js';

import { ForbiddenError, NotFoundError } from '@/shared/errors/app-error.js';

export const createCollaborationUseCase = async (ownerId: string, dto: CollaborationDto) => {
  const { playlistId, userId } = dto;

  const playlist = await playlistRepository.findById(playlistId);
  if (!playlist) throw new NotFoundError('Playlist is not found');

  const isOwner = playlist.owner === ownerId;
  if (!isOwner) throw new ForbiddenError('Forbidde Request');

  const user = await userRepository.findById(userId);
  if (!user) throw new NotFoundError('User is not found');

  const collaboration = CollaborationEntity.create(dto);

  await collaborationRepository.save(collaboration);

  return collaboration;
};
