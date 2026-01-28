import type { NextFunction, Response } from 'express';
import { checkFeatureAccessUseCase } from '../../application/use-cases/check-feature-access.use-case.js';
import type { AuthCredential } from '@/shared/types/auth-credential.type.js';
import type { ValidatedAccessRequest } from '../types/validate-access-request.type.js';

export const validateFeatureAccess = async (
  req: ValidatedAccessRequest,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const { id: playlistId } = req.validatedParams;
    const { id: userId } = req.user as AuthCredential;

    const hasAccess = await checkFeatureAccessUseCase(playlistId, userId);
    req.hasAccess = hasAccess;

    next();
  } catch (error) {
    next(error);
  }
};
