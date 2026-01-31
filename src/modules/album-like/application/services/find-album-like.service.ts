import { albumLikeRepository } from '../../infrastructure/repositories/album-like.repository.js';

export const findAlbumLikeService = async (userId: string, albumId: string) => {
  const albumLike = await albumLikeRepository.findOne(userId, albumId);

  return albumLike;
};
