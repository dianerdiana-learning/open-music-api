import { playlistSongRepository } from '../../infrastructure/repositories/playlist-song.repository.js';

export const deleteSongFromPlaylistService = async (songId: string, playlistId: string) => {
  await playlistSongRepository.delete(playlistId, songId);

  return true;
};
