import { body } from 'express-validator';

export const contactValidator = [
  body('name').trim().isLength({ min: 2, max: 100 }),
  body('email').isEmail().normalizeEmail(),
  body('subject').trim().isLength({ min: 2, max: 160 }),
  body('message').trim().isLength({ min: 10, max: 5000 })
];
