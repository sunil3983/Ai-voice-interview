import { Worker } from 'bullmq';
import { redis } from '../config/redis.js';
import { Feedback } from '../models/Feedback.js';
import { Interview } from '../models/Interview.js';
import { updateAnalytics } from '../services/analytics.service.js';
import { generateFeedback } from '../services/openai.service.js';

export const startFeedbackWorker = () => {
  const worker = new Worker(
    'feedback',
    async (job) => {
      const interview = await Interview.findById(job.data.interviewId);
      if (!interview) throw new Error('Interview not found');

      const feedback = await generateFeedback(interview.role, interview.techStack, interview.questions, interview.transcript);
      const saved = await Feedback.findOneAndUpdate(
        { interview: interview._id },
        { ...feedback, user: interview.user, interview: interview._id },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      await updateAnalytics(interview, saved);
      return saved._id.toString();
    },
    { connection: redis }
  );

  worker.on('failed', (_job, error) => {
    console.error('Feedback job failed:', error.message);
  });

  return worker;
};
