import type { NextFunction, Request, Response } from 'express';
import type { Schema } from 'joi';

export const validateQuery =
  (schema: Schema) => (req: Request, _res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.query, {
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
