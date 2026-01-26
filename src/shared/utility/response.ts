import type { Response } from 'express';

import { RESPONSE_STATUS } from '../constants/response-status.js';

interface ApiResponsePayload<T = unknown> {
  res: Response;
  status: string;
  data: T | null;
  message: string;
  code: number;
}

interface SpecificPayloadDto {
  res: Response;
  data?: any;
  message?: string;
}

export const response = {
  base: (payload: ApiResponsePayload) => {
    const { res, code, data, message, status } = payload;

    return res.status(code).json({
      code,
      data,
      message,
      status,
    });
  },
  success: (payload: SpecificPayloadDto) => {
    const { res, data, message } = payload;

    return res
      .status(200)
      .json({ data, message: message || 'success', code: 200, status: RESPONSE_STATUS.success });
  },
  created: (payload: SpecificPayloadDto) => {
    const { res, data, message } = payload;

    return res
      .status(201)
      .json({ data, message: message || 'created', code: 200, status: RESPONSE_STATUS.success });
  },
  updated: (payload: SpecificPayloadDto) => {
    const { res, data, message } = payload;

    return res
      .status(200)
      .json({ data, message: message || 'updated', code: 200, status: RESPONSE_STATUS.success });
  },
  deleted: (payload: SpecificPayloadDto) => {
    const { res, data, message } = payload;

    return res
      .status(200)
      .json({ data, message: message || 'deleted', code: 200, status: RESPONSE_STATUS.success });
  },
};
