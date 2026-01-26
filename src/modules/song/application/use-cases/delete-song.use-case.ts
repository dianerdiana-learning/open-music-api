import { songRepository } from '../../infrastructure/repositories/song.repository.js';
import { NotFoundError } from '@/shared/errors/app-error.js';

export const deleteSongUseCase = async (id: string) => {
  const song = await songRepository.findById(id);

  if (!song) throw new NotFoundError('Song is not found');

  await songRepository.delete(id);

  return true;
};
