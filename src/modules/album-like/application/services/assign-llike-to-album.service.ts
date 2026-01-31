import { AlbumLikeEntity } from '../../domain/entities/album-like.entity.js';
import { albumLikeRepository } from '../../infrastructure/repositories/album-like.repository.js';

export const assignLikeToAlbumService = async (userId: string, albumId: string) => {
  const albumLike = AlbumLikeEntity.create({ userId, albumId });

  await albumLikeRepository.save(albumLike);

  return albumLike;
};
