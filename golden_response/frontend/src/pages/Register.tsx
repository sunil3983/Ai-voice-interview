import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { UserPlus } from 'lucide-react';
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

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/).regex(/[^A-Za-z0-9]/)
});
type FormData = z.infer<typeof schema>;

export default function Register() {
  const navigate = useNavigate();
  const setSession = useAuthStore((state) => state.setSession);
  const [error, setError] = useState('');
  const { register, handleSubmit, formState } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormData) => {
    setError('');
    try {
      const session = await authService.register(values);
      setSession(session.token, session.user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error?.message ?? 'Registration failed. Please try again.');
    }
  };

  return (
    <Page>
      <section className="grid min-h-screen place-items-center bg-slate-50 px-4 dark:bg-slate-950">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Card>
            <h1 className="text-2xl font-black text-ink dark:text-white">Create your PrepWise account</h1>
            <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <Input placeholder="Full name" {...register('name')} />
              {formState.errors.name && <p className="text-sm text-coral">{formState.errors.name.message}</p>}
              <Input placeholder="Email" type="email" {...register('email')} />
              {formState.errors.email && <p className="text-sm text-coral">{formState.errors.email.message}</p>}
              <Input placeholder="Strong password" type="password" {...register('password')} />
              {formState.errors.password && <p className="text-sm text-coral">Use 8+ chars with uppercase, number, and symbol.</p>}
              {error && <p className="text-sm text-coral">{error}</p>}
              <Button className="w-full" disabled={formState.isSubmitting}><UserPlus size={18} /> Register</Button>
            </form>
            <p className="mt-5 text-sm text-slate-600 dark:text-slate-300">Already registered? <Link className="text-ink underline dark:text-mint" to="/login">Login</Link></p>
          </Card>
        </motion.div>
      </section>
    </Page>
  );
}
