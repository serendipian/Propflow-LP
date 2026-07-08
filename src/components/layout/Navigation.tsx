
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '../ui/UI';
import ThemeToggle from '../ui/ThemeToggle';
import LanguagePicker from '../landing/LanguagePicker';
import SmartLink from '../shared/SmartLink';
import { navLinks } from '../../data/navigation';
import logo from '../../assets/logo.png';

export default function Navigation() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <div className="absolute top-0 left-0 right-0 z-50 flex flex-col font-sans pointer-events-none">
      
      {/* Promotional Topbar - Scrolls with page */}
      <SmartLink href="/pricing" className="bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base font-medium pt-[calc(0.625rem+env(safe-area-inset-top))] pb-2.5 px-4 text-center transition-colors flex items-center justify-center gap-2 relative z-50 group pointer-events-auto">
        <span><span className="font-bold">{t('promo.text')}</span> • {t('promo.subtext')}</span>
        <ArrowRight size={16} className="stroke-[3px] animate-pulse" />
      </SmartLink>

      {/* Main Navigation - Becomes fixed when scrolled */}
      <nav 
        className={`w-full transition-all duration-300 pointer-events-auto ${
          isScrolled
            ? 'fixed top-0 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800 pt-[calc(0.75rem+env(safe-area-inset-top))] pb-3 shadow-sm z-40'
            : 'absolute top-[45px] bg-transparent border-b border-transparent py-5 z-40'
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-6 flex items-center justify-between relative">
          <div className="flex items-center gap-2 group cursor-pointer relative z-10">
            <img src={logo} alt="Propflow" className="w-8 h-8 object-contain" />
            <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">Propflow</span>
          </div>

          <div className="hidden lg:flex items-center gap-5 xl:gap-8 xl:absolute xl:left-1/2 xl:top-1/2 xl:-translate-x-1/2 xl:-translate-y-1/2">
            {navLinks.map((item) => (
              <SmartLink
                key={item.label}
                href={item.href}
                className={`text-[15px] font-medium transition-colors ${
                  item.href.startsWith('/') && location.pathname === item.href
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                {t(`nav.${item.label.toLowerCase()}`)}
              </SmartLink>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4 relative z-10">
            <LanguagePicker />
            <ThemeToggle />
            <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 mx-1" />
            <a href="#" className="hidden xl:block text-[15px] font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors">
              {t('nav.signIn')}
            </a>
            <Button variant="primary" className="!h-10 !px-5 !text-base" onClick={() => navigate('/book-a-demo')}>
              {t('nav.bookDemo')}
            </Button>
          </div>

          <div className="lg:hidden flex items-center gap-2 relative z-10">
            <ThemeToggle />
            <button
              className="w-11 h-11 -mr-2 inline-flex items-center justify-center rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors"
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
          <div id="mobile-menu" role="menu" className="absolute top-full left-0 right-0 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 p-6 pt-4 flex flex-col gap-1 lg:hidden animate-in slide-in-from-top-5 shadow-xl max-h-[calc(100dvh-8.5rem)] overflow-y-auto overscroll-contain">
            {navLinks.map((item) => (
              <SmartLink key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)} className="py-2.5 text-base font-medium text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400">
                {t(`nav.${item.label.toLowerCase()}`)}
              </SmartLink>
            ))}
            <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-2" />
            <div className="flex justify-between items-center py-1 mb-2">
              <span className="text-sm text-zinc-500">{t('nav.switchLanguage')}</span>
              <LanguagePicker />
            </div>
            <Button variant="primary" className="w-full" onClick={() => { setMobileMenuOpen(false); navigate('/book-a-demo'); }}>
              {t('nav.bookDemo')}
            </Button>
          </div>
        )}
      </nav>
    </div>
  );
}
