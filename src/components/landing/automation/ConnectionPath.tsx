import React from 'react';
import { motion } from 'framer-motion';

const ConnectionPath = ({ d, color = "#3b82f6", delay = 0 }: { d: string, color?: string, delay?: number }) => (
    <>
        <motion.path
            d={d}
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeOpacity="0.15"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay }}
        />
        <motion.path
            d={d}
            fill="none"
            stroke={color}
            strokeWidth="3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay }}
        />
    </>
);

export default ConnectionPath;
