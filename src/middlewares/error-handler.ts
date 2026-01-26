import type { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

import Joi from 'joi';

import { AppError } from '@/shared/errors/app-error.js';
import { response } from '@/shared/utility/response.js';
import { RESPONSE_STATUS } from '@/shared/constants/response-status.js';

export const errorHandler: ErrorRequestHandler = (
  err,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  if (err instanceof AppError) {
    return response.base({
      res,
      code: err.statusCode,
      message: err.message,
      data: null,
      status: RESPONSE_STATUS.fail,
    });
  }

  // Handle Joi validation errors
  if (err instanceof Joi.ValidationError) {
    return response.base({
      res,
      code: 400,
      message: err.details?.[0]?.message.replace(/[\\"]/g, '') || 'Validation Error',
      data: null,
      status: RESPONSE_STATUS.fail,
    });
  }

  const status = err.statusCode || err.status || 500;
  const message = status === 500 ? 'Internal Server Error' : err.message;

  if (status === 500) {
    console.error('Stack Trace:', err.stack);
  }

  return response.base({
    res,
    code: status,
    message,
    data: null,
    status: RESPONSE_STATUS.fail,
  });
};
