import { Router } from 'express';
import { aiRouter } from './ai.routes.js';
import { analyticsRouter } from './analytics.routes.js';
import { authRouter } from './auth.routes.js';
import { contactRouter } from './contact.routes.js';
import { interviewRouter } from './interview.routes.js';

export const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/interviews', interviewRouter);
apiRouter.use('/ai', aiRouter);
apiRouter.use('/analytics', analyticsRouter);
apiRouter.use('/contact', contactRouter);
