import { Router } from 'express';
import { completeInterview, createInterview, getInterview, getUserInterviews } from '../controllers/interview.controller.js';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { completeInterviewValidator, createInterviewValidator, idParamValidator } from '../validators/interview.validators.js';

export const interviewRouter = Router();

interviewRouter.post('/create', requireAuth, createInterviewValidator, validate, createInterview);
interviewRouter.post('/complete', requireAuth, completeInterviewValidator, validate, completeInterview);
interviewRouter.get('/user/:id', requireAuth, idParamValidator, validate, getUserInterviews);
interviewRouter.get('/:id', requireAuth, idParamValidator, validate, getInterview);
