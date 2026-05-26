export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatarUrl?: string;
}

export interface Question {
  id: string;
  question: string;
  category: 'technical' | 'behavioral' | 'system-design' | 'role-fit';
  expectedSignals: string[];
}

export interface TranscriptItem {
  role: 'assistant' | 'user' | 'system';
  content: string;
  timestamp: string;
}

export interface Feedback {
  overallScore: number;
  technicalAccuracy: number;
  communicationSkill: number;
  confidenceEstimation: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
}

export interface Interview {
  _id: string;
  id?: string;
  user: string;
  role: string;
  techStack: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  status: 'created' | 'in_progress' | 'completed' | 'failed';
  questions: Question[];
  transcript: TranscriptItem[];
  audioUrl?: string;
  feedback?: Feedback;
  createdAt: string;
}

export interface Analytics {
  totalInterviews: number;
  averageScore: number;
  bestScore: number;
  latestScore: number;
  scoreTrend: Array<{ date: string; score: number }>;
  strengths: string[];
  focusAreas: string[];
}
