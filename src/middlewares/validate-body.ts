import type { NextFunction, Request, Response } from 'express';
import type { Schema } from 'joi';

export const validateBody =
  (schema: Schema) => async (req: Request, _res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: false,
    });

    if (error) {
      throw error;
    }

    req.validated = value;

    next();
  };
