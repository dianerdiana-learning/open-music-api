import { playlistRepository } from '../../infrastructure/repositories/playlist.repository.js';
import type { AddSongToPlaylistDto } from '../dtos/add-song-to-playlist.dto.js';

import { songRepository } from '@/modules/song/infrastructure/repositories/song.repository.js';
import { assignSongToPlaylistService } from '@/modules/playlist-song/application/services/assign-song-to-playlist.service.js';
import { assignPlaylistActivityService } from '@/modules/playlist-song-activity/application/services/assign-playlist-activity.service.js';

import { ForbiddenError, NotFoundError } from '@/shared/errors/app-error.js';
import { PLAYLIST_SONG_ACTIVITY_ACTIONS } from '@/shared/constants/playlist-song-activity-actions.constant.js';

interface Dto extends AddSongToPlaylistDto {
  hasAccess?: boolean | undefined;
}

export const addSongToPlaylistUseCase = async (dto: Dto) => {
  const { playlistId, songId, userId, hasAccess } = dto;

  if (!hasAccess) throw new ForbiddenError('Forbidden Request');

  const playlist = await playlistRepository.findById(playlistId);
  if (!playlist) throw new NotFoundError('Playlist is not found');

  const song = await songRepository.findById(songId);
  if (!song) throw new NotFoundError('Song is not found');

  await assignSongToPlaylistService(songId, playlistId);
  await assignPlaylistActivityService({
    playlistId,
    songId,
    userId,
    action: PLAYLIST_SONG_ACTIVITY_ACTIONS.add,
  });

  return {
    ...playlist,
    song,
  };
};
