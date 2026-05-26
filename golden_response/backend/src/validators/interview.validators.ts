import { body, param } from 'express-validator';

export const createInterviewValidator = [
  body('role').trim().isLength({ min: 2, max: 120 }),
  body('techStack').isArray({ min: 1, max: 12 }),
  body('techStack.*').trim().isLength({ min: 1, max: 40 }),
  body('difficulty').isIn(['Easy', 'Medium', 'Hard']),
  body('questions').optional().isArray({ max: 10 })
];

export const completeInterviewValidator = [
  body('interviewId').isMongoId(),
  body('transcript').isArray({ min: 1 }),
  body('transcript.*.role').isIn(['assistant', 'user', 'system']),
  body('transcript.*.content').trim().isLength({ min: 1 }),
  body('transcript.*.timestamp').isISO8601(),
  body('audioUrl').optional({ nullable: true }).isURL()
];

export const idParamValidator = [param('id').isMongoId()];
