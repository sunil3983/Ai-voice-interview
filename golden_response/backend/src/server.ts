import { connectDatabase } from './config/db.js';
import { env } from './config/env.js';
import { redis } from './config/redis.js';
import { startFeedbackWorker } from './jobs/feedback.worker.js';
import { app } from './app.js';

const start = async () => {
  await connectDatabase();
  startFeedbackWorker();
  const server = app.listen(env.PORT, () => {
    console.log(`PrepWise API running on port ${env.PORT}`);
  });

  const shutdown = async () => {
    server.close();
    await redis.quit();
    process.exit(0);
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
};

start().catch((error) => {
  console.error('Failed to start PrepWise API:', error);
  process.exit(1);
});
