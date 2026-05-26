import { ContactSubmission } from '../models/ContactSubmission.js';
import { sendContactEmails } from '../services/mail.service.js';
import { message } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const submitContact = asyncHandler(async (req, res) => {
  const submission = await ContactSubmission.create(req.body);
  try {
    await sendContactEmails(req.body);
    submission.status = 'emailed';
    await submission.save();
  } catch (error) {
    submission.status = 'failed';
    submission.failureReason = (error as Error).message;
    await submission.save();
    console.error('Contact email failed:', (error as Error).message);
  }
  message(res, 'Thanks for contacting PrepWise. We will reply soon.', 201);
});
