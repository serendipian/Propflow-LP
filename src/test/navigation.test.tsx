import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from './test-utils';
import Navigation from '../components/layout/Navigation';

describe('Navigation', () => {
  it('renders the Propflow brand name', () => {
    render(<Navigation />);
    expect(screen.getByText('Propflow')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Navigation />);
    expect(screen.getByText('Product')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
  });

  it('renders CTA buttons', () => {
    render(<Navigation />);
    // Sign In and Book Demo buttons (desktop + mobile = multiple)
    const signInButtons = screen.getAllByText(/sign in/i);
    expect(signInButtons.length).toBeGreaterThanOrEqual(1);
  });

  it('renders the promo bar', () => {
    render(<Navigation />);
    const promoLink = document.querySelector('a[href="/pricing"]');
    expect(promoLink).toBeInTheDocument();
  });

  it('navigates to /book-a-demo when Book Demo is clicked', async () => {
    const user = userEvent.setup();
    render(<Navigation />);
    const buttons = screen.getAllByText(/book demo/i);
    await user.click(buttons[0]);
    expect(window.location.pathname).toBe('/book-a-demo');
  });

  it('locks body scroll while the mobile menu is open', async () => {
    const user = userEvent.setup();
    render(<Navigation />);
    const toggle = screen.getByLabelText(/open menu/i);
    await user.click(toggle);
    expect(document.body.style.overflow).toBe('hidden');
    await user.click(screen.getByLabelText(/close menu/i));
    expect(document.body.style.overflow).toBe('');
  });
});
