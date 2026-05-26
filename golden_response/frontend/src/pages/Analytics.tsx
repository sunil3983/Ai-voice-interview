import { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Page } from '../components/Page';
import { Card } from '../components/ui/Card';
import { interviewService } from '../services/interview.service';
import { useAuthStore } from '../store/auth.store';
import type { Analytics as AnalyticsType } from '../types';

export default function Analytics() {
  const user = useAuthStore((state) => state.user);
  const [analytics, setAnalytics] = useState<AnalyticsType | null>(null);

  useEffect(() => {
    if (user) interviewService.analytics(user.id).then(setAnalytics);
  }, [user]);

  return (
    <Page>
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-3xl font-black text-ink dark:text-white">Analytics</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {[
            ['Total', analytics?.totalInterviews ?? 0],
            ['Average', analytics?.averageScore ?? 0],
            ['Best', analytics?.bestScore ?? 0],
            ['Latest', analytics?.latestScore ?? 0]
          ].map(([label, value]) => (
            <Card key={label}><p className="text-sm text-slate-500">{label}</p><p className="text-3xl font-black text-ink dark:text-mint">{value}</p></Card>
          ))}
        </div>
        <Card className="mt-6">
          <h2 className="font-bold">Score trend</h2>
          <div className="mt-4 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics?.scoreTrend ?? []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" fontSize={12} />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Area type="monotone" dataKey="score" stroke="#14213d" fill="#2ec4b6" fillOpacity={0.35} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Card><h2 className="font-bold">Strength patterns</h2><p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{analytics?.strengths.join(', ') || 'No strengths recorded yet.'}</p></Card>
          <Card><h2 className="font-bold">Focus areas</h2><p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{analytics?.focusAreas.join(', ') || 'No focus areas recorded yet.'}</p></Card>
        </div>
      </div>
    </Page>
  );
}
