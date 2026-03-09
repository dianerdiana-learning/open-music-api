import { albumRepository } from '../../infrastructure/repositories/album.repository.js';
import { songRepository } from '@/modules/song/infrastructure/repositories/song.repository.js';
import { NotFoundError } from '@/shared/errors/app-error.js';

export const getAlbumByIdUseCase = async (id: string) => {
  const album = await albumRepository.findById(id);

  if (!album) throw new NotFoundError('Album is not found');

  const songs = await songRepository.findAll({ filters: [{ field: 'album_id', value: album.id }] });

  return {
    album,
    songs,
  };
};
