import type { NextFunction, Request, Response } from 'express';
import type { Schema } from 'joi';

import { NotFoundError } from '@/shared/errors/app-error.js';

export const validateParams =
  (schema: Schema) => (req: Request, _res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.params, {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: false,
    });

    if (error) {
      throw new NotFoundError('Data is not found');
    }

    req.validatedParams = value;

    next();
  };
