import { userRepository } from '@/modules/user/infrastructure/repositories/user.repository.js';

import type { CreatePlaylistDto } from '../dtos/create-playlist.dto.js';
import { PlaylistEntity } from '../../domain/entities/playlist.entity.js';
import { playlistRepository } from '../../infrastructure/repositories/playlist.repository.js';

import { UnauthorizedError } from '@/shared/errors/app-error.js';

export const createPlaylistUseCase = async (userId: string, dto: CreatePlaylistDto) => {
  const { name } = dto;

  const user = await userRepository.findById(userId);
  if (!user) throw new UnauthorizedError('Invalid Credentials');

  const playlist = PlaylistEntity.create({ name, owner: userId });

  await playlistRepository.save(playlist);
  return playlist;
};
