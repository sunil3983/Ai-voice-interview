import { api } from './api';
import type { Analytics, Feedback, Interview, Question, TranscriptItem } from '../types';

export const interviewService = {
  async generateQuestions(payload: { role: string; techStack: string[]; difficulty: string }) {
    const { data } = await api.post<{ data: { questions: Question[] } }>('/ai/generate-questions', payload);
    return data.data.questions;
  },
  async create(payload: { role: string; techStack: string[]; difficulty: string; questions: Question[] }) {
    const { data } = await api.post<{ data: { id: string; status: string } }>('/interviews/create', payload);
    return data.data;
  },
  async complete(payload: { interviewId: string; transcript: TranscriptItem[]; audioUrl?: string }) {
    const { data } = await api.post<{ data: { interviewId: string; feedback?: Feedback } }>('/interviews/complete', payload);
    return data.data;
  },
  async list(userId: string) {
    const { data } = await api.get<{ data: Interview[] }>(`/interviews/user/${userId}`);
    return data.data;
  },
  async get(id: string) {
    const { data } = await api.get<{ data: Interview }>(`/interviews/${id}`);
    return data.data;
  },
  async analytics(userId: string) {
    const { data } = await api.get<{ data: Analytics }>(`/analytics/user/${userId}`);
    return data.data;
  }
};
