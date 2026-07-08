import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from './test-utils';
import DemoPage from '../pages/DemoPage';

describe('DemoPage', () => {
  it('renders the demo hero heading', () => {
    render(<DemoPage />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('renders the Calendly scheduler container', () => {
    render(<DemoPage />);
    // SCHEDULER_URL is set, so the live Calendly embed renders instead of the
    // placeholder. The embed container is labelled for accessibility.
    expect(screen.getByLabelText(/calendly scheduling/i)).toBeInTheDocument();
  });

  it('offers an email fallback link to /contact', () => {
    render(<DemoPage />);
    const link = document.querySelector('a[href="/contact"]');
    expect(link).toBeInTheDocument();
  });

  it('renders the FAQ questions', () => {
    render(<DemoPage />);
    expect(screen.getByText(/how long does the demo take/i)).toBeInTheDocument();
  });
});
