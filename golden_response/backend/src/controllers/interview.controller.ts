import { Feedback } from '../models/Feedback.js';
import { Interview } from '../models/Interview.js';
import { feedbackQueue } from '../queues/feedback.queue.js';
import { generateFeedback } from '../services/openai.service.js';
import { updateAnalytics } from '../services/analytics.service.js';
import { AppError } from '../utils/AppError.js';
import { ok } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createInterview = asyncHandler(async (req, res) => {
  const { role, techStack, difficulty, questions = [] } = req.body;
  const interview = await Interview.create({
    user: req.user!._id,
    role,
    techStack,
    difficulty,
    questions,
    status: 'created',
    startedAt: new Date()
  });
  ok(res, { id: interview._id.toString(), status: interview.status }, 201);
});

export const completeInterview = asyncHandler(async (req, res) => {
  const { interviewId, transcript, audioUrl } = req.body;
  const interview = await Interview.findOne({ _id: interviewId, user: req.user!._id });
  if (!interview) throw new AppError('Interview not found', 404);

  interview.transcript = transcript.map((item: { role: string; content: string; timestamp: string }) => ({
    ...item,
    timestamp: new Date(item.timestamp)
  }));
  interview.audioUrl = audioUrl;
  interview.status = 'completed';
  interview.completedAt = new Date();
  await interview.save();

  try {
    const feedback = await generateFeedback(interview.role, interview.techStack, interview.questions, interview.transcript);
    const savedFeedback = await Feedback.findOneAndUpdate(
      { interview: interview._id },
      { ...feedback, user: interview.user, interview: interview._id },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    await updateAnalytics(interview, savedFeedback);
    ok(res, { interviewId: interview._id.toString(), feedback: savedFeedback });
  } catch {
    await feedbackQueue.add('generate-feedback', { interviewId: interview._id.toString() });
    ok(res, { interviewId: interview._id.toString(), queued: true, message: 'Transcript saved and feedback is processing.' }, 202);
  }
});

export const getUserInterviews = asyncHandler(async (req, res) => {
  if (req.params.id !== req.user!._id.toString() && req.user!.role !== 'admin') throw new AppError('Forbidden', 403);
  const interviews = await Interview.find({ user: req.params.id }).sort({ createdAt: -1 }).lean();
  ok(res, interviews);
});

export const getInterview = asyncHandler(async (req, res) => {
  const interview = await Interview.findById(req.params.id).lean();
  if (!interview) throw new AppError('Interview not found', 404);
  if (String(interview.user) !== req.user!._id.toString() && req.user!.role !== 'admin') throw new AppError('Forbidden', 403);
  const feedback = await Feedback.findOne({ interview: interview._id }).lean();
  ok(res, { ...interview, feedback });
});
