import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';

export const Button = ({ className, variant = 'primary', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) => {
  const variants: Record<Variant, string> = {
    primary: 'bg-ink text-white hover:bg-ink/90 dark:bg-mint dark:text-ink',
    secondary: 'bg-white text-ink border border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:text-white dark:border-slate-700',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800',
    danger: 'bg-coral text-white hover:bg-coral/90'
  };

  return (
    <button
      className={cn(
        'inline-flex h-11 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-mint disabled:cursor-not-allowed disabled:opacity-60',
        variants[variant],
        className
      )}
      {...props}
    />
  );
};
