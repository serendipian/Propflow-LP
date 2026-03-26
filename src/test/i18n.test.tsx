import { describe, it, expect, beforeEach } from 'vitest';
import i18n from '../lib/i18n';

describe('i18n', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en');
  });

  it('has English as default/fallback', () => {
    expect(i18n.options.fallbackLng).toContain('en');
  });

  it('translates hero keys in English', () => {
    expect(i18n.t('hero.badge')).toBeTruthy();
    expect(i18n.t('hero.badge')).not.toBe('hero.badge');
  });

  it('translates hero keys in French', async () => {
    await i18n.changeLanguage('fr');
    expect(i18n.t('hero.badge')).toBeTruthy();
    expect(i18n.t('hero.badge')).not.toBe('hero.badge');
  });

  it('switches between languages', async () => {
    const enText = i18n.t('hero.headline1');
    await i18n.changeLanguage('fr');
    const frText = i18n.t('hero.headline1');
    expect(enText).not.toBe(frText);
  });

  it('has pricing keys in both languages', async () => {
    expect(i18n.t('pricing.title')).not.toBe('pricing.title');
    await i18n.changeLanguage('fr');
    expect(i18n.t('pricing.title')).not.toBe('pricing.title');
  });
});
