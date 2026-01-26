import { albumRepository } from '../../infrastructure/repositories/album.repository.js';
import { NotFoundError } from '@/shared/errors/app-error.js';

export const deleteAlbumUseCase = async (id: string) => {
  const album = await albumRepository.findById(id);

  if (!album) throw new NotFoundError('Album is not found');

  await albumRepository.delete(id);

  return true;
};
