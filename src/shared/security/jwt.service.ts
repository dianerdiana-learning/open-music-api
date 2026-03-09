import jwt from 'jsonwebtoken';

import { env } from '@/configs/env.config.js';
import type { AuthCredential } from '../types/auth-credential.type.js';
import { BadRequestError } from '../errors/app-error.js';

export const tokenManager = {
  generateAccessToken: (payload: AuthCredential): string => {
    return jwt.sign(payload, env.token.accessTokenKey);
  },

  generateRefreshToken: (payload: AuthCredential): string => {
    return jwt.sign(payload, env.token.refreshTokenKey);
  },

  verifyToken: (token: string, type: 'access' | 'refresh'): AuthCredential => {
    try {
      const secret = type === 'access' ? env.token.accessTokenKey : env.token.refreshTokenKey;
      const payload = jwt.verify(token, secret);
      return payload as AuthCredential;
    } catch (error) {
      console.error(error);
      throw new BadRequestError('Token is not valid');
    }
  },
};
