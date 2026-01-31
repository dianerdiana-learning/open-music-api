import { albumLikeRepository } from '@/modules/album-like/infrastructure/repositories/album-like.repository.js';
import { albumRepository } from '../../infrastructure/repositories/album.repository.js';
import { NotFoundError } from '@/shared/errors/app-error.js';

export const getAlbumLikeCountUseCase = async (id: string) => {
  const album = await albumRepository.findById(id);
  if (!album) throw new NotFoundError('Album is not found');

  const albumLikes = await albumLikeRepository.findAllByPlaylistIdsOrSongIds([id]);

  return albumLikes.length;
};
