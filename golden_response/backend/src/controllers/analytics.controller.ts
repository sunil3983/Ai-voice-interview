import { Analytics } from '../models/Analytics.js';
import { AppError } from '../utils/AppError.js';
import { ok } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getUserAnalytics = asyncHandler(async (req, res) => {
  if (req.params.id !== req.user!._id.toString() && req.user!.role !== 'admin') throw new AppError('Forbidden', 403);
  const analytics =
    (await Analytics.findOne({ user: req.params.id }).lean()) ??
    {
      user: req.params.id,
      totalInterviews: 0,
      averageScore: 0,
      bestScore: 0,
      latestScore: 0,
      scoreTrend: [],
      strengths: [],
      focusAreas: []
    };
  ok(res, analytics);
});
