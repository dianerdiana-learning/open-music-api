import { songRepository } from '@/modules/song/infrastructure/repositories/song.repository.js';
import { deleteSongFromPlaylistService } from '@/modules/playlist-song/application/services/delete-song-from-playlist.service.js';

import { playlistRepository } from '../../infrastructure/repositories/playlist.repository.js';
import type { DeleteSongFromPlaylistDto } from '../dtos/delete-song-from-playlist.dto.js';

import { ForbiddenError, NotFoundError } from '@/shared/errors/app-error.js';

export const deleteSongFromPlaylistUseCase = async (dto: DeleteSongFromPlaylistDto) => {
  const { playlistId, songId, userId } = dto;

  const playlist = await playlistRepository.findById(playlistId);
  if (!playlist) throw new NotFoundError('Playlist is not found');

  const isOwner = playlist.owner === userId;
  if (!isOwner) throw new ForbiddenError('Forbidden Request');

  const song = await songRepository.findById(songId);
  if (!song) throw new NotFoundError('Song is not found');

  const result = await deleteSongFromPlaylistService(songId, playlistId);

  return result;
};
