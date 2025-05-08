import { Router } from 'express';
import * as authController from '../controllers/auth.controllers'

const router = Router();

// Auth routes
router.post('/auth/register', authController.register );


export default router;


