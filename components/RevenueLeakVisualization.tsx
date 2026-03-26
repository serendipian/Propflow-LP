
import React from 'react';
import { motion } from 'framer-motion';
import { Home, User, DollarSign } from 'lucide-react';

interface StreamParticleProps {
  delay: number;
  isLeaking: boolean;
  type: 'property' | 'person';
}

const StreamParticle: React.FC<StreamParticleProps> = ({ delay, isLeaking, type }) => {
  const Icon = type === 'property' ? Home : User;
  
  // Animation duration
  const duration = 9; 
  
  // Timing Constants (0 to 1)
  const dropStart = 0.40; 
  const dropDuration = 0.2;
  const dropEnd = dropStart + dropDuration; // 0.60
  const halfDrop = dropStart + (dropDuration / 2); // 0.50

  return (
    <motion.div
      className="absolute z-10"
      initial={{ left: "0%", y: "-100%", opacity: 0 }} 
      animate={isLeaking ? {
        left: ["0%", "40%", "40%", "40%"],
        y: ["-100%", "-100%", "600%", "800%"],
        opacity: [0, 1, 1, 0],
        rotate: [0, 0, 15, 45]
      } : {
        left: ["0%", "100%"],
        y: ["-100%", "-100%"], // Must be array to match times
        opacity: [0, 1, 1, 0],
        rotate: [0, 0] // Must be array to match times
      }}
      transition={{
        // Global transition settings
        duration: duration,
        delay,
        ease: "linear",
        repeat: Infinity,
        repeatDelay: 0,
        
        // Property-specific timings
        left: {
          duration: duration, delay, repeat: Infinity, ease: "linear",
          times: isLeaking ? [0, dropStart, dropEnd, 1] : [0, 1]
        },
        y: {
          duration: duration, delay, repeat: Infinity, 
          ease: isLeaking ? [0.42, 0, 1, 1] : "linear", // Gravity feel for drop
          times: isLeaking ? [0, dropStart, dropEnd, 1] : [0, 1]
        },
        opacity: {
          duration: duration, delay, repeat: Infinity, ease: "linear",
          times: isLeaking 
            ? [0, 0.05, halfDrop, dropEnd] // Start fading at halfDrop (0.50), gone by dropEnd (0.60)
            : [0, 0.05, 0.95, 1]
        },
        rotate: {
          duration: duration, delay, repeat: Infinity, ease: "linear",
          times: isLeaking ? [0, dropStart, halfDrop, dropEnd] : [0, 1]
        }
      }}
    >
      <div className="relative w-10 h-10 flex items-center justify-center -mb-px"> 
         {/* -mb-px ensures exact pixel alignment with line below */}
         
         {/* 1. Main Icon (Blue House/User) */}
         {/* Fades out when falling starts if leaking, otherwise behaves normally */}
         <motion.div
            className="absolute inset-0 flex items-center justify-center rounded-xl 
                       bg-white dark:bg-zinc-950/50 backdrop-blur-sm 
                       border border-blue-100 dark:border-transparent 
                       text-blue-600 dark:text-blue-500
                       shadow-[0_2px_10px_-3px_rgba(59,130,246,0.1)] dark:shadow-none
                       dark:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]"
            initial={{ opacity: 1, scale: 1 }}
            animate={isLeaking ? {
                opacity: [1, 1, 0, 0, 1], // Fade out at dropStart, reset at end
                scale: [1, 1, 0.5, 0.5, 1],
            } : {
                opacity: [1, 1, 0, 0], // Explicit 0 at end
                scale: [1, 1, 0, 0],
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                delay,
                ease: "linear",
                times: isLeaking 
                    ? [0, dropStart, dropStart + 0.02, 0.9, 1] // Quick crossfade at dropStart
                    : [0, 0.88, 0.9, 1] 
            }}
         >
            <Icon size={20} strokeWidth={2.5} />
         </motion.div>

         {/* 2. Leaking Money Icon (Red Dollar) */}
         {/* Only appears when leaking, fades in at dropStart */}
         {isLeaking && (
             <motion.div
                className="absolute inset-0 flex items-center justify-center rounded-xl 
                           bg-white dark:bg-zinc-950/50 backdrop-blur-sm 
                           border border-red-100 dark:border-transparent 
                           text-red-600 dark:text-red-500
                           shadow-[0_2px_10px_-3px_rgba(239,68,68,0.1)] dark:shadow-none
                           dark:drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                    opacity: [0, 0, 1, 1, 0], 
                    scale: [0.5, 0.5, 1.1, 1, 0.5]
                }}
                transition={{
                    duration: duration,
                    repeat: Infinity,
                    delay,
                    ease: "linear",
                    times: [0, dropStart, dropStart + 0.02, 0.9, 1] // Quick crossfade in
                }}
             >
                <DollarSign size={20} strokeWidth={2.5} />
             </motion.div>
         )}

         {/* 3. Success Money Icon (Sky/Blue Gradient Dollar) */}
         {/* Only for success path */}
         {!isLeaking && (
             <motion.div
                className="absolute inset-0 flex items-center justify-center rounded-xl
                           bg-white dark:bg-zinc-950/50 backdrop-blur-sm 
                           border border-sky-200 dark:border-transparent 
                           text-sky-600 dark:text-sky-400
                           shadow-[0_2px_10px_-3px_rgba(14,165,233,0.15)] dark:shadow-none
                           dark:drop-shadow-[0_0_12px_rgba(56,189,248,0.8)]"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                    scale: [0, 0, 1.3, 1], 
                    opacity: [0, 0, 1, 1], 
                }}
                transition={{
                    duration: duration,
                    repeat: Infinity,
                    delay,
                    times: [0, 0.88, 0.9, 1] 
                }}
             >
                <DollarSign size={24} strokeWidth={3} />
             </motion.div>
         )}
      </div>
    </motion.div>
  );
};

export default function RevenueLeakVisualization() {
  const count = 6; 
  const cycleDuration = 9; 
  
  const particles = Array.from({ length: count }).map((_, i) => ({
    id: i,
    delay: i * (cycleDuration / count), 
    isLeaking: i % 3 !== 0, // 66% leak
    type: i % 2 === 0 ? 'property' : 'person' 
  }));

  return (
    <div className="relative w-full max-w-4xl">
       {/* The Line */}
       <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-600 to-transparent relative shadow-[0_0_15px_rgba(59,130,246,0.15)]">
          
          {/* Core Brightness Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/30 dark:via-zinc-400/50 to-transparent" />

          {/* Central Hub/Glitch Effect */}
          <div className="absolute left-[40%] top-1/2 -translate-y-1/2 w-px h-12 bg-gradient-to-b from-transparent via-red-500/20 to-transparent blur-sm animate-pulse" />

          {/* Particles Layer */}
          {particles.map((p) => (
            <StreamParticle 
               key={p.id} 
               delay={p.delay} 
               isLeaking={p.isLeaking} 
               type={p.type as 'property' | 'person'} 
             />
          ))}

       </div>

       {/* Minimal Caption */}
       <div className="mt-6 flex justify-between items-start w-full px-4 text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600">
           <span className="mt-1">Leads</span>
           <div className="flex flex-col items-center pl-12">
             <span className="text-red-500/80 dark:text-red-900 animate-pulse">Missed</span>
             <span className="text-red-500/80 dark:text-red-900 animate-pulse">Opportunities</span>
           </div>
           <span className="mt-1">Deals</span>
       </div>
       
    </div>
  );
}
