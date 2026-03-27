import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Send, CheckCircle } from 'lucide-react';
import { Button } from '../ui/UI';
import { useContactForm } from '../../hooks/useContactForm';

export default function ContactForm() {
  const { t } = useTranslation();
  const { data, errors, touched, submitted, setField, touchField, handleSubmit, reset } =
    useContactForm(t);
  const successRef = useRef<HTMLDivElement>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = handleSubmit();
    if (success && successRef.current) {
      successRef.current.focus();
    }
  };

  if (submitted) {
    return (
      <motion.div
        ref={successRef}
        tabIndex={-1}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-12 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={32} className="text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
          {t('contactPage.success.title')}
        </h3>
        <p className="text-zinc-500 dark:text-zinc-400 mb-8">
          {t('contactPage.success.message')}
        </p>
        <Button variant="outline" onClick={reset}>
          {t('contactPage.success.sendAnother')}
        </Button>
      </motion.div>
    );
  }

  const subjects = ['general', 'demo', 'sales', 'partnership'] as const;

  const fieldError = (field: keyof typeof errors) =>
    touched.has(field) && errors[field] ? (
      <p id={`${field}-error`} className="text-red-500 dark:text-red-400 text-xs mt-1">
        {errors[field]}
      </p>
    ) : null;

  const inputClass = (field: keyof typeof errors) =>
    `w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 border rounded-xl text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-zinc-400 ${
      touched.has(field) && errors[field]
        ? 'border-red-500 dark:border-red-400'
        : 'border-zinc-200 dark:border-zinc-700'
    }`;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2">
          {t('contactPage.form.name')} *
        </label>
        <input
          id="name"
          type="text"
          value={data.name}
          onChange={(e) => setField('name', e.target.value)}
          onBlur={() => touchField('name')}
          placeholder={t('contactPage.form.namePlaceholder')}
          aria-describedby={errors.name ? 'name-error' : undefined}
          aria-invalid={touched.has('name') && !!errors.name}
          className={inputClass('name')}
        />
        {fieldError('name')}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2">
          {t('contactPage.form.email')} *
        </label>
        <input
          id="email"
          type="email"
          value={data.email}
          onChange={(e) => setField('email', e.target.value)}
          onBlur={() => touchField('email')}
          placeholder={t('contactPage.form.emailPlaceholder')}
          aria-describedby={errors.email ? 'email-error' : undefined}
          aria-invalid={touched.has('email') && !!errors.email}
          className={inputClass('email')}
        />
        {fieldError('email')}
      </div>

      {/* Company */}
      <div>
        <label htmlFor="company" className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2">
          {t('contactPage.form.company')}
        </label>
        <input
          id="company"
          type="text"
          value={data.company}
          onChange={(e) => setField('company', e.target.value)}
          placeholder={t('contactPage.form.companyPlaceholder')}
          className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-zinc-400"
        />
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2">
          {t('contactPage.form.subject')} *
        </label>
        <select
          id="subject"
          value={data.subject}
          onChange={(e) => setField('subject', e.target.value)}
          onBlur={() => touchField('subject')}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
          aria-invalid={touched.has('subject') && !!errors.subject}
          className={inputClass('subject')}
        >
          <option value="">{t('contactPage.form.subjectPlaceholder')}</option>
          {subjects.map((s) => (
            <option key={s} value={s}>
              {t(`contactPage.form.subjectOptions.${s}`)}
            </option>
          ))}
        </select>
        {fieldError('subject')}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2">
          {t('contactPage.form.message')} *
        </label>
        <textarea
          id="message"
          rows={5}
          value={data.message}
          onChange={(e) => setField('message', e.target.value)}
          onBlur={() => touchField('message')}
          placeholder={t('contactPage.form.messagePlaceholder')}
          aria-describedby={errors.message ? 'message-error' : undefined}
          aria-invalid={touched.has('message') && !!errors.message}
          className={inputClass('message')}
        />
        {fieldError('message')}
      </div>

      <Button variant="primary" className="w-full !h-14 !text-base">
        <Send size={18} />
        {t('contactPage.form.submit')}
      </Button>
    </form>
  );
}
