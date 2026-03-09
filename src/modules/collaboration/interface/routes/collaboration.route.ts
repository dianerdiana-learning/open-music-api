import { Router } from 'express';

import { authenticateToken } from '@/middlewares/authenticate-token.js';
import { validateBody } from '@/middlewares/validate-body.js';

import { collaborationSchema } from '../../application/validators/collaboration.schema.js';
import { collaborationController } from '../controllers/collaboration.controller.js';

const router = Router();

router.use(authenticateToken, validateBody(collaborationSchema));

router.post('/', collaborationController.createCollaboration);
router.delete('/', collaborationController.deleteCollaboration);

export { router as collaborationRoute };
