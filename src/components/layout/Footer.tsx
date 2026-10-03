
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Linkedin, Instagram, Facebook } from 'lucide-react';
import SmartLink from '../shared/SmartLink';
import { Logo } from '../ui/Logo';
import { socialLinks } from '../../data/navigation';

// Lucide only ships the old Twitter bird, so the X mark is drawn here.
function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

const socialIcons = { LinkedIn: Linkedin, X: XIcon, Instagram, Facebook };

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-zinc-50 dark:bg-zinc-950 pt-20 pb-10 border-t border-zinc-200 dark:border-zinc-900 text-sm">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Logo className="h-10 w-auto text-zinc-900 dark:text-white" />
          </div>
          <p className="text-zinc-500 mb-6 max-w-sm leading-relaxed">{t('footer.description')}</p>
          {socialLinks.length > 0 && (
          <div className="flex gap-3">
            {socialLinks.map(({ network, href }) => {
              const Icon = socialIcons[network];
              return (
                <a
                  key={network}
                  href={href}
                  {...(href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
                  aria-label={t('footer.social', { network })}
                  className="w-9 h-9 rounded-lg flex items-center justify-center bg-zinc-200/60 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-500/40 transition-colors"
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
          )}
        </div>
        
        <div>
          <h4 className="font-semibold text-zinc-900 dark:text-white mb-4">{t('footer.product')}</h4>
          <ul className="space-y-1 text-zinc-500">
            <li><SmartLink href="#solutions" className="inline-block py-1 hover:text-blue-600 dark:hover:text-blue-400">{t('footer.pipeline')}</SmartLink></li>
            <li><SmartLink href="#features" className="inline-block py-1 hover:text-blue-600 dark:hover:text-blue-400">{t('footer.listings')}</SmartLink></li>
            <li><SmartLink href="#features" className="inline-block py-1 hover:text-blue-600 dark:hover:text-blue-400">{t('footer.automations')}</SmartLink></li>
            <li><SmartLink href="#features" className="inline-block py-1 hover:text-blue-600 dark:hover:text-blue-400">{t('footer.mobileApp')}</SmartLink></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-zinc-900 dark:text-white mb-4">{t('footer.company')}</h4>
          <ul className="space-y-1 text-zinc-500">
            <li><SmartLink href="#product" className="inline-block py-1 hover:text-blue-600 dark:hover:text-blue-400">{t('footer.about')}</SmartLink></li>
            <li><SmartLink href="#product" className="inline-block py-1 hover:text-blue-600 dark:hover:text-blue-400">{t('footer.customers')}</SmartLink></li>
            <li><SmartLink href="#product" className="inline-block py-1 hover:text-blue-600 dark:hover:text-blue-400">{t('footer.careers')}</SmartLink></li>
            <li><SmartLink href="/contact" className="inline-block py-1 hover:text-blue-600 dark:hover:text-blue-400">{t('footer.contact')}</SmartLink></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-zinc-900 dark:text-white mb-4">{t('footer.legal')}</h4>
          <ul className="space-y-1 text-zinc-500">
            <li><SmartLink href="/privacy" className="inline-block py-1 hover:text-blue-600 dark:hover:text-blue-400">{t('footer.privacy')}</SmartLink></li>
            <li><SmartLink href="/terms" className="inline-block py-1 hover:text-blue-600 dark:hover:text-blue-400">{t('footer.terms')}</SmartLink></li>
            <li><SmartLink href="/security" className="inline-block py-1 hover:text-blue-600 dark:hover:text-blue-400">{t('footer.security')}</SmartLink></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-zinc-200 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-2 text-center text-zinc-500">
        <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
        <p>{t('footer.designedFor')}</p>
      </div>
    </footer>
  );
}
