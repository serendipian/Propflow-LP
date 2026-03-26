
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SectionBadge } from '../ui/UI';

// --- Brand Logos Configuration ---

const Logos: Record<string, React.ReactNode> = {
  // --- ROW 1: Communication & Video ---
  Teams: (
    <img src="https://cdn.prod.website-files.com/624c34ee1eb3ec0fbbc365fc/63ed2cf2e410bc2aa208f7c0_logo-teams.svg" alt="Microsoft Teams logo" className="w-full h-full object-contain" loading="lazy" width="40" height="40" />
  ),
  Zoom: (
    <img src="https://cdn.prod.website-files.com/624c34ee1eb3ec0fbbc365fc/63ed2cf3c1f58b541e55cf73_logo-zoom.svg" alt="Zoom logo" className="w-full h-full object-contain" loading="lazy" width="40" height="40" />
  ),
  GoogleMeet: (
    <img src="https://cdn.prod.website-files.com/624c34ee1eb3ec0fbbc365fc/662a79d4d28804818a2886f9_googlemeet.svg" alt="Google Meet logo" className="w-full h-full object-contain" loading="lazy" width="40" height="40" />
  ),
  Slack: (
    <img src="https://cdn.prod.website-files.com/624c34ee1eb3ec0fbbc365fc/63ed27e9885e4172cd5eca5e_logo-slack.svg" alt="Slack logo" className="w-full h-full object-contain" loading="lazy" width="40" height="40" />
  ),
  WhatsApp: (
    <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="WhatsApp logo" role="img">
      <path d="M20.52 3.449C18.231 1.159 15.19 0 12.041 0C5.467 0 0.113 5.344 0.11 11.907C0.108 14.004 0.658 16.052 1.706 17.863L0 24L6.335 22.342C8.077 23.288 10.046 23.786 12.046 23.786H12.051C18.625 23.786 23.984 18.441 23.987 11.879C23.989 8.707 22.753 5.727 20.52 3.449Z" fill="#25D366"/>
      <path d="M18.067 14.731C17.738 14.566 16.12 13.771 15.82 13.662C15.518 13.551 15.299 13.498 15.08 13.826C14.862 14.155 14.232 14.891 14.041 15.11C13.849 15.328 13.659 15.355 13.33 15.191C13.001 15.027 11.942 14.679 10.687 13.563C9.697 12.682 9.028 11.594 8.837 11.265C8.646 10.938 8.816 10.761 8.981 10.598C9.13 10.45 9.311 10.215 9.475 10.023C9.64 9.832 9.721 9.694 9.831 9.476C9.941 9.256 9.886 9.065 9.804 8.901C9.722 8.736 9.065 7.12 8.791 6.463C8.525 5.823 8.254 5.91 8.062 5.903C7.887 5.895 7.684 5.895 7.481 5.895C7.278 5.895 6.95 5.97 6.676 6.271C6.403 6.571 5.636 7.29 5.636 8.749C5.636 10.207 6.696 11.616 6.86 11.835C7.024 12.053 8.986 15.068 12.073 16.393C14.922 17.616 14.922 17.228 15.442 17.181C15.962 17.133 17.111 16.501 17.357 15.808C17.603 15.115 17.603 14.522 17.521 14.385C17.439 14.249 17.22 14.195 16.892 14.03" fill="white"/>
    </svg>
  ),

  // --- ROW 2: Productivity & AI ---
  Gmail: (
    <img src="https://cdn.prod.website-files.com/624c34ee1eb3ec0fbbc365fc/63ed2cf20935cf1fef1d3b46_logo-gmail.svg" alt="Gmail logo" className="w-full h-full object-contain" loading="lazy" width="40" height="40" />
  ),
  Calendar: (
    <img src="https://cdn.prod.website-files.com/624c34ee1eb3ec0fbbc365fc/63ed27e9ef91e965d9a0ba5e_logo-google-calendar.svg" alt="Google Calendar logo" className="w-full h-full object-contain" loading="lazy" width="40" height="40" />
  ),
  OpenAI: (
    <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" alt="OpenAI logo" className="w-full h-full object-contain dark:invert" loading="lazy" width="40" height="40" />
  ),
  Notion: (
    <img src="https://cdn.prod.website-files.com/624c34ee1eb3ec0fbbc365fc/63ed27e9a693f25a793f0cc3_logo-notion.svg" alt="Notion logo" className="w-full h-full object-contain dark:invert" loading="lazy" width="40" height="40" />
  ),
  Linear: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-label="Linear logo" role="img">
      <path fillRule="evenodd" clipRule="evenodd" d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM16.32 8.79004L9.12001 16.29H7.68001L14.88 8.79004H16.32Z" fill="#5E6AD2"/>
    </svg>
  ),

  // --- ROW 3: Social & Sales ---
  Instagram: (
    <svg viewBox="0 0 24 24" className="w-full h-full" aria-label="Instagram logo" role="img">
        <path fill="#E1306C" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.849-.069-3.225-.149-4.771-1.664-4.919-4.919-.058-1.265-.069-1.644-.069-4.849 0-3.204.012-3.584.069-4.849.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),
  Facebook: (
    <svg viewBox="0 0 24 24" className="w-full h-full" aria-label="Facebook logo" role="img"><path fill="#1877F2" d="M24 12a12 12 0 1 0-13.88 11.85V15.47h-3.05V12h3.05V9.35c0-3 1.79-4.66 4.53-4.66 1.31 0 2.68.24 2.68.24v2.95h-1.5c-1.5 0-1.96.93-1.96 1.89V12h3.32l-.53 3.47h-2.79v8.38A12 12 0 0 0 24 12z"/></svg>
  ),
  LinkedIn: (
    <svg viewBox="0 0 24 24" className="w-full h-full" aria-label="LinkedIn logo" role="img"><path fill="#0077B5" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
  ),
  YouTube: (
    <svg viewBox="0 0 24 24" className="w-full h-full" aria-label="YouTube logo" role="img"><path fill="#FF0000" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
  ),
  GoogleMaps: (
    <img src="https://upload.wikimedia.org/wikipedia/commons/a/aa/Google_Maps_icon_%282020%29.svg" alt="Google Maps logo" className="w-full h-full object-contain" loading="lazy" width="40" height="40" />
  ),
};

