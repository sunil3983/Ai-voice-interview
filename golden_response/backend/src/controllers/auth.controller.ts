import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { AppError } from '../utils/AppError.js';
import { ok } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { signJwt } from '../utils/jwt.js';

const serializeUser = (user: { _id: unknown; name: string; email: string; role: string; avatarUrl?: string }) => ({
  id: String(user._id),
  name: user.name,
  email: user.email,
  role: user.role,
  avatarUrl: user.avatarUrl
});

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body as { name: string; email: string; password: string };
  const existing = await User.findOne({ email });
  if (existing) throw new AppError('An account with this email already exists', 409);

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email, passwordHash });
  ok(res, { token: signJwt(user._id.toString()), user: serializeUser(user) }, 201);
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body as { email: string; password: string };
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) throw new AppError('Invalid email or password', 401);
  ok(res, { token: signJwt(user._id.toString()), user: serializeUser(user) });
});

export const me = asyncHandler(async (req, res) => {
  ok(res, serializeUser(req.user!));
});
