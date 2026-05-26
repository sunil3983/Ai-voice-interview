import mongoose, { type Document, Schema, Types } from 'mongoose';

export interface FeedbackPayload {
  overallScore: number;
  technicalAccuracy: number;
  communicationSkill: number;
  confidenceEstimation: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
}

export interface IFeedback extends Document, FeedbackPayload {
  user: Types.ObjectId;
  interview: Types.ObjectId;
  rawModelResponse?: string;
}

const feedbackSchema = new Schema<IFeedback>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    interview: { type: Schema.Types.ObjectId, ref: 'Interview', required: true, unique: true, index: true },
    overallScore: { type: Number, required: true, min: 0, max: 100 },
    technicalAccuracy: { type: Number, required: true, min: 0, max: 100 },
    communicationSkill: { type: Number, required: true, min: 0, max: 100 },
    confidenceEstimation: { type: Number, required: true, min: 0, max: 100 },
    strengths: [{ type: String, required: true }],
    weaknesses: [{ type: String, required: true }],
    suggestions: [{ type: String, required: true }],
    rawModelResponse: { type: String }
  },
  { timestamps: true }
);

feedbackSchema.index({ user: 1, createdAt: -1 });

export const Feedback = mongoose.model<IFeedback>('Feedback', feedbackSchema);
