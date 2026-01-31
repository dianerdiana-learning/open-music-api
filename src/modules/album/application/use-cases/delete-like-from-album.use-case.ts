import { deleteLikeFromAlbumService } from '@/modules/album-like/application/services/delete-like-from-album.service.js';
import { albumRepository } from '../../infrastructure/repositories/album.repository.js';

import { NotFoundError } from '@/shared/errors/app-error.js';

export const deleteLikeFromAlbumUseCase = async (userId: string, albumId: string) => {
  const album = await albumRepository.findById(albumId);

  if (!album) throw new NotFoundError('Album is not found');

  const albumLike = await deleteLikeFromAlbumService(userId, albumId);

  return albumLike;
};
