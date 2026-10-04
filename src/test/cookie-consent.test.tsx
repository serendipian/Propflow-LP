import { describe, it, expect, beforeEach } from 'vitest';
import { act } from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from './test-utils';
import CookieConsent from '../components/layout/CookieConsent';
import { getConsent, openCookieSettings } from '../lib/analytics';

describe('CookieConsent', () => {
  beforeEach(() => localStorage.clear());

  it('stays hidden when analytics is not configured', () => {
    render(<CookieConsent enabled={false} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('asks first-time visitors and remembers a refusal', async () => {
    render(<CookieConsent enabled />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Decline' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(getConsent()).toBe('denied');
  });

  it('does not ask again once the visitor has chosen, but can be reopened', () => {
    localStorage.setItem('analytics-consent', 'denied');
    render(<CookieConsent enabled />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    act(() => openCookieSettings());
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
