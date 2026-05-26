import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Page } from '../components/Page';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';

export default function ForgotPassword() {
  const [sent, setSent] = useState(false);
  return (
    <Page>
      <section className="grid min-h-screen place-items-center bg-slate-50 px-4 dark:bg-slate-950">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Card>
            <h1 className="text-2xl font-black text-ink dark:text-white">Reset password</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Enter your email and PrepWise will show reset instructions when email delivery is enabled.</p>
            <form className="mt-6 space-y-4" onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
              <Input required type="email" placeholder="Email" />
              <Button className="w-full"><Mail size={18} /> Send reset instructions</Button>
            </form>
            {sent && <p className="mt-4 text-sm text-mint">If the account exists, reset instructions have been queued.</p>}
            <Link className="mt-5 inline-block text-sm text-ink underline dark:text-mint" to="/login">Back to login</Link>
          </Card>
        </motion.div>
      </section>
    </Page>
  );
}
