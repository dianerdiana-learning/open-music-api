import { UnauthorizedError } from '@/shared/errors/app-error.js';
import { tokenManager } from '@/shared/security/jwt.service.js';
import type { NextFunction, Request, Response } from 'express';

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (token && token.indexOf('Bearer ') !== -1) {
    try {
      const bearerToken = token.split('Bearer ')[1] || '';
      const user = tokenManager.verifyToken(bearerToken, 'access');
      req.user = user;
      return next();
    } catch (error) {
      console.error(error);
      throw new UnauthorizedError('Credential is not valid');
    }
  }

  throw new UnauthorizedError('Credential is not valid');
};
