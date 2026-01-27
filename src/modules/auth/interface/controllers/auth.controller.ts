import { type Request, type Response } from 'express';

import type { SignInDto } from '../../application/dtos/sign-in.dto.js';
import type { RefreshTokenDto } from '../../application/dtos/refresh-token.dto.js';
import { signInUseCase } from '../../application/use-cases/signin.use-case.js';
import { refreshTokenUseCase } from '../../application/use-cases/refresh-token.use-case.js';
import { deleteAuthUseCase } from '../../application/use-cases/delete-auth.use-case.js';

import { response } from '@/shared/utility/response.js';

export const authController = {
  signIn: async (req: Request, res: Response) => {
    const dto = req.body as SignInDto;
    const result = await signInUseCase(dto);

    return response.created({ res, data: result });
  },

  refreshToken: async (req: Request, res: Response) => {
    const dto = req.body as RefreshTokenDto;
    const result = await refreshTokenUseCase(dto);

    return response.success({ res, data: result });
  },

  deleteToken: async (req: Request, res: Response) => {
    const dto = req.body as RefreshTokenDto;
    const result = await deleteAuthUseCase(dto);

    return response.deleted({ res, data: result });
  },
};
