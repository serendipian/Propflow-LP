import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useContactForm, validateContactForm } from '../hooks/useContactForm';

const mockT = (key: string) => key;

describe('validateContactForm', () => {
  it('returns errors for empty fields', () => {
    const errors = validateContactForm(
      { name: '', email: '', company: '', subject: '', message: '' },
      mockT
    );
    expect(errors.name).toBeTruthy();
    expect(errors.email).toBeTruthy();
    expect(errors.subject).toBeTruthy();
    expect(errors.message).toBeTruthy();
  });

  it('returns no errors for valid data', () => {
    const errors = validateContactForm(
      {
        name: 'John Doe',
        email: 'john@test.com',
        company: 'Acme',
        subject: 'general',
        message: 'Hello there, this is a test message.',
      },
      mockT
    );
    expect(Object.keys(errors)).toHaveLength(0);
  });

  it('validates email format', () => {
    const errors = validateContactForm(
      { name: 'John', email: 'notanemail', company: '', subject: 'general', message: 'Hello world test' },
      mockT
    );
    expect(errors.email).toBeTruthy();
  });

  it('validates minimum message length', () => {
    const errors = validateContactForm(
      { name: 'John', email: 'john@test.com', company: '', subject: 'general', message: 'Short' },
      mockT
    );
    expect(errors.message).toBeTruthy();
  });
});

describe('useContactForm', () => {
  it('starts with empty data', () => {
    const { result } = renderHook(() => useContactForm(mockT));
    expect(result.current.data.name).toBe('');
    expect(result.current.submitted).toBe(false);
  });

  it('updates field values', () => {
    const { result } = renderHook(() => useContactForm(mockT));
    act(() => result.current.setField('name', 'Jane'));
    expect(result.current.data.name).toBe('Jane');
  });

  it('rejects invalid submission', () => {
    const { result } = renderHook(() => useContactForm(mockT));
    let success: boolean;
    act(() => { success = result.current.handleSubmit(); });
    expect(success!).toBe(false);
    expect(result.current.errors.name).toBeTruthy();
  });

  it('accepts valid submission', () => {
    const { result } = renderHook(() => useContactForm(mockT));
    act(() => {
      result.current.setField('name', 'Jane Doe');
      result.current.setField('email', 'jane@test.com');
      result.current.setField('subject', 'general');
      result.current.setField('message', 'This is a test message for the form.');
    });
    let success: boolean;
    act(() => { success = result.current.handleSubmit(); });
    expect(success!).toBe(true);
    expect(result.current.submitted).toBe(true);
  });

  it('resets form state', () => {
    const { result } = renderHook(() => useContactForm(mockT));
    act(() => {
      result.current.setField('name', 'Jane');
      result.current.reset();
    });
    expect(result.current.data.name).toBe('');
    expect(result.current.submitted).toBe(false);
  });
});
