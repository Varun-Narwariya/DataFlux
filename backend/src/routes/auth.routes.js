// routes/auth.routes.js
import { Router } from 'express';
import { AuthController } from '../controllers/auth/auth.controller.js';
import { authenticate }   from '../middlewares/auth.middleware.js';

export const authRouter = Router();
authRouter.post('/register', AuthController.register);
authRouter.post('/login',    AuthController.login);
authRouter.get('/me',        authenticate, AuthController.me);
