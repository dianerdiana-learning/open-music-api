import { Router } from 'express';

import { validateBody } from '@/middlewares/validate-body.js';
import { authController } from '../controllers/auth.controller.js';

import { signInSchema } from '../../application/validators/sign-in.schema.js';
import { refreshTokenSchema } from '../../application/validators/refresh-token.schema.js';

const router = Router();

router.post('/', validateBody(signInSchema), authController.signIn);
router.put('/', validateBody(refreshTokenSchema), authController.refreshToken);
router.delete('/', validateBody(refreshTokenSchema), authController.deleteToken);

export { router as authRoute };
