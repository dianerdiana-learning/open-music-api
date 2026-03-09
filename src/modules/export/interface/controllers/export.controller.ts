import type { Request, Response } from 'express';

import { exportPlaylistUseCase } from '../../application/use-cases/export-playlist.use-case.js';
import type { ExportPlaylistDto } from '../../application/dtos/export-playlist.dto.js';

import type { AuthCredential } from '@/shared/types/auth-credential.type.js';
import { response } from '@/shared/utility/response.js';

export const exportController = {
  exportPlaylist: async (req: Request, res: Response) => {
    const { targetEmail } = req.validatedBody as ExportPlaylistDto;
    const { id: userId } = req.user as AuthCredential;
    const { playlistId } = req.validatedParams;

    await exportPlaylistUseCase({ playlistId, targetEmail, userId });

    return response.created({ res, message: 'Permintaan Anda sedang kami proses' });
  },
};
