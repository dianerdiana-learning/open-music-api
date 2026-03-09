import { userRepository } from '@/modules/user/infrastructure/repositories/user.repository.js';
import { playlistSongRepository } from '@/modules/playlist-song/infrastructure/repositories/playlist-song.repository.js';
import { songRepository } from '@/modules/song/infrastructure/repositories/song.repository.js';

import { playlistRepository } from '../../infrastructure/repositories/playlist.repository.js';

import { ForbiddenError, NotFoundError, UnauthorizedError } from '@/shared/errors/app-error.js';

interface GetPlaylistSongsDto {
  playlistId: string;
  hasAccess?: boolean | undefined;
}

export const getPlaylistSongsUseCase = async (dto: GetPlaylistSongsDto) => {
  const { playlistId, hasAccess } = dto;

  if (!hasAccess) throw new ForbiddenError('Forbidden request');

  const playlist = await playlistRepository.findById(playlistId);
  if (!playlist) throw new NotFoundError('Playlist is not found');

  const user = await userRepository.findById(playlist.owner);
  if (!user) throw new UnauthorizedError('Invalid Credentials');

  const playlistSongs = await playlistSongRepository.findAllByPlaylistIdsOrSongIds([playlistId]);

  const songIds = [...new Set(playlistSongs.map((ps) => ps.songId))];
  const songs = songIds.length ? await songRepository.findByIds(songIds) : [];

  return {
    ...playlist,
    user,
    songs,
  };
};
