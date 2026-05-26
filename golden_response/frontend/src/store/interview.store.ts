import { create } from 'zustand';
import type { Feedback, Question, TranscriptItem } from '../types';

interface InterviewState {
  activeInterviewId: string | null;
  questions: Question[];
  transcript: TranscriptItem[];
  feedback: Feedback | null;
  setActiveInterview: (id: string | null) => void;
  setQuestions: (questions: Question[]) => void;
  addTranscript: (item: TranscriptItem) => void;
  clearTranscript: () => void;
  setFeedback: (feedback: Feedback | null) => void;
}

export const useInterviewStore = create<InterviewState>((set) => ({
  activeInterviewId: null,
  questions: [],
  transcript: [],
  feedback: null,
  setActiveInterview: (id) => set({ activeInterviewId: id }),
  setQuestions: (questions) => set({ questions }),
  addTranscript: (item) => set((state) => ({ transcript: [...state.transcript, item] })),
  clearTranscript: () => set({ transcript: [] }),
  setFeedback: (feedback) => set({ feedback })
}));
