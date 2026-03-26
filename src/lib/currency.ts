export interface LocaleConfig {
  locale: string;
  currency: string;
  symbol: string;
  rate: number; // conversion rate from USD
}

export const localeConfigs: Record<string, LocaleConfig> = {
  en: { locale: 'en-US', currency: 'USD', symbol: '$', rate: 1 },
  fr: { locale: 'fr-MA', currency: 'MAD', symbol: 'MAD', rate: 10 },
};

export function formatPrice(amount: number, lang: string): string {
  const config = localeConfigs[lang] || localeConfigs.en;
  const converted = Math.round(amount * config.rate);

  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(converted);
}
