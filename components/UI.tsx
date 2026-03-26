
import React, { forwardRef } from 'react';

export interface SectionBadgeProps {
  children?: React.ReactNode;
  color?: "blue" | "indigo" | "zinc" | "violet"; // Constrained to supported colors
}

export const SectionBadge = ({ children, color = "blue" }: SectionBadgeProps) => {
  // Explicit mapping ensures Tailwind JIT picks up these classes
  const colorStyles = {
    blue: "bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-white",
    indigo: "bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-white",
    zinc: "bg-zinc-50 dark:bg-zinc-500/10 border-zinc-200 dark:border-zinc-500/20 text-zinc-600 dark:text-white",
    violet: "bg-violet-50 dark:bg-violet-500/10 border-violet-200 dark:border-violet-500/20 text-violet-600 dark:text-white"
  };

  const selectedColor = colorStyles[color] || colorStyles.blue;

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-widest mb-6 ${selectedColor}`}>
      {children}
    </div>
  );
};

export interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Button = ({ variant = "primary", children, className = "", onClick }: ButtonProps) => {
  const baseStyle = "h-11 px-6 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 relative overflow-hidden group";
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 dark:shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)] hover:dark:shadow-[0_0_30px_-5px_rgba(59,130,246,0.6)]",
    secondary: "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 backdrop-blur-sm",
    outline: "bg-transparent border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-white hover:border-blue-300 dark:hover:border-zinc-500",
    ghost: "bg-transparent text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800"
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === 'primary' && (
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      )}
    </button>
  );
};

export const GlassPanel = forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string; style?: React.CSSProperties }>(({ children, className = "", style }, ref) => (
  <div 
    ref={ref}
    className={`bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl border border-black/5 dark:border-blue-500/10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)] ${className}`}
    style={style}
  >
    {children}
  </div>
));
GlassPanel.displayName = 'GlassPanel';

export const GlassPill = ({ children, className = "" }: { children?: React.ReactNode; className?: string }) => (
  <div className={`bg-white/80 dark:bg-blue-900/15 backdrop-blur-md border border-black/5 dark:border-blue-500/20 shadow-sm dark:shadow-[0_0_15px_rgba(59,130,246,0.1)] ${className}`}>
    {children}
  </div>
);
