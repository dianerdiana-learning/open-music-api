import type { UploadAlbumCoverDto } from '../dtos/upload-album-cover.dto.js';
import { albumRepository } from '../../infrastructure/repositories/album.repository.js';

import { NotFoundError } from '@/shared/errors/app-error.js';

export const uploadAlbumCoverUseCase = async (id: string, dto: UploadAlbumCoverDto) => {
  const album = await albumRepository.findById(id);

  if (!album) {
    throw new NotFoundError('Album is not found');
  }

  album.cover = dto.cover;
  album.updatedAt = new Date().toISOString();

  await albumRepository.save(album);

  return album;
};
