import { albumLikeRepository } from '@/modules/album-like/infrastructure/repositories/album-like.repository.js';
import { albumRepository } from '../../infrastructure/repositories/album.repository.js';
import { NotFoundError } from '@/shared/errors/app-error.js';
import { redisConfig } from '@/configs/redis.config.js';
import { CACHES } from '@/shared/constants/caches.constant.js';
import { DATA_SOURCES } from '@/shared/constants/data-sources.constant.js';

export const getAlbumLikeCountUseCase = async (id: string) => {
  const cacheKey = CACHES.albumLike(id);
  const cacheValue = await redisConfig.getCache(cacheKey);

  const response = { likes: 0, source: DATA_SOURCES.database };

  console.log({ cacheValue });

  if (cacheValue) {
    response.likes = Number(cacheValue);
    response.source = DATA_SOURCES.cache;
  } else {
    const album = await albumRepository.findById(id);
    if (!album) throw new NotFoundError('Album is not found');

    const cacheEx = 30 * 60;
    const albumLikes = await albumLikeRepository.findAllByPlaylistIdsOrSongIds([id]);
    const count = albumLikes.length;

    await redisConfig.setCache(cacheKey, count, cacheEx);
    response.likes = count;
  }

  return response;
};
