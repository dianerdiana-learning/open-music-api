import { songRepository } from '../../infrastructure/repositories/song.repository.js';
import { NotFoundError } from '@/shared/errors/app-error.js';

export const getSongByIdUseCase = async (id: string) => {
  const song = await songRepository.findById(id);

  if (!song) throw new NotFoundError('Song is not found');

  return song;
};
