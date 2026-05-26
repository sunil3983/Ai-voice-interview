import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Page } from '../components/Page';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { contactService } from '../services/contact.service';
import { useAuthStore } from '../store/auth.store';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(2),
  message: z.string().min(10)
});
type FormData = z.infer<typeof schema>;

export default function Contact() {
  const user = useAuthStore((state) => state.user);
  const [status, setStatus] = useState('');
  const { register, handleSubmit, formState, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: user?.name ?? '', email: user?.email ?? '' }
  });

  const onSubmit = async (values: FormData) => {
    const message = await contactService.submit(values);
    setStatus(message);
    reset({ name: user?.name ?? '', email: user?.email ?? '', subject: '', message: '' });
  };

  return (
    <Page>
      <div className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-3xl font-black text-ink dark:text-white">Contact</h1>
        <Card className="mt-6">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <Input placeholder="Name" {...register('name')} />
            <Input placeholder="Email" type="email" {...register('email')} />
            <Input placeholder="Subject" {...register('subject')} />
            <textarea className="min-h-36 w-full rounded-md border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-mint focus:ring-2 focus:ring-mint/20 dark:border-slate-700 dark:bg-slate-900" placeholder="Message" {...register('message')} />
            {Object.values(formState.errors)[0]?.message && <p className="text-sm text-coral">{String(Object.values(formState.errors)[0]?.message)}</p>}
            {status && <p className="text-sm text-mint">{status}</p>}
            <Button disabled={formState.isSubmitting}><Send size={18} /> Send message</Button>
          </form>
        </Card>
      </div>
    </Page>
  );
}
