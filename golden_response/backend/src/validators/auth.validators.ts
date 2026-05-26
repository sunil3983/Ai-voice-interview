import { body } from 'express-validator';

export const registerValidator = [
  body('name').trim().isLength({ min: 2, max: 80 }),
  body('email').isEmail().normalizeEmail(),
  body('password').isStrongPassword({ minLength: 8, minNumbers: 1, minSymbols: 1, minUppercase: 1 })
];

export const loginValidator = [body('email').isEmail().normalizeEmail(), body('password').isString().isLength({ min: 8 })];
