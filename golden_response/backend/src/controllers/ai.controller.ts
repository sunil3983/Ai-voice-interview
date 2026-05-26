import { redis } from '../config/redis.js';
import { ok } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { generateQuestions } from '../services/openai.service.js';

export const generateInterviewQuestions = asyncHandler(async (req, res) => {
  const { role, techStack, difficulty } = req.body as { role: string; techStack: string[]; difficulty: string };
  const cacheKey = `questions:${role}:${techStack.join(',')}:${difficulty}`.toLowerCase();
  const cached = await redis.get(cacheKey);
  if (cached) return ok(res, { questions: JSON.parse(cached) });

  const questions = await generateQuestions(role, techStack, difficulty);
  await redis.set(cacheKey, JSON.stringify(questions), 'EX', 60 * 60);
  ok(res, { questions });
});
