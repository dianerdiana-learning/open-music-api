import type { UpdateSongDto } from '../dtos/update-song.dto.js';
import { songRepository } from '../../infrastructure/repositories/song.repository.js';

import { NotFoundError } from '@/shared/errors/app-error.js';

export const updateSongUseCase = async (id: string, dto: UpdateSongDto) => {
  const song = await songRepository.findById(id);

  if (!song) throw new NotFoundError('Song is not found');

  song.title = dto.title;
  song.year = dto.year;
  song.genre = dto.genre;
  song.performer = dto.performer;
  song.updatedAt = new Date().toISOString();

  if (dto.duration) song.duration = dto.duration;
  if (dto.albumId) song.albumId = dto.albumId;

  await songRepository.save(song);

  return song;
};
