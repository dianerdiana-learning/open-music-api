import { userRepository } from '@/modules/user/infrastructure/repositories/user.repository.js';
import { playlistRepository } from '../../infrastructure/repositories/playlist.repository.js';

import { ForbiddenError, NotFoundError, UnauthorizedError } from '@/shared/errors/app-error.js';
import { playlistSongRepository } from '@/modules/playlist-song/infrastructure/repositories/playlist-song.repository.js';
import { songRepository } from '@/modules/song/infrastructure/repositories/song.repository.js';

export const getPlaylistByIdUseCase = async (playlistId: string, userId: string) => {
  const playlist = await playlistRepository.findById(playlistId);
  if (!playlist) throw new NotFoundError('Playlist is not found');

  const owner = playlist.owner === userId;
  if (!owner) throw new ForbiddenError('Forbidden request');

  const user = await userRepository.findById(userId);
  if (!user) throw new UnauthorizedError('Invalid Credentials');

  const playlistSongs = await playlistSongRepository.findAllByPlaylistIdsOrSongIds([playlistId]);

  const songIds = [...new Set(playlistSongs.map((ps) => ps.songId))];
  const songs = songIds.length ? await songRepository.findByIds(songIds) : [];

  return {
    ...playlist,
    user: user,
    songs,
  };
};
