import { SongEntity } from '../../domain/entities/song.entity.js';
import { songRepository } from '../../infrastructure/repositories/song.repository.js';
import type { CreateSongDto } from '../dtos/create-song.dto.js';

export const createSongUseCase = async (dto: CreateSongDto) => {
  const song = SongEntity.create(dto);
  await songRepository.save(song);

  return song;
};
