import type { UpdateAlbumDto } from '../dtos/update-album.dto.js';
import { albumRepository } from '../../infrastructure/repositories/album.repository.js';

import { NotFoundError } from '@/shared/errors/app-error.js';

export const updateAlbumUseCase = async (id: string, dto: UpdateAlbumDto) => {
  const album = await albumRepository.findById(id);

  if (!album) throw new NotFoundError('Album is not found');

  album.name = dto.name;
  album.year = dto.year;
  album.updatedAt = new Date().toISOString();

  await albumRepository.save(album);

  return album;
};
