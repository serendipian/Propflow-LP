import React from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { CheckCircle2 } from 'lucide-react';
import { nodeColorClasses } from '../../../data/workflows';

interface WorkflowNodeProps {
  icon: LucideIcon;
  label: string;
  subLabel: string;
  color: string;
  delay: number;
  x: string;
  y: string;
}

const WorkflowNode = ({ icon: Icon, label, subLabel, color, delay, x, y }: WorkflowNodeProps) => {
  const colors = nodeColorClasses[color] || nodeColorClasses.blue;
  return (
  <motion.div
    className={`absolute w-48 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 shadow-lg z-20 flex items-center gap-3`}
    style={{ left: x, top: y }}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.4, delay }}
  >
    <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center ${colors.text} shrink-0 border ${colors.border}`}>
      <Icon size={20} />
    </div>
    <div className="min-w-0">
      <div className="text-xs font-bold text-zinc-900 dark:text-white truncate">{label}</div>
      <div className="text-[10px] text-zinc-500 truncate">{subLabel}</div>
    </div>
    {/* Status Indicator - Cyan */}
    <motion.div
        className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-cyan-500 rounded-full border-2 border-white dark:border-zinc-950 flex items-center justify-center z-30 shadow-sm"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: delay + 0.8, duration: 0.3 }}
    >
        <CheckCircle2 size={12} className="text-white" />
    </motion.div>
  </motion.div>
  );
};

export default WorkflowNode;
