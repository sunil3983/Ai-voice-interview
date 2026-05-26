import { Router } from 'express';
import { submitContact } from '../controllers/contact.controller.js';
import { validate } from '../middleware/validate.js';
import { contactValidator } from '../validators/contact.validators.js';

export const contactRouter = Router();

contactRouter.post('/', contactValidator, validate, submitContact);
