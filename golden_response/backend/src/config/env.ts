import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(5000),
  MONGODB_URI: z.string().min(1, 'MONGODB_URI is required'),
  JWT_SECRET: z.string().min(24, 'JWT_SECRET must be at least 24 characters'),
  OPENAI_API_KEY: z.string().min(1, 'OPENAI_API_KEY is required'),
  VAPI_PRIVATE_KEY: z.string().optional().default(''),
  FIREBASE_PROJECT_ID: z.string().optional().default(''),
  FIREBASE_PRIVATE_KEY: z.string().optional().default(''),
  FIREBASE_CLIENT_EMAIL: z.string().optional().default(''),
  REDIS_URL: z.string().optional().default('redis://127.0.0.1:6379'),
  CLOUDINARY_URL: z.string().optional().default(''),
  SUPPORT_EMAIL: z.string().email().optional().or(z.literal('')).default(''),
  SUPPORT_EMAIL_PASSWORD: z.string().optional().default(''),
  ADMIN_EMAIL: z.string().email().optional().or(z.literal('')).default('')
});

export const env = envSchema.parse(process.env);
