
import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme}
      className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors relative overflow-hidden"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5">
        <motion.div
          initial={false}
          animate={{ scale: theme === 'dark' ? 1 : 0, rotate: theme === 'dark' ? 0 : 90 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon size={18} />
        </motion.div>
        <motion.div
          initial={false}
          animate={{ scale: theme === 'light' ? 1 : 0, rotate: theme === 'light' ? 0 : -90 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sun size={18} />
        </motion.div>
      </div>
    </button>
  );
}
