import type { IUser } from '../models/User.js';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      firebaseUser?: {
        uid: string;
        email?: string;
      };
    }
  }
}

export {};
