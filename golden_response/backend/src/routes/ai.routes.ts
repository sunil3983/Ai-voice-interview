import { Router } from 'express';
import { generateInterviewQuestions } from '../controllers/ai.controller.js';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { generateQuestionsValidator } from '../validators/ai.validators.js';

export const aiRouter = Router();

aiRouter.post('/generate-questions', requireAuth, generateQuestionsValidator, validate, generateInterviewQuestions);
