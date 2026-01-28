import { playlistRepository } from '../../infrastructure/repositories/playlist.repository.js';

import { ForbiddenError, NotFoundError } from '@/shared/errors/app-error.js';
import { playlistSongActivityRepository } from '@/modules/playlist-song-activity/infrastructure/repositories/playlist-song-activity.repository.js';
import { songRepository } from '@/modules/song/infrastructure/repositories/song.repository.js';
import { userRepository } from '@/modules/user/infrastructure/repositories/user.repository.js';

interface GetPlaylistActivityListDto {
  playlistId: string;
  hasAccess?: boolean | undefined;
}

export const getPlaylistActivityListUseCase = async (dto: GetPlaylistActivityListDto) => {
  const { playlistId, hasAccess } = dto;

  if (!hasAccess) throw new ForbiddenError('Forbidden request');

  const playlist = await playlistRepository.findById(playlistId);
  if (!playlist) throw new NotFoundError('Playlist is not found');

  const activites = await playlistSongActivityRepository.findAllByPlaylistId(playlistId);
  const songIds: string[] = [];
  const userIds: string[] = [];
  const songMap = new Map();
  const userMap = new Map();

  if (activites.length) {
    activites.forEach((activity) => {
      if (!songIds.includes(activity.songId)) songIds.push(activity.songId);
      if (!userIds.includes(activity.songId)) userIds.push(activity.userId);
    });
  }

  if (songIds.length) {
    const songs = await songRepository.findByIds(songIds);
    songs.forEach((song) => songMap.set(song.id, song));
  }

  if (userIds.length) {
    const users = await userRepository.findByIds(userIds);
    users.forEach((user) => userMap.set(user.id, user));
  }

  return {
    playlist,
    activities: activites.map((activity) => ({
      username: userMap.get(activity.userId).username,
      title: songMap.get(activity.songId).title,
      action: activity.action,
      time: activity.time,
    })),
  };
};
