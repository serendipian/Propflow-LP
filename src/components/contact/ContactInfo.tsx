import React from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Clock, Calendar } from 'lucide-react';
import { Button } from '../ui/UI';

export default function ContactInfo() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
        {t('contactPage.info.title')}
      </h3>

      <div className="space-y-4">
        <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
            <Mail size={18} />
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-white">Email</p>
            <p className="text-sm text-zinc-500">{t('contactPage.info.email')}</p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
            <Phone size={18} />
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-white">Phone</p>
            <p className="text-sm text-zinc-500">{t('contactPage.info.phone')}</p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
            <MapPin size={18} />
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-white">Office</p>
            <p className="text-sm text-zinc-500">{t('contactPage.info.address')}</p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
            <Clock size={18} />
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-white">
              {t('contactPage.info.hoursLabel')}
            </p>
            <p className="text-sm text-zinc-500">{t('contactPage.info.hours')}</p>
          </div>
        </div>
      </div>

      {/* Book a Demo CTA Card */}
      <div className="p-6 rounded-2xl bg-blue-600 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={20} />
            <h4 className="font-bold">{t('contactPage.info.demo.title')}</h4>
          </div>
          <p className="text-sm text-blue-100 mb-4">
            {t('contactPage.info.demo.description')}
          </p>
          <Button
            variant="secondary"
            className="w-full !bg-white !text-blue-600 hover:!bg-blue-50"
          >
            {t('contactPage.info.demo.cta')}
          </Button>
        </div>
      </div>
    </div>
  );
}
