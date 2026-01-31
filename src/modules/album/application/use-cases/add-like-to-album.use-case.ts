import { redisConfig } from '@/configs/redis.config.js';

import { assignLikeToAlbumService } from '@/modules/album-like/application/services/assign-llike-to-album.service.js';
import { findAlbumLikeService } from '@/modules/album-like/application/services/find-album-like.service.js';
import { albumRepository } from '../../infrastructure/repositories/album.repository.js';

import { BadRequestError, NotFoundError } from '@/shared/errors/app-error.js';
import { CACHES } from '@/shared/constants/caches.constant.js';

export const addLikeToAlbumUseCase = async (userId: string, albumId: string) => {
  const album = await albumRepository.findById(albumId);

  if (!album) throw new NotFoundError('Album is not found');

  const existingAlbumLike = await findAlbumLikeService(userId, albumId);
  if (existingAlbumLike) throw new BadRequestError('You already liked this album');

  const albumLike = await assignLikeToAlbumService(userId, albumId);
  await redisConfig.delCache(CACHES.albumLike(albumId));

  return albumLike;
};
