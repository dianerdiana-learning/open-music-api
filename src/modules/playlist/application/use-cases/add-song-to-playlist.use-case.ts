import { playlistRepository } from '../../infrastructure/repositories/playlist.repository.js';
import type { AddSongToPlaylistDto } from '../dtos/add-song-to-playlist.dto.js';

import { songRepository } from '@/modules/song/infrastructure/repositories/song.repository.js';
import { assignSongToPlaylistService } from '@/modules/playlist-song/application/services/assign-song-to-playlist.service.js';

import { ForbiddenError, NotFoundError } from '@/shared/errors/app-error.js';

export const addSongToPlaylistUseCase = async (dto: AddSongToPlaylistDto) => {
  const { playlistId, songId, userId } = dto;

  const playlist = await playlistRepository.findById(playlistId);
  if (!playlist) throw new NotFoundError('Playlist is not found');

  const isOwner = playlist.owner === userId;
  if (!isOwner) throw new ForbiddenError('Forbidden Request');

  const song = await songRepository.findById(songId);
  if (!song) throw new NotFoundError('Song is not found');

  await assignSongToPlaylistService(songId, playlistId);

  return {
    ...playlist,
    song,
  };
};
