import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Page } from '../components/Page';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { interviewService } from '../services/interview.service';
import { useInterviewStore } from '../store/interview.store';
import type { Question } from '../types';

const schema = z.object({
  role: z.string().min(2),
  techStack: z.string().min(2),
  difficulty: z.enum(['Easy', 'Medium', 'Hard'])
});
type FormData = z.infer<typeof schema>;

export default function InterviewCreate() {
  const navigate = useNavigate();
  const setQuestions = useInterviewStore((state) => state.setQuestions);
  const setActiveInterview = useInterviewStore((state) => state.setActiveInterview);
  const [questions, setLocalQuestions] = useState<Question[]>([]);
  const [error, setError] = useState('');
  const { register, handleSubmit, watch, formState } = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { difficulty: 'Medium' } });

  const payload = (values: FormData) => ({
    role: values.role,
    techStack: values.techStack.split(',').map((item) => item.trim()).filter(Boolean),
    difficulty: values.difficulty
  });

  const generate = async () => {
    const valid = schema.safeParse(watch());
    if (!valid.success) return setError('Enter role, tech stack, and difficulty first.');
    setError('');
    const next = await interviewService.generateQuestions(payload(valid.data));
    setLocalQuestions(next);
    setQuestions(next);
  };

  const onSubmit = async (values: FormData) => {
    const generated = questions.length ? questions : await interviewService.generateQuestions(payload(values));
    const created = await interviewService.create({ ...payload(values), questions: generated });
    setQuestions(generated);
    setActiveInterview(created.id);
    navigate(`/interviews/${created.id}/live`);
  };

  return (
    <Page>
      <div className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-3xl font-black text-ink dark:text-white">Create interview</h1>
        <form className="mt-6 grid gap-5 lg:grid-cols-[1fr_0.9fr]" onSubmit={handleSubmit(onSubmit)}>
          <Card className="space-y-4">
            <Input placeholder="Role, e.g. Frontend Developer" {...register('role')} />
            <Input placeholder="Tech stack, comma separated" {...register('techStack')} />
            <select className="h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900" {...register('difficulty')}>
              <option>Easy</option><option>Medium</option><option>Hard</option>
            </select>
            {error && <p className="text-sm text-coral">{error}</p>}
            <div className="flex flex-wrap gap-3">
              <Button type="button" variant="secondary" onClick={generate} disabled={formState.isSubmitting}><Sparkles size={18} /> Generate questions</Button>
              <Button disabled={formState.isSubmitting}>Start interview</Button>
            </div>
          </Card>
          <Card>
            <h2 className="font-bold">Generated questions</h2>
            <div className="mt-4 space-y-3">
              {questions.map((question, index) => (
                <motion.div key={question.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-md bg-slate-100 p-3 text-sm dark:bg-slate-800">
                  <p className="font-semibold">{index + 1}. {question.question}</p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">{question.category}</p>
                </motion.div>
              ))}
              {!questions.length && <p className="text-sm text-slate-500">Questions will appear here before you start.</p>}
            </div>
          </Card>
        </form>
      </div>
    </Page>
  );
}
