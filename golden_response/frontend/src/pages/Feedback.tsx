import { CheckCircle2, Lightbulb, Target } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Page } from '../components/Page';
import { Card } from '../components/ui/Card';
import { interviewService } from '../services/interview.service';
import { useInterviewStore } from '../store/interview.store';
import type { Feedback as FeedbackType, Interview } from '../types';

export default function Feedback() {
  const { id } = useParams();
  const storedFeedback = useInterviewStore((state) => state.feedback);
  const [interview, setInterview] = useState<Interview | null>(null);
  const feedback: FeedbackType | undefined = storedFeedback ?? interview?.feedback;

  useEffect(() => {
    if (id) interviewService.get(id).then(setInterview);
  }, [id]);

  const chart = feedback
    ? [
        { name: 'Overall', score: feedback.overallScore },
        { name: 'Technical', score: feedback.technicalAccuracy },
        { name: 'Communication', score: feedback.communicationSkill },
        { name: 'Confidence', score: feedback.confidenceEstimation }
      ]
    : [];

  return (
    <Page>
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-3xl font-black text-ink dark:text-white">Feedback report</h1>
        {!feedback ? (
          <Card className="mt-6">Feedback is being prepared. Refresh shortly if it is not visible yet.</Card>
        ) : (
          <div className="mt-6 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <Card>
              <p className="text-sm text-slate-500">Overall score</p>
              <p className="text-6xl font-black text-ink dark:text-mint">{feedback.overallScore}</p>
              <div className="mt-6 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chart}>
                    <XAxis dataKey="name" fontSize={12} />
                    <YAxis domain={[0, 100]} />
                    <Bar dataKey="score" fill="#2ec4b6" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
            <div className="space-y-5">
              <Card>
                <h2 className="flex items-center gap-2 font-bold"><CheckCircle2 className="text-mint" /> Strengths</h2>
                <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">{feedback.strengths.map((item) => <li key={item}>{item}</li>)}</ul>
              </Card>
              <Card>
                <h2 className="flex items-center gap-2 font-bold"><Target className="text-coral" /> Weaknesses</h2>
                <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">{feedback.weaknesses.map((item) => <li key={item}>{item}</li>)}</ul>
              </Card>
              <Card>
                <h2 className="flex items-center gap-2 font-bold"><Lightbulb className="text-gold" /> Suggestions</h2>
                <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">{feedback.suggestions.map((item) => <li key={item}>{item}</li>)}</ul>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Page>
  );
}
