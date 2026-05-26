import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Mic, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Page } from '../components/Page';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const features = [
  { icon: Mic, title: 'Live voice interviews', copy: 'Run realistic interviews with a Vapi assistant and realtime transcript capture.' },
  { icon: BarChart3, title: 'Structured feedback', copy: 'OpenAI scores technical accuracy, communication, confidence, and improvement areas.' },
  { icon: ShieldCheck, title: 'Secure progress history', copy: 'JWT auth, protected routes, and persistent interview analytics.' }
];

export default function Landing() {
  return (
    <Page>
      <section className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
        <div className="mx-auto flex max-w-7xl flex-col px-6 py-6">
          <nav className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 font-bold">
              <img src="/prepwise.svg" className="h-10 w-10 rounded-md" alt="PrepWise" />
              PrepWise
            </Link>
            <div className="flex gap-2">
              <Link to="/login"><Button variant="ghost">Login</Button></Link>
              <Link to="/register"><Button>Start free</Button></Link>
            </div>
          </nav>
          <div className="grid flex-1 items-center gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
              <p className="mb-4 inline-flex rounded-md bg-mint/15 px-3 py-1 text-sm font-semibold text-ink dark:text-mint">AI voice mock interviews</p>
              <h1 className="max-w-4xl text-5xl font-black leading-tight tracking-normal sm:text-6xl">PrepWise</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                Practice role-specific interviews aloud, get instant structured feedback, and track your readiness over time.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/register"><Button>Create account <ArrowRight size={18} /></Button></Link>
                <Link to="/login"><Button variant="secondary">I already have an account</Button></Link>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="rounded-lg border border-slate-200 bg-white p-4 shadow-soft dark:border-slate-800 dark:bg-slate-900">
              <div className="rounded-md bg-ink p-5 text-white dark:bg-slate-950">
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-sm font-semibold text-mint">Frontend Developer Interview</span>
                  <span className="rounded-md bg-coral px-2 py-1 text-xs font-bold">LIVE</span>
                </div>
                <div className="space-y-3">
                  <div className="max-w-[86%] rounded-lg bg-white/10 p-3 text-sm">How would you optimize rendering in a large React dashboard?</div>
                  <div className="ml-auto max-w-[86%] rounded-lg bg-mint p-3 text-sm text-ink">I would start with profiling, then memoize expensive components...</div>
                  <div className="h-24 rounded-lg bg-white/10 p-3">
                    <div className="mb-2 h-3 w-24 rounded bg-gold" />
                    <div className="h-2 w-full rounded bg-white/20" />
                    <div className="mt-2 h-2 w-2/3 rounded bg-white/20" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="grid gap-4 pb-10 md:grid-cols-3">
            {features.map(({ icon: Icon, title, copy }) => (
              <Card key={title}>
                <Icon className="mb-4 text-mint" />
                <h2 className="font-bold">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{copy}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Page>
  );
}
