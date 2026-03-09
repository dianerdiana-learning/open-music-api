import { albumLikeRepository } from '../../infrastructure/repositories/album-like.repository.js';

export const deleteLikeFromAlbumService = async (userId: string, albumId: string) => {
  await albumLikeRepository.delete(albumId, userId);

  return true;
};
