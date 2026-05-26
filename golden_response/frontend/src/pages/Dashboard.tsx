import { motion } from 'framer-motion';
import { BarChart3, Play, Plus, Trophy } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fadeUp, staggerContainer } from '../animations/variants';
import { Page } from '../components/Page';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { formatDate } from '../lib/utils';
import { interviewService } from '../services/interview.service';
import { useAuthStore } from '../store/auth.store';
import type { Analytics, Interview } from '../types';

const stats = [
  { label: 'Total interviews', value: (analytics: Analytics | null) => analytics?.totalInterviews ?? 0, icon: Play },
  { label: 'Average score', value: (analytics: Analytics | null) => analytics?.averageScore ?? 0, icon: BarChart3 },
  { label: 'Best score', value: (analytics: Analytics | null) => analytics?.bestScore ?? 0, icon: Trophy }
];

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);

  useEffect(() => {
    if (!user) return;
    Promise.all([interviewService.list(user.id), interviewService.analytics(user.id)]).then(([list, stats]) => {
      setInterviews(list);
      setAnalytics(stats);
    });
  }, [user]);

  return (
    <Page>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-black text-ink dark:text-white">Dashboard</h1>
            <p className="mt-1 text-slate-600 dark:text-slate-300">Welcome back, {user?.name}.</p>
          </div>
          <Link to="/interviews/new"><Button><Plus size={18} /> New interview</Button></Link>
        </div>

        <motion.div variants={staggerContainer} initial="initial" animate="animate" className="mt-8 grid gap-4 md:grid-cols-3">
          {stats.map(({ label, value, icon: Icon }) => (
            <motion.div key={label} variants={fadeUp}>
              <Card>
                <Icon className="text-mint" />
                <p className="mt-4 text-sm text-slate-500">{label}</p>
                <p className="text-3xl font-black text-ink dark:text-white">{value(analytics)}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <section className="mt-8">
          <h2 className="mb-4 text-xl font-bold text-ink dark:text-white">Recent interviews</h2>
          <div className="space-y-3">
            {interviews.map((interview) => (
              <Card key={interview._id} className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="font-bold">{interview.role}</p>
                  <p className="text-sm text-slate-500">{interview.techStack.join(', ')} · {interview.difficulty} · {formatDate(interview.createdAt)}</p>
                </div>
                <Link to={interview.status === 'completed' ? `/feedback/${interview._id}` : `/interviews/${interview._id}/live`}>
                  <Button variant="secondary">{interview.status === 'completed' ? 'View feedback' : 'Continue'}</Button>
                </Link>
              </Card>
            ))}
            {!interviews.length && <Card>No interviews yet. Create one to begin.</Card>}
          </div>
        </section>
      </div>
    </Page>
  );
}
