import { PlaylistSongEntity } from '../../domain/entities/playlist-song.entity.js';
import { playlistSongRepository } from '../../infrastructure/repositories/playlist-song.repository.js';

export const assignSongToPlaylistService = async (songId: string, playlistId: string) => {
  const playlistSong = PlaylistSongEntity.create({ songId, playlistId });

  await playlistSongRepository.save(playlistSong);

  return playlistSong;
};
