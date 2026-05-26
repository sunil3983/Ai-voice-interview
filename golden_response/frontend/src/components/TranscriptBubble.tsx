import { motion } from 'framer-motion';
import type { TranscriptItem } from '../types';
import { cn } from '../lib/utils';

export const TranscriptBubble = ({ item }: { item: TranscriptItem }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className={cn('max-w-[82%] rounded-lg px-4 py-3 text-sm', item.role === 'user' ? 'ml-auto bg-ink text-white dark:bg-mint dark:text-ink' : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100')}
  >
    <p className="font-semibold capitalize">{item.role}</p>
    <p className="mt-1 leading-6">{item.content}</p>
  </motion.div>
);
