import { Queue } from 'bullmq';
import { redis } from '../config/redis.js';

export const feedbackQueue = new Queue('feedback', {
  connection: redis,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: 'exponential', delay: 3000 },
    removeOnComplete: 100,
    removeOnFail: 200
  }
});
