import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from './test-utils';
import PricingHero from '../components/pricing/PricingHero';
import PlanCards from '../components/pricing/PlanCards';
import PricingPage from '../pages/PricingPage';

describe('PricingHero', () => {
  it('renders title and billing toggle', () => {
    render(<PricingHero billing="yearly" onBillingChange={() => {}} />);
    expect(screen.getByText('Simple, Transparent Pricing')).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /monthly/i })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /yearly/i })).toBeInTheDocument();
  });

  it('calls onBillingChange when toggling', async () => {
    const user = userEvent.setup();
    let billing: string = 'yearly';
    const onChange = (cycle: string) => { billing = cycle; };
    render(<PricingHero billing="yearly" onBillingChange={onChange} />);

    await user.click(screen.getByRole('radio', { name: /monthly/i }));
    expect(billing).toBe('monthly');
  });
});

describe('PlanCards', () => {
  it('renders all three plans', () => {
    render(<PlanCards billing="yearly" selectedPlan="team" onSelectPlan={() => {}} />);
    expect(screen.getByText('Solo')).toBeInTheDocument();
    expect(screen.getByText('Team')).toBeInTheDocument();
    expect(screen.getByText('Enterprise')).toBeInTheDocument();
  });
});

describe('PricingPage', () => {
  it('renders all sections', () => {
    render(<PricingPage />);
    expect(screen.getByText('Simple, Transparent Pricing')).toBeInTheDocument();
    expect(screen.getAllByText('Solo').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Team').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Enterprise').length).toBeGreaterThanOrEqual(1);
  });
});
