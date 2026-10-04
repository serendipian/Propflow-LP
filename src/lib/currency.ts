import { brand } from '../data/brand';

// Plan and add-on prices (src/data/pricing.ts) are stored in USD. Each brand
// shows a single currency (`currency` in brands.json: code + fixed rate from
// USD), whatever the reader's language; the language only sets number format.
export interface CurrencyConfig {
  code: string;
  rate: number; // conversion rate from USD
}

const numberLocales: Record<string, string> = { en: 'en-US', fr: 'fr-MA' };

export function formatPrice(amount: number, lang: string, currency: CurrencyConfig = brand.currency): string {
  return new Intl.NumberFormat(numberLocales[lang] ?? 'en-US', {
    style: 'currency',
    currency: currency.code,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(amount * currency.rate));
}
