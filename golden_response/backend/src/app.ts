import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import { apiRouter } from './routes/index.js';

export const app = express();

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(compression());
app.use(express.json({ limit: '2mb' }));
app.use(morgan('combined'));
app.use(apiLimiter);

app.get('/health', (_req, res) => res.json({ success: true, status: 'ok' }));
app.use('/api/v1', apiRouter);
app.use(notFound);
app.use(errorHandler);
