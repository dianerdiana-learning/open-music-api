import fs from 'fs';

import type { UploadAlbumCoverDto } from '../dtos/upload-album-cover.dto.js';
import { albumRepository } from '../../infrastructure/repositories/album.repository.js';

import { getUploadDir } from '@/shared/utility/get-upload-dir.js';
import { NotFoundError } from '@/shared/errors/app-error.js';

export const uploadAlbumCoverUseCase = async (id: string, payload: UploadAlbumCoverDto) => {
  const album = await albumRepository.findById(id);

  if (!album) {
    throw new NotFoundError('Album is not found');
  }

  const uploadDir = getUploadDir();
  const file = payload.cover;
  const filename = file.hapi.filename;

  const uploadPath = `${uploadDir}/${filename}`;
  const fileStream = fs.createWriteStream(uploadPath);

  file.pipe(fileStream);

  await new Promise<void>((resolve, reject) => {
    fileStream.on('error', reject);
    file.on('end', resolve);
  });

  album.cover = filename;
  album.updatedAt = new Date().toISOString();

  await albumRepository.save(album);

  return album;
};
