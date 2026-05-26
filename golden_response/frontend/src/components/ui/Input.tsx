import type { InputHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export const Input = ({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={cn(
      'h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-mint focus:ring-2 focus:ring-mint/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white',
      className
    )}
    {...props}
  />
);
