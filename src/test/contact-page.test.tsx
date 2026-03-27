import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from './test-utils';
import ContactPage from '../pages/ContactPage';

describe('ContactPage', () => {
  it('renders hero section', () => {
    render(<ContactPage />);
    expect(screen.getByText('Get in Touch')).toBeInTheDocument();
  });

  it('renders contact form fields', () => {
    render(<ContactPage />);
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/work email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it('renders contact info sidebar', () => {
    render(<ContactPage />);
    expect(screen.getByText('hello@propflow.app')).toBeInTheDocument();
    expect(screen.getByText('Casablanca, Morocco')).toBeInTheDocument();
  });

  it('shows validation errors on empty submit', async () => {
    const user = userEvent.setup();
    render(<ContactPage />);

    const submitBtn = screen.getByText('Send Message');
    await user.click(submitBtn);

    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });

  it('shows success state after valid submission', async () => {
    const user = userEvent.setup();
    render(<ContactPage />);

    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/work email/i), 'jane@test.com');
    await user.selectOptions(screen.getByLabelText(/subject/i), 'general');
    await user.type(screen.getByLabelText(/message/i), 'This is a test message for contact form.');

    await user.click(screen.getByText('Send Message'));

    expect(screen.getByText('Message Sent!')).toBeInTheDocument();
  });
});
