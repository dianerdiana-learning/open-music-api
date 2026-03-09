import type { NextFunction, Request, Response } from 'express';
import { redisConfig } from '@/configs/redis.config.js';

import { userRepository } from '@/modules/user/infrastructure/repositories/user.repository.js';

import { UnauthorizedError } from '@/shared/errors/app-error.js';
import { tokenManager } from '@/shared/security/jwt.service.js';
import { CACHES } from '@/shared/constants/caches.constant.js';
import { CACHE_EXPIRED_TIME } from '@/shared/constants/cache-expired-time.js';

export const authenticateToken = async (req: Request, _res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (token && token.indexOf('Bearer ') !== -1) {
    try {
      const bearerToken = token.split('Bearer ')[1] || '';
      const { id } = tokenManager.verifyToken(bearerToken, 'access');

      const cacheKey = CACHES.user(id);
      const cacheValue = await redisConfig.getCache(cacheKey);

      if (cacheValue) {
        req.user = cacheValue;
      } else {
        const user = await userRepository.findById(id);
        if (!user) throw new UnauthorizedError('User no longer exists');
        await redisConfig.setCache(cacheKey, JSON.stringify(user), CACHE_EXPIRED_TIME);

        req.user = user;
      }

      return next();
    } catch (error) {
      console.error(error);
      throw new UnauthorizedError('Credential is not valid');
    }
  }

  throw new UnauthorizedError('Credential is not valid');
};
