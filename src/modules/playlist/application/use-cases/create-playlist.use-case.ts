import type { CreatePlaylistDto } from '../dtos/create-playlist.dto.js';
import { PlaylistEntity } from '../../domain/entities/playlist.entity.js';
import { playlistRepository } from '../../infrastructure/repositories/playlist.repository.js';

export const createPlaylistUseCase = async (userId: string, dto: CreatePlaylistDto) => {
  const { name } = dto;

  const playlist = PlaylistEntity.create({ name, owner: userId });

  await playlistRepository.save(playlist);
  return playlist;
};
