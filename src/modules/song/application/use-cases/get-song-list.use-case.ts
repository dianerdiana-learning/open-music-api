import { songRepository } from '../../infrastructure/repositories/song.repository.js';
import type { GetSongListDto } from '../dtos/get-song-list.dto.js';

export const getSongListUseCase = async (dto: GetSongListDto) => {
  const songs = await songRepository.findAll(dto);
  return songs;
};
