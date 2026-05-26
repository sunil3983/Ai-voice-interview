import { Router } from 'express';
import { login, me, register } from '../controllers/auth.controller.js';
import { requireAuth } from '../middleware/auth.js';
import { authLimiter } from '../middleware/rateLimiter.js';
import { validate } from '../middleware/validate.js';
import { loginValidator, registerValidator } from '../validators/auth.validators.js';

export const authRouter = Router();

authRouter.post('/register', authLimiter, registerValidator, validate, register);
authRouter.post('/login', authLimiter, loginValidator, validate, login);
authRouter.get('/me', requireAuth, me);
