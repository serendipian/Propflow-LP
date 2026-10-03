import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from '../data/locales/en.json';
import fr from '../data/locales/fr.json';
import { brand } from '../data/brand';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
      // Brand values any string can use, e.g. "{{brand}}" or "{{helloEmail}}".
      defaultVariables: { brand: brand.name, legalName: brand.legalName, helloEmail: brand.emails.hello },
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
