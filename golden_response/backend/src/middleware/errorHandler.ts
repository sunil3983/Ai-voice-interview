import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/AppError.js';

export const notFound = (req: Request, _res: Response, next: NextFunction) => {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
};

export const errorHandler = (error: Error, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = error instanceof AppError ? error.statusCode : 500;
  const details = error instanceof AppError ? error.details : undefined;

  res.status(statusCode).json({
    success: false,
    error: {
      message: error.message || 'Internal server error',
      statusCode,
      details: process.env.NODE_ENV === 'production' ? undefined : details
    }
  });
};
