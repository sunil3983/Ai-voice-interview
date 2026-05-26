import type { Response } from 'express';

export const ok = <T>(res: Response, data: T, status = 200) => res.status(status).json({ success: true, data });

export const message = (res: Response, text: string, status = 200) =>
  res.status(status).json({ success: true, message: text });
