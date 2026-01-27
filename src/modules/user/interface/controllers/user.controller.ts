import type { Request, Response } from 'express';

import type { CreateUserDto } from '../../application/dtos/create-user.dto.js';
import { createUserUseCase } from '../../application/use-cases/create-user.use-case.js';

import { response } from '@/shared/utility/response.js';

export const userController = {
  createUser: async (req: Request, res: Response) => {
    const dto = req.body as CreateUserDto;

    const user = await createUserUseCase(dto);

    return response.created({ res, data: { userId: user.id } });
  },
};
