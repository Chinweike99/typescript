import { Router } from 'express';
import * as authUser from '../controllers/auth.controllers';
import { rateLimiterMiddleware } from '../middleware/rateLimiter';
import { authenticate } from '../middleware/auth.middleware';
const router = Router();
router.post('/register', rateLimiterMiddleware, authUser.register);
router.post('/login', rateLimiterMiddleware, authUser.login);
router.post('/me', authenticate, authUser.getCurrentUser);
export default router;
