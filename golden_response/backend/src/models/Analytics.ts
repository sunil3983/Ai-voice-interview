import mongoose, { type Document, Schema, Types } from 'mongoose';

export interface ScorePoint {
  interview: Types.ObjectId;
  date: Date;
  score: number;
}

export interface IAnalytics extends Document {
  user: Types.ObjectId;
  totalInterviews: number;
  averageScore: number;
  bestScore: number;
  latestScore: number;
  scoreTrend: ScorePoint[];
  strengths: string[];
  focusAreas: string[];
}

const analyticsSchema = new Schema<IAnalytics>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    totalInterviews: { type: Number, default: 0, min: 0 },
    averageScore: { type: Number, default: 0, min: 0, max: 100 },
    bestScore: { type: Number, default: 0, min: 0, max: 100 },
    latestScore: { type: Number, default: 0, min: 0, max: 100 },
    scoreTrend: [
      {
        interview: { type: Schema.Types.ObjectId, ref: 'Interview', required: true },
        date: { type: Date, required: true },
        score: { type: Number, required: true, min: 0, max: 100 }
      }
    ],
    strengths: [{ type: String }],
    focusAreas: [{ type: String }]
  },
  { timestamps: true }
);

export const Analytics = mongoose.model<IAnalytics>('Analytics', analyticsSchema);
