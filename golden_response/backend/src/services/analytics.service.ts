import { Analytics } from '../models/Analytics.js';
import type { FeedbackPayload } from '../models/Feedback.js';
import type { IInterview } from '../models/Interview.js';

export const updateAnalytics = async (interview: IInterview, feedback: FeedbackPayload) => {
  const analytics = await Analytics.findOne({ user: interview.user });
  const scorePoint = {
    interview: interview._id,
    date: interview.completedAt ?? new Date(),
    score: feedback.overallScore
  };

  if (!analytics) {
    return Analytics.create({
      user: interview.user,
      totalInterviews: 1,
      averageScore: feedback.overallScore,
      bestScore: feedback.overallScore,
      latestScore: feedback.overallScore,
      scoreTrend: [scorePoint],
      strengths: feedback.strengths.slice(0, 5),
      focusAreas: feedback.weaknesses.slice(0, 5)
    });
  }

  const totalInterviews = analytics.totalInterviews + 1;
  const averageScore = Math.round((analytics.averageScore * analytics.totalInterviews + feedback.overallScore) / totalInterviews);

  analytics.totalInterviews = totalInterviews;
  analytics.averageScore = averageScore;
  analytics.bestScore = Math.max(analytics.bestScore, feedback.overallScore);
  analytics.latestScore = feedback.overallScore;
  analytics.scoreTrend.push(scorePoint);
  analytics.scoreTrend = analytics.scoreTrend.slice(-20);
  analytics.strengths = Array.from(new Set([...feedback.strengths, ...analytics.strengths])).slice(0, 8);
  analytics.focusAreas = Array.from(new Set([...feedback.weaknesses, ...analytics.focusAreas])).slice(0, 8);
  return analytics.save();
};
