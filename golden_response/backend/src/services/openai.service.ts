import OpenAI from 'openai';
import { env } from '../config/env.js';
import type { FeedbackPayload, IFeedback } from '../models/Feedback.js';
import type { Question, TranscriptItem } from '../models/Interview.js';

const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

const clampScore = (value: unknown) => Math.max(0, Math.min(100, Number(value) || 0));

const fallbackFeedback = (): FeedbackPayload => ({
  overallScore: 70,
  technicalAccuracy: 70,
  communicationSkill: 70,
  confidenceEstimation: 70,
  strengths: ['Completed the interview and provided relevant answers.'],
  weaknesses: ['The transcript did not contain enough detail for a precise evaluation.'],
  suggestions: ['Add concrete examples, tradeoffs, and measurable outcomes in future answers.']
});

export const generateQuestions = async (role: string, techStack: string[], difficulty: string): Promise<Question[]> => {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content:
          'Generate exactly 5 mock interview questions. Return JSON with key questions, an array of objects: id, question, category, expectedSignals. Category must be technical, behavioral, system-design, or role-fit.'
      },
      {
        role: 'user',
        content: JSON.stringify({ role, techStack, difficulty })
      }
    ]
  });

  const content = completion.choices[0]?.message.content ?? '{"questions":[]}';
  const parsed = JSON.parse(content) as { questions?: Question[] };
  return (parsed.questions ?? []).slice(0, 5).map((question, index) => ({
    id: question.id || `q${index + 1}`,
    question: question.question,
    category: question.category,
    expectedSignals: question.expectedSignals ?? []
  }));
};

export const generateFeedback = async (
  role: string,
  techStack: string[],
  questions: Question[],
  transcript: TranscriptItem[]
): Promise<FeedbackPayload & Pick<IFeedback, 'rawModelResponse'>> => {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content:
            'You are a strict but helpful interview coach. Return only JSON with overallScore, technicalAccuracy, communicationSkill, confidenceEstimation, strengths, weaknesses, suggestions. Scores are integers 0-100.'
        },
        {
          role: 'user',
          content: JSON.stringify({ role, techStack, questions, transcript })
        }
      ]
    });

    const rawModelResponse = completion.choices[0]?.message.content ?? '{}';
    const parsed = JSON.parse(rawModelResponse) as FeedbackPayload;
    return {
      overallScore: clampScore(parsed.overallScore),
      technicalAccuracy: clampScore(parsed.technicalAccuracy),
      communicationSkill: clampScore(parsed.communicationSkill),
      confidenceEstimation: clampScore(parsed.confidenceEstimation),
      strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
      weaknesses: Array.isArray(parsed.weaknesses) ? parsed.weaknesses : [],
      suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : [],
      rawModelResponse
    };
  } catch (error) {
    return { ...fallbackFeedback(), rawModelResponse: JSON.stringify({ fallback: true, reason: (error as Error).message }) };
  }
};
