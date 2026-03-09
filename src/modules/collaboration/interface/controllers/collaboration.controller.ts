import type { Request, Response } from 'express';

import type { CollaborationDto } from '../../application/dtos/collaboration.dto.js';
import { createCollaborationUseCase } from '../../application/use-cases/create-collaboration.use-case.js';
import { deleteCollaborationUseCase } from '../../application/use-cases/delete-collaboration.use-case.js';

import type { AuthCredential } from '@/shared/types/auth-credential.type.js';
import { response } from '@/shared/utility/response.js';

export const collaborationController = {
  createCollaboration: async (req: Request, res: Response) => {
    const dto = req.validatedBody as CollaborationDto;
    const user = req.user as AuthCredential;

    const collaboration = await createCollaborationUseCase(user.id, dto);
    return response.created({ res, data: { collaborationId: collaboration.id } });
  },

  deleteCollaboration: async (req: Request, res: Response) => {
    const dto = req.validatedBody as CollaborationDto;
    const user = req.user as AuthCredential;

    await deleteCollaborationUseCase(user.id, dto);

    return response.deleted({ res });
  },
};
