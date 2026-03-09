import { Router } from 'express';

import { validateBody } from '@/middlewares/validate-body.js';

import { userController } from '../controllers/user.controller.js';
import { createUserSchema } from '../../application/validators/create-user.schema.js';

const router = Router();

router.post('/', validateBody(createUserSchema), userController.createUser);

export { router as userRoute };
