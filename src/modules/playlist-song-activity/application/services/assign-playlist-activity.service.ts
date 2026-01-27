import { PlaylistSongActivityEntity } from '../../domain/entities/playlist-song-activity.entity.js';
import { playlistSongActivityRepository } from '../../infrastructure/repositories/playlist-song-activity.repository.js';
import type { AssignPlaylistActivityDto } from '../dtos/assign-playlist-activity.dto.js';

export const assignPlaylistActivityService = async (dto: AssignPlaylistActivityDto) => {
  const playlistSong = PlaylistSongActivityEntity.create(dto);

  await playlistSongActivityRepository.save(playlistSong);

  return playlistSong;
};
