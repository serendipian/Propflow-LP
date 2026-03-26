import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
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
});
