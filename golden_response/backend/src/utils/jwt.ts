import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const signJwt = (userId: string) =>
  jwt.sign({ sub: userId }, env.JWT_SECRET, {
    expiresIn: '7d',
    issuer: 'prepwise'
  });

export const verifyJwt = (token: string) =>
  jwt.verify(token, env.JWT_SECRET, {
    issuer: 'prepwise'
  }) as { sub: string };
