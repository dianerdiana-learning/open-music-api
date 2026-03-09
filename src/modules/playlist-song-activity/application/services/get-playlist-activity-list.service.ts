import { playlistSongActivityRepository } from '../../infrastructure/repositories/playlist-song-activity.repository.js';

export const getPlaylistActivityListService = async (playlistId: string) => {
  const activites = await playlistSongActivityRepository.findAllByPlaylistId(playlistId);
  return activites;
};
