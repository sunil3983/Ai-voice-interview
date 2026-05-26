import { motion, useReducedMotion } from 'framer-motion';
import { Mic } from 'lucide-react';
import { cn } from '../lib/utils';

export const SpeakingIndicator = ({ active }: { active: boolean }) => {
  const reduceMotion = useReducedMotion();
  return (
    <div className={cn('flex items-center gap-3 rounded-md px-3 py-2', active ? 'bg-mint/15 text-ink dark:text-mint' : 'bg-slate-100 text-slate-500 dark:bg-slate-800')}>
      <motion.span
        animate={!reduceMotion && active ? { scale: [1, 1.2, 1] } : { scale: 1 }}
        transition={{ repeat: active ? Infinity : 0, duration: 0.9 }}
        className="grid h-8 w-8 place-items-center rounded-full bg-mint text-ink"
      >
        <Mic size={17} />
      </motion.span>
      <span className="text-sm font-semibold">{active ? 'Assistant speaking' : 'Listening ready'}</span>
    </div>
  );
};
