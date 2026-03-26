
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-zinc-50 dark:bg-zinc-950 pt-20 pb-10 border-t border-zinc-200 dark:border-zinc-900 text-sm">
      <div className="max-w-screen-2xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-sm opacity-90" />
            </div>
            <span className="text-lg font-bold text-zinc-900 dark:text-white">Propflow</span>
          </div>
          <p className="text-zinc-500 mb-6">{t('footer.tagline')}</p>
          <div className="flex gap-4">
            {/* Social icons placeholder */}
            <div className="w-8 h-8 rounded bg-zinc-200 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800" />
            <div className="w-8 h-8 rounded bg-zinc-200 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800" />
            <div className="w-8 h-8 rounded bg-zinc-200 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800" />
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-zinc-900 dark:text-white mb-4">{t('footer.product')}</h4>
          <ul className="space-y-2 text-zinc-500">
            <li><a href="#solutions" className="hover:text-blue-600 dark:hover:text-blue-400">{t('footer.pipeline')}</a></li>
            <li><a href="#features" className="hover:text-blue-600 dark:hover:text-blue-400">{t('footer.listings')}</a></li>
            <li><a href="#features" className="hover:text-blue-600 dark:hover:text-blue-400">{t('footer.automations')}</a></li>
            <li><a href="#features" className="hover:text-blue-600 dark:hover:text-blue-400">{t('footer.mobileApp')}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-zinc-900 dark:text-white mb-4">{t('footer.company')}</h4>
          <ul className="space-y-2 text-zinc-500">
            <li><a href="#product" className="hover:text-blue-600 dark:hover:text-blue-400">{t('footer.about')}</a></li>
            <li><a href="#product" className="hover:text-blue-600 dark:hover:text-blue-400">{t('footer.customers')}</a></li>
            <li><a href="#product" className="hover:text-blue-600 dark:hover:text-blue-400">{t('footer.careers')}</a></li>
            <li><a href="#faq" className="hover:text-blue-600 dark:hover:text-blue-400">{t('footer.contact')}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-zinc-900 dark:text-white mb-4">{t('footer.legal')}</h4>
          <ul className="space-y-2 text-zinc-500">
            <li><a href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400">{t('footer.privacy')}</a></li>
            <li><a href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400">{t('footer.terms')}</a></li>
            <li><a href="/security" className="hover:text-blue-600 dark:hover:text-blue-400">{t('footer.security')}</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-screen-2xl mx-auto px-6 pt-8 border-t border-zinc-200 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-center text-zinc-500">
        <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
        <p>{t('footer.designedFor')}</p>
      </div>
    </footer>
  );
}
