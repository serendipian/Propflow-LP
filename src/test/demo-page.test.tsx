import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from './test-utils';
import DemoPage from '../pages/DemoPage';

describe('DemoPage', () => {
  it('renders the demo hero heading', () => {
    render(<DemoPage />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('renders the scheduler placeholder', () => {
    render(<DemoPage />);
    // placeholderTitle copy from en.json
    expect(screen.getByText(/scheduler loads here/i)).toBeInTheDocument();
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
