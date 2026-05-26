import { body } from 'express-validator';

export const generateQuestionsValidator = [
  body('role').trim().isLength({ min: 2, max: 120 }),
  body('techStack').isArray({ min: 1, max: 12 }),
  body('techStack.*').trim().isLength({ min: 1, max: 40 }),
  body('difficulty').isIn(['Easy', 'Medium', 'Hard'])
];
