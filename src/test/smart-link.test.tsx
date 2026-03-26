import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from './test-utils';
import SmartLink from '../components/shared/SmartLink';

describe('SmartLink', () => {
  it('renders route links as react-router Link', () => {
    render(<SmartLink href="/pricing">Pricing</SmartLink>);
    const link = screen.getByText('Pricing');
    expect(link.tagName).toBe('A');
    expect(link.getAttribute('href')).toBe('/pricing');
  });

  it('renders hash links as anchor tags', () => {
    render(<SmartLink href="#product">Product</SmartLink>);
    const link = screen.getByText('Product');
    expect(link.tagName).toBe('A');
    expect(link.getAttribute('href')).toBe('#product');
  });

  it('renders external links as plain anchors', () => {
    render(<SmartLink href="https://example.com">External</SmartLink>);
    const link = screen.getByText('External');
    expect(link.tagName).toBe('A');
    expect(link.getAttribute('href')).toBe('https://example.com');
  });

  it('applies className to all link types', () => {
    render(<SmartLink href="/pricing" className="text-blue-600">Link</SmartLink>);
    expect(screen.getByText('Link')).toHaveClass('text-blue-600');
  });
});
