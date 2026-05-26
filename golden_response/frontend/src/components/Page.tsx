import { motion } from 'framer-motion';
import type { PropsWithChildren } from 'react';
import { pageTransition } from '../animations/variants';

export const Page = ({ children }: PropsWithChildren) => (
  <motion.main {...pageTransition} className="min-h-screen">
    {children}
  </motion.main>
);
