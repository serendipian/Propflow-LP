import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from './test-utils';
import Pricing from '../components/landing/Pricing';

describe('Pricing', () => {
  it('renders three plan cards', () => {
    render(<Pricing />);
    expect(screen.getByText('Solo')).toBeInTheDocument();
    expect(screen.getByText('Team')).toBeInTheDocument();
    expect(screen.getByText('Enterprise')).toBeInTheDocument();
  });

  it('renders billing toggle', () => {
    render(<Pricing />);
    expect(screen.getByRole('radio', { name: /monthly/i })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /yearly/i })).toBeInTheDocument();
  });

  it('shows pricing section heading', () => {
    render(<Pricing />);
    const section = document.querySelector('#pricing');
    expect(section).toBeInTheDocument();
  });

  it('can switch billing cycle', async () => {
    const user = userEvent.setup();
    render(<Pricing />);
    const monthlyBtn = screen.getByRole('radio', { name: /monthly/i });
    await user.click(monthlyBtn);
    expect(monthlyBtn).toHaveAttribute('aria-checked', 'true');
  });
});
