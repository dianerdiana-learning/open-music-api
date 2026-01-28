import { songRepository } from '@/modules/song/infrastructure/repositories/song.repository.js';
import { deleteSongFromPlaylistService } from '@/modules/playlist-song/application/services/delete-song-from-playlist.service.js';
import { assignPlaylistActivityService } from '@/modules/playlist-song-activity/application/services/assign-playlist-activity.service.js';

import { playlistRepository } from '../../infrastructure/repositories/playlist.repository.js';
import type { DeleteSongFromPlaylistDto } from '../dtos/delete-song-from-playlist.dto.js';

import { ForbiddenError, NotFoundError } from '@/shared/errors/app-error.js';
import { PLAYLIST_SONG_ACTIVITY_ACTIONS } from '@/shared/constants/playlist-song-activity-actions.constant.js';

export const deleteSongFromPlaylistUseCase = async (dto: DeleteSongFromPlaylistDto) => {
  const { playlistId, songId, userId } = dto;

  const playlist = await playlistRepository.findById(playlistId);
  if (!playlist) throw new NotFoundError('Playlist is not found');

  const isOwner = playlist.owner === userId;
  if (!isOwner) throw new ForbiddenError('Forbidden Request');

  const song = await songRepository.findById(songId);
  if (!song) throw new NotFoundError('Song is not found');

  await deleteSongFromPlaylistService(songId, playlistId);
  await assignPlaylistActivityService({
    playlistId,
    songId,
    userId,
    action: PLAYLIST_SONG_ACTIVITY_ACTIONS.delete,
  });

  return true;
};
