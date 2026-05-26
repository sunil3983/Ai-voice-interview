import mongoose, { type Document, Schema } from 'mongoose';

export interface IContactSubmission extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'received' | 'emailed' | 'failed';
  failureReason?: string;
}

const contactSubmissionSchema = new Schema<IContactSubmission>(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    subject: { type: String, required: true, trim: true, maxlength: 160 },
    message: { type: String, required: true, trim: true, maxlength: 5000 },
    status: { type: String, enum: ['received', 'emailed', 'failed'], default: 'received', index: true },
    failureReason: { type: String }
  },
  { timestamps: true }
);

contactSubmissionSchema.index({ createdAt: -1 });

export const ContactSubmission = mongoose.model<IContactSubmission>('ContactSubmission', contactSubmissionSchema);
