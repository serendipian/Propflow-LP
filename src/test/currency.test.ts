import { describe, it, expect } from 'vitest';
import { formatPrice, localeConfigs } from '../lib/currency';

describe('formatPrice', () => {
  it('formats USD prices for English locale', () => {
    expect(formatPrice(49, 'en')).toBe('$49');
    expect(formatPrice(99, 'en')).toBe('$99');
    expect(formatPrice(0, 'en')).toBe('$0');
  });

  it('converts and formats MAD prices for French locale', () => {
    const result = formatPrice(49, 'fr');
    // 49 USD * 10 = 490 MAD
    expect(result).toContain('490');
    expect(result).toContain('MAD');
  });

  it('falls back to USD for unknown language', () => {
    expect(formatPrice(49, 'de')).toBe('$49');
  });

  it('rounds converted values', () => {
    const result = formatPrice(29, 'fr');
    // 29 * 10 = 290 MAD
    expect(result).toContain('290');
  });
});

describe('localeConfigs', () => {
  it('has en and fr configs', () => {
    expect(localeConfigs.en).toBeDefined();
    expect(localeConfigs.fr).toBeDefined();
  });

  it('has correct rate for MAD', () => {
    expect(localeConfigs.fr.rate).toBe(10);
  });

  it('has 1:1 rate for USD', () => {
    expect(localeConfigs.en.rate).toBe(1);
  });
});
