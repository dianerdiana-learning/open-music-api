import { redisConfig } from '@/configs/redis.config.js';

import { deleteLikeFromAlbumService } from '@/modules/album-like/application/services/delete-like-from-album.service.js';
import { albumRepository } from '../../infrastructure/repositories/album.repository.js';

import { NotFoundError } from '@/shared/errors/app-error.js';
import { CACHES } from '@/shared/constants/caches.constant.js';

export const deleteLikeFromAlbumUseCase = async (userId: string, albumId: string) => {
  const album = await albumRepository.findById(albumId);

  if (!album) throw new NotFoundError('Album is not found');

  const albumLike = await deleteLikeFromAlbumService(userId, albumId);
  await redisConfig.delCache(CACHES.albumLike(albumId));

  return albumLike;
};
