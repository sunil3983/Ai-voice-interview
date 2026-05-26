import { Save } from 'lucide-react';
import { Page } from '../components/Page';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { useAuthStore } from '../store/auth.store';

export default function Settings() {
  const user = useAuthStore((state) => state.user);
  return (
    <Page>
      <div className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-3xl font-black text-ink dark:text-white">Settings</h1>
        <Card className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-semibold">Name</label>
            <Input className="mt-1" defaultValue={user?.name} />
          </div>
          <div>
            <label className="text-sm font-semibold">Email</label>
            <Input className="mt-1" defaultValue={user?.email} disabled />
          </div>
          <div>
            <label className="text-sm font-semibold">Preferred role</label>
            <Input className="mt-1" placeholder="Frontend Developer" />
          </div>
          <Button type="button"><Save size={18} /> Save preferences</Button>
        </Card>
      </div>
    </Page>
  );
}
