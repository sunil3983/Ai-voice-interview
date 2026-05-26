import { Router } from 'express';
import { getUserAnalytics } from '../controllers/analytics.controller.js';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { idParamValidator } from '../validators/interview.validators.js';

export const analyticsRouter = Router();

analyticsRouter.get('/user/:id', requireAuth, idParamValidator, validate, getUserAnalytics);
