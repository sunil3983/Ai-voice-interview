import mongoose, { type Document, Schema, Types } from 'mongoose';

export interface Question {
  id: string;
  question: string;
  category: 'technical' | 'behavioral' | 'system-design' | 'role-fit';
  expectedSignals: string[];
}

export interface TranscriptItem {
  role: 'assistant' | 'user' | 'system';
  content: string;
  timestamp: Date;
}

export interface IInterview extends Document {
  user: Types.ObjectId;
  role: string;
  techStack: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  status: 'created' | 'in_progress' | 'completed' | 'failed';
  questions: Question[];
  transcript: TranscriptItem[];
  audioUrl?: string;
  startedAt?: Date;
  completedAt?: Date;
}

const questionSchema = new Schema<Question>(
  {
    id: { type: String, required: true },
    question: { type: String, required: true },
    category: { type: String, enum: ['technical', 'behavioral', 'system-design', 'role-fit'], required: true },
    expectedSignals: [{ type: String, required: true }]
  },
  { _id: false }
);

const transcriptSchema = new Schema<TranscriptItem>(
  {
    role: { type: String, enum: ['assistant', 'user', 'system'], required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, required: true }
  },
  { _id: false }
);

const interviewSchema = new Schema<IInterview>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    role: { type: String, required: true, trim: true, maxlength: 120 },
    techStack: [{ type: String, required: true, trim: true }],
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true, index: true },
    status: { type: String, enum: ['created', 'in_progress', 'completed', 'failed'], default: 'created', index: true },
    questions: [questionSchema],
    transcript: [transcriptSchema],
    audioUrl: { type: String },
    startedAt: { type: Date },
    completedAt: { type: Date }
  },
  { timestamps: true }
);

interviewSchema.index({ user: 1, createdAt: -1 });
interviewSchema.index({ user: 1, status: 1 });

export const Interview = mongoose.model<IInterview>('Interview', interviewSchema);
