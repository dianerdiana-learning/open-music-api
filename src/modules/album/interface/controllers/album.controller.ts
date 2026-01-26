import { type Request, type Response } from 'express';

import type { CreateAlbumDto } from '../../application/dtos/create-album.dto.js';
import type { UpdateAlbumDto } from '../../application/dtos/update-album.dto.js';

import { createAlbumUseCase } from '../../application/use-cases/create-album.use-case.js';
import { getAlbumByIdUseCase } from '../../application/use-cases/get-album-by-id.use-case.js';
import { updateAlbumUseCase } from '../../application/use-cases/update-album.use-case.js';
import { deleteAlbumUseCase } from '../../application/use-cases/delete-album.use-case.js';

import { AlbumResponse } from '../responses/album.response.js';
import { SongResponse } from '@/modules/song/interface/responses/song.response.js';

import { response } from '@/shared/utility/response.js';

export const albumController = {
  createAlbum: async (req: Request, res: Response) => {
    const payload = req.body as CreateAlbumDto;
    const album = await createAlbumUseCase(payload);

    return response.created({ res, data: { albumId: album.id } });
  },

  getAlbumById: async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await getAlbumByIdUseCase(id);
    const album = new AlbumResponse(result.album);
    const songs = result.songs.map((song) => new SongResponse(song));

    return response.success({
      res,
      data: { album: { ...album, songs } },
    });
  },

  updateAlbum: async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const dto = req.body as UpdateAlbumDto;

    const album = await updateAlbumUseCase(id, dto);

    return response.updated({ res, data: { album: new AlbumResponse(album) } });
  },

  deleteAlbum: async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await deleteAlbumUseCase(id);

    return response.deleted({ res, data: result });
  },
};
