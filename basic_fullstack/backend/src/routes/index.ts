import { Router } from 'express';
import * as authController from '../controllers/auth.controllers'

const router = Router();

// Auth routes
router.post('/auth/register', authController.register );
router.get('/auth/verify', authController.verify);
router.post('/auth/login', authController.login);
router.get('/auth/logout', authController.logout);
router.post('/auth/forgot-password', authController.forgot);
router.post('/auth/reset-password', authController.reset);

export default router;


