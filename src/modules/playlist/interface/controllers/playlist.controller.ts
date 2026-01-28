import type { Request, Response } from 'express';

import { UserResponse } from '@/modules/user/interface/responses/user.response.js';
import { PlaylistResponse, PlaylistWithSongsResponse } from '../responses/playlist.response.js';
import { SongResponse } from '@/modules/song/interface/responses/song.response.js';

import type { SongIdDto } from '../../application/dtos/song-id-dto.dto.js';
import type { CreatePlaylistDto } from '../../application/dtos/create-playlist.dto.js';

import { getAllPlaylistsUseCase } from '../../application/use-cases/get-all-playlists.use-case.js';
import { createPlaylistUseCase } from '../../application/use-cases/create-playlist.use-case.js';
import { deletePlaylistUseCase } from '../../application/use-cases/delete-playlist.use-case.js';
import { addSongToPlaylistUseCase } from '../../application/use-cases/add-song-to-playlist.use-case.js';
import { getPlaylistSongsUseCase } from '../../application/use-cases/get-playlist-songs.use-case.js';
import { deleteSongFromPlaylistUseCase } from '../../application/use-cases/delete-song-from-playlist.use-case.js';
import { getPlaylistActivityListUseCase } from '../../application/use-cases/get-playlist-activity-list.use-case.js';
import type { ValidatedAccessRequest } from '../types/validate-access-request.type.js';

import { response } from '@/shared/utility/response.js';
import type { AuthCredential } from '@/shared/types/auth-credential.type.js';

export const playlistController = {
  createPlaylist: async (req: Request, res: Response) => {
    const user = req.user as AuthCredential;
    const dto = req.validatedBody as CreatePlaylistDto;
    const playlist = await createPlaylistUseCase(user.id, dto);

    return response.created({ res, data: { playlistId: playlist.id } });
  },

  getPlaylists: async (req: Request, res: Response) => {
    const user = req.user as AuthCredential;
    const playlists = await getAllPlaylistsUseCase(user.id);

    return response.success({
      res,
      data: {
        playlists: playlists.map(
          (playlist) =>
            new PlaylistResponse({
              ...playlist,
              user: playlist.user ? new UserResponse(playlist.user) : undefined,
            }),
        ),
      },
    });
  },

  addSongToPlaylist: async (req: ValidatedAccessRequest, res: Response) => {
    const { id: playlistId } = req.validatedParams;
    const { songId } = req.validatedBody as SongIdDto;
    const { id: userId } = req.user as AuthCredential;

    const playlist = await addSongToPlaylistUseCase({
      playlistId,
      songId,
      userId,
      hasAccess: req.hasAccess,
    });

    return response.created({ res, data: { playlistId: playlist.id } });
  },

  getPlaylistSongs: async (req: ValidatedAccessRequest, res: Response) => {
    const { id: playlistId } = req.validatedParams;

    const playlist = await getPlaylistSongsUseCase({
      playlistId,
      hasAccess: req.hasAccess,
    });

    return response.success({
      res,
      data: {
        playlist: new PlaylistWithSongsResponse({
          ...playlist,
          songs: playlist.songs.map((song) => new SongResponse(song)),
        }),
      },
    });
  },

  getPlaylistActivites: async (req: Request, res: Response) => {
    const { id } = req.validatedParams;
    const user = req.user as AuthCredential;

    const { playlist, activites } = await getPlaylistActivityListUseCase(id, user.id);
    return response.success({
      res,
      data: {
        playlistId: playlist.id,
        activites,
      },
    });
  },

  deletePlaylist: async (req: Request, res: Response) => {
    const user = req.user as AuthCredential;
    const { id } = req.validatedParams;

    await deletePlaylistUseCase(user.id, id);

    return response.deleted({ res });
  },

  deleteSongFromPlaylist: async (req: ValidatedAccessRequest, res: Response) => {
    const { id: playlistId } = req.validatedParams;
    const { songId } = req.validatedBody as SongIdDto;
    const { id: userId } = req.user as AuthCredential;

    await deleteSongFromPlaylistUseCase({ playlistId, songId, userId, hasAccess: req.hasAccess });

    return response.deleted({ res });
  },
};
