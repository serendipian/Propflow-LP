import React, { useEffect, useSyncExternalStore } from 'react';
import { useTranslation } from 'react-i18next';
import SmartLink from '../shared/SmartLink';
import {
  analyticsEnabled,
  initAnalytics,
  isBannerVisible,
  listenForConversions,
  setConsent,
  subscribeConsent,
} from '../../lib/analytics';

// The server snapshot is "hidden", so prerendered HTML never contains the banner;
// the browser shows it after hydration if the visitor hasn't chosen yet.
export default function CookieConsent({ enabled = analyticsEnabled }: { enabled?: boolean }) {
  const { t } = useTranslation();
  const visible = useSyncExternalStore(subscribeConsent, isBannerVisible, () => false);

  useEffect(() => {
    if (!enabled) return;
    initAnalytics();
    listenForConversions();
  }, [enabled]);

  if (!enabled || !visible) return null;

  return (
    <div
      role="dialog"
      aria-label={t('cookies.title')}
      className="fixed inset-x-4 bottom-4 z-[60] md:inset-x-auto md:right-6 md:bottom-6 md:max-w-sm rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl shadow-2xl p-5"
    >
      <p className="text-sm font-semibold text-zinc-900 dark:text-white mb-1">{t('cookies.title')}</p>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
        {t('cookies.text')}{' '}
        <SmartLink href="/privacy" className="underline underline-offset-2 hover:text-blue-600 dark:hover:text-blue-400">
          {t('cookies.policy')}
        </SmartLink>
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => setConsent('denied')}
          className="flex-1 h-10 rounded-lg text-sm font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
        >
          {t('cookies.decline')}
        </button>
        <button
          onClick={() => setConsent('granted')}
          className="flex-1 h-10 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-500 transition-colors"
        >
          {t('cookies.accept')}
        </button>
      </div>
    </div>
  );
}
