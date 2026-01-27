import { type Request, type Response } from 'express';

import type { CreateSongDto } from '../../application/dtos/create-song.dto.js';
import type { UpdateSongDto } from '../../application/dtos/update-song.dto.js';
import type { GetSongListDto } from '../../application/dtos/get-song-list.dto.js';

import { createSongUseCase } from '../../application/use-cases/create-song.use-case.js';
import { getSongByIdUseCase } from '../../application/use-cases/get-song-by-id.use-case.js';
import { updateSongUseCase } from '../../application/use-cases/update-song.use-case.js';
import { deleteSongUseCase } from '../../application/use-cases/delete-song.use-case.js';
import { getSongListUseCase } from '../../application/use-cases/get-song-list.use-case.js';

import { SongListResponse, SongResponse } from '../responses/song.response.js';

import { response } from '@/shared/utility/response.js';

export const songController = {
  createSong: async (req: Request, res: Response) => {
    const payload = req.validatedBody as CreateSongDto;
    const song = await createSongUseCase(payload);

    return response.created({ res, data: { songId: song.id } });
  },

  getSongById: async (req: Request, res: Response) => {
    const { id } = req.validatedParams;
    const song = await getSongByIdUseCase(id);

    return response.success({ res, data: { song: new SongResponse(song) } });
  },

  getSongList: async (req: Request, res: Response) => {
    const dto = req.query as GetSongListDto;
    const songs = await getSongListUseCase(dto);

    return response.success({
      res,
      data: { songs: songs.map((song) => new SongListResponse(song)) },
    });
  },

  updateSong: async (req: Request, res: Response) => {
    const { id } = req.validatedParams;
    const dto = req.validatedBody as UpdateSongDto;
    const song = await updateSongUseCase(id, dto);

    return response.updated({ res, data: { song: new SongResponse(song) } });
  },

  deleteSong: async (req: Request, res: Response) => {
    const { id } = req.validatedParams;
    const result = await deleteSongUseCase(id);

    return response.deleted({ res, data: result });
  },
};
