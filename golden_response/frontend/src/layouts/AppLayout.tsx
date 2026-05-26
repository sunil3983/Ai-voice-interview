import { motion } from 'framer-motion';
import { BarChart3, Home, LogOut, MessageSquare, Moon, Settings, Sun, UserRoundPlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { initials } from '../lib/utils';
import { useAuthStore } from '../store/auth.store';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: Home },
  { to: '/interviews/new', label: 'New Interview', icon: UserRoundPlus },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/settings', label: 'Settings', icon: Settings },
  { to: '/contact', label: 'Contact', icon: MessageSquare }
];

export const AppLayout = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [dark, setDark] = useState(() => localStorage.getItem('prepwise-theme') === 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('prepwise-theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <motion.aside
        initial={{ x: -24, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="fixed inset-y-0 left-0 z-20 hidden w-72 border-r border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 lg:block"
      >
        <div className="flex items-center gap-3">
          <img src="/prepwise.svg" className="h-10 w-10 rounded-md" alt="PrepWise" />
          <div>
            <p className="font-bold">PrepWise</p>
            <p className="text-xs text-slate-500">Voice interview studio</p>
          </div>
        </div>
        <nav className="mt-8 space-y-2">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition ${
                  isActive ? 'bg-ink text-white dark:bg-mint dark:text-ink' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="absolute bottom-5 left-5 right-5">
          <div className="mb-3 flex items-center gap-3 rounded-lg bg-slate-100 p-3 dark:bg-slate-800">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gold text-ink text-sm font-bold">{initials(user?.name ?? 'PW')}</div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{user?.name}</p>
              <p className="truncate text-xs text-slate-500">{user?.email}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" className="flex-1" onClick={() => setDark((value) => !value)} title="Toggle theme">
              {dark ? <Sun size={17} /> : <Moon size={17} />}
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                logout();
                navigate('/login');
              }}
              title="Log out"
            >
              <LogOut size={17} />
            </Button>
          </div>
        </div>
      </motion.aside>
      <div className="lg:pl-72">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90 lg:hidden">
          <div className="flex items-center justify-between">
            <NavLink to="/dashboard" className="flex items-center gap-2 font-bold">
              <img src="/prepwise.svg" className="h-8 w-8 rounded-md" alt="PrepWise" />
              PrepWise
            </NavLink>
            <Button variant="ghost" onClick={logout}>
              <LogOut size={17} />
            </Button>
          </div>
        </header>
        <Outlet />
      </div>
    </div>
  );
};
