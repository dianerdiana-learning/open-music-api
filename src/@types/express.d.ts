/* eslint-disable @typescript-eslint/no-unused-vars */
import * as express from 'express';
import type { AuthCredential } from '@/shared/types/auth-credential.type.ts';

declare global {
  namespace Express {
    interface Request {
      validatedBody?: any;
      validatedQuery?: any;
      validatedParams?: any;
      user?: AuthCredential;
    }
  }
}
