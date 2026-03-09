import type { Request } from 'express';

export interface ValidatedAccessRequest extends Request {
  hasAccess?: boolean;
}
