import { describe, it, expect } from 'vitest';
import { formatPrice } from '../lib/currency';
import { brand } from '../data/brand';

describe('formatPrice', () => {
  it('uses the brand currency in every language', () => {
    expect(brand.currency.code).toBe('MAD');
    for (const lang of ['en', 'fr', 'de']) {
      const result = formatPrice(49, lang);
      expect(result).toContain('490'); // 49 USD * 10
      expect(result).toContain('MAD');
    }
  });

  it('rounds converted values', () => {
    expect(formatPrice(2.96, 'en')).toContain('30');
  });

  it('formats another currency when given one', () => {
    expect(formatPrice(49, 'en', { code: 'USD', rate: 1 })).toBe('$49');
    expect(formatPrice(0, 'en', { code: 'USD', rate: 1 })).toBe('$0');
  });
});
