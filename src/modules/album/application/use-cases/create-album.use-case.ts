import { AlbumEntity } from '../../domain/entities/album.entity.js';
import { albumRepository } from '../../infrastructure/repositories/album.repository.js';
import type { CreateAlbumDto } from '../dtos/create-album.dto.js';

export const createAlbumUseCase = async (dto: CreateAlbumDto) => {
  const album = AlbumEntity.create(dto);
  await albumRepository.save(album);

  return album;
};
