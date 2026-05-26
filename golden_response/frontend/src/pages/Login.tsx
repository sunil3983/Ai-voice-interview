import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Page } from '../components/Page';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { authService } from '../services/auth.service';
import { useAuthStore } from '../store/auth.store';

const schema = z.object({ email: z.string().email(), password: z.string().min(8) });
type FormData = z.infer<typeof schema>;

export default function Login() {
  const navigate = useNavigate();
  const setSession = useAuthStore((state) => state.setSession);
  const [error, setError] = useState('');
  const { register, handleSubmit, formState } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormData) => {
    setError('');
    try {
      const session = await authService.login(values);
      setSession(session.token, session.user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error?.message ?? 'Login failed. Please try again.');
    }
  };

  return (
    <Page>
      <section className="grid min-h-screen place-items-center bg-slate-50 px-4 dark:bg-slate-950">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Card>
            <img src="/prepwise.svg" className="mb-5 h-11 w-11 rounded-md" alt="PrepWise" />
            <h1 className="text-2xl font-black text-ink dark:text-white">Welcome back</h1>
            <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Input placeholder="Email" type="email" {...register('email')} />
                {formState.errors.email && <p className="mt-1 text-sm text-coral">{formState.errors.email.message}</p>}
              </div>
              <div>
                <Input placeholder="Password" type="password" {...register('password')} />
                {formState.errors.password && <p className="mt-1 text-sm text-coral">{formState.errors.password.message}</p>}
              </div>
              {error && <p className="text-sm text-coral">{error}</p>}
              <Button className="w-full" disabled={formState.isSubmitting}><LogIn size={18} /> Login</Button>
            </form>
            <div className="mt-5 flex justify-between text-sm">
              <Link className="text-ink underline dark:text-mint" to="/forgot-password">Forgot password?</Link>
              <Link className="text-ink underline dark:text-mint" to="/register">Create account</Link>
            </div>
          </Card>
        </motion.div>
      </section>
    </Page>
  );
}
