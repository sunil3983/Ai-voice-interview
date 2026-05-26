import type { NextFunction, Request, Response } from 'express';
import { getFirebaseAdmin } from '../config/firebase.js';
import { User } from '../models/User.js';
import { AppError } from '../utils/AppError.js';
import { verifyJwt } from '../utils/jwt.js';

const bearer = (req: Request) => req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.slice(7) : null;

export const requireAuth = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const token = bearer(req);
    if (!token) throw new AppError('Missing authorization token', 401);
    const payload = verifyJwt(token);
    const user = await User.findById(payload.sub);
    if (!user) throw new AppError('User not found', 401);
    req.user = user;
    next();
  } catch (error) {
    next(error instanceof AppError ? error : new AppError('Invalid or expired token', 401));
  }
};

export const verifyFirebaseToken = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const token = bearer(req);
    if (!token) return next();
    const firebase = getFirebaseAdmin();
    if (!firebase) return next();
    const decoded = await firebase.auth().verifyIdToken(token);
    req.firebaseUser = { uid: decoded.uid, email: decoded.email };
    next();
  } catch (error) {
    next(new AppError('Invalid Firebase token', 401, error));
  }
};
