
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '../ui/UI';
import ThemeToggle from '../ui/ThemeToggle';
import LanguagePicker from '../landing/LanguagePicker';
import { navLinks } from '../../data/navigation';

export default function Navigation() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="absolute top-0 left-0 right-0 z-50 flex flex-col font-sans pointer-events-none">
      
      {/* Promotional Topbar - Scrolls with page */}
      <a href="#pricing" className="bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base font-medium py-2.5 px-4 text-center transition-colors flex items-center justify-center gap-2 relative z-50 group pointer-events-auto">
        <span><span className="font-bold">{t('promo.text')}</span> • {t('promo.subtext')}</span>
        <ArrowRight size={16} className="stroke-[3px] animate-pulse" />
      </a>

      {/* Main Navigation - Becomes fixed when scrolled */}
      <nav 
        className={`w-full transition-all duration-300 pointer-events-auto ${
          isScrolled 
            ? 'fixed top-0 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800 py-3 shadow-sm z-40' 
            : 'absolute top-[45px] bg-transparent border-b border-transparent py-5 z-40'
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-6 flex items-center justify-between relative">
          <div className="flex items-center gap-2 group cursor-pointer relative z-10">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all">
              <div className="w-4 h-4 bg-white rounded-sm opacity-90" />
            </div>
            <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">Propflow</span>
          </div>

          <div className="hidden md:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[15px] font-medium text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {t(`nav.${item.label.toLowerCase()}`)}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4 relative z-10">
            <LanguagePicker />
            <ThemeToggle />
            <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 mx-1" />
            <a href="#" className="text-[15px] font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors">
              {t('nav.signIn')}
            </a>
            <Button variant="primary" className="!h-10 !px-5 !text-base">
              {t('nav.bookDemo')}
            </Button>
          </div>

          <div className="md:hidden flex items-center gap-3 relative z-10">
            <ThemeToggle />
            <button
              className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div id="mobile-menu" role="menu" className="absolute top-full left-0 right-0 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 p-6 flex flex-col gap-4 md:hidden animate-in slide-in-from-top-5 shadow-xl">
            {navLinks.map((item) => (
              <a key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)} className="text-base font-medium text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400">
                {t(`nav.${item.label.toLowerCase()}`)}
              </a>
            ))}
            <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-2" />
            <div className="flex justify-between items-center">
              <span className="text-sm text-zinc-500">{t('nav.switchLanguage')}</span>
              <LanguagePicker />
            </div>
            <Button variant="primary" className="w-full">
              {t('nav.bookDemo')}
            </Button>
          </div>
        )}
      </nav>
    </div>
  );
}