// --- Marquee Components ---

const IntegrationCard: React.FC<{ logoKey: string }> = ({ logoKey }) => (
  <div className="w-28 h-28 md:w-36 md:h-36 rounded-[2rem] bg-white dark:bg-transparent backdrop-blur-md dark:backdrop-blur-none border border-zinc-200 dark:border-white/10 flex items-center justify-center p-7 md:p-8 shadow-sm dark:shadow-none relative group overflow-hidden shrink-0 transition-all duration-300 hover:border-zinc-300 dark:hover:border-white/20 hover:shadow-md dark:hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.15)]">
     
     {/* Subtle Gradient Glow inside Card - Clean white/gray for light mode, transparent for dark */}
     <div className="absolute inset-0 bg-gradient-to-br from-zinc-100/50 to-transparent dark:from-white/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
     
     {/* Render Logo */}
     <div className="w-full h-full relative z-10 opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 filter drop-shadow-sm dark:drop-shadow-md">
        {Logos[logoKey] || <div className="w-full h-full bg-zinc-200 dark:bg-zinc-800 rounded-full" />}
     </div>
  </div>
);

const MarqueeRow = ({ icons, direction = 1, speed = 20 }: { icons: string[], direction?: 1 | -1, speed?: number }) => {
  return (
    <div className="flex overflow-hidden relative w-full">
        {/* CSS Mask for fade edges - FIXED to have transparency in the middle for dark mode */}
        <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-zinc-50 via-transparent via-50% to-zinc-50 dark:from-[#09090b] dark:via-transparent dark:via-50% dark:to-[#09090b] w-full h-full" />
        
        <motion.div
            className="flex gap-6 shrink-0"
            initial={{ x: direction === 1 ? 0 : "-50%" }}
            animate={{ x: direction === 1 ? "-50%" : 0 }}
            transition={{ 
                duration: speed, 
                repeat: Infinity, 
                ease: "linear" 
            }}
        >
            {/* Duplicate to create seamless loop. */}
            {[...icons, ...icons, ...icons, ...icons].map((icon, i) => (
                <IntegrationCard key={`${icon}-${i}`} logoKey={icon} />
            ))}
        </motion.div>
    </div>
  );
};

const row1 = ['Teams', 'Zoom', 'GoogleMeet', 'Slack', 'WhatsApp'];
const row2 = ['Gmail', 'Calendar', 'OpenAI', 'Notion', 'Linear'];
const row3 = ['Instagram', 'Facebook', 'LinkedIn', 'YouTube', 'GoogleMaps'];

export default function IntegrationsSection() {
  const { t } = useTranslation();
  return (
    <section className="py-24 bg-zinc-50 dark:bg-[#09090b] relative overflow-hidden text-zinc-900 dark:text-white border-t border-zinc-200 dark:border-zinc-900">
        
        {/* Background Gradients - Ambient blue background blob REMOVED for dark mode */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none" />

        <div className="max-w-screen-2xl mx-auto px-6 relative z-10 flex flex-col items-center">
            
            {/* Header Content */}
            <div className="flex flex-col items-center mb-8 text-center">
                <SectionBadge color="blue">{t('integrations.badge')}</SectionBadge>
                
                <h2 className="text-4xl md:text-7xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
                    {t('integrations.title')}
                </h2>
                
                <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed font-light">
                    {t('integrations.subtitle')}
                </p>
            </div>

            {/* Marquee Scroller */}
            <div className="relative flex flex-col gap-6 w-full max-w-3xl mx-auto pb-8">
                <MarqueeRow icons={row1} direction={1} speed={30} />
                <MarqueeRow icons={row2} direction={-1} speed={35} />
                <MarqueeRow icons={row3} direction={1} speed={32} />
            </div>
        </div>
    </section>
  );
}
