import { describe, it, expect } from 'vitest';
import { render } from './test-utils';
import ScrollToTop from '../components/shared/ScrollToTop';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

function TitleTestComponent({ title, desc }: { title: string; desc?: string }) {
  useDocumentTitle(title, desc);
  return <div>test</div>;
}

describe('ScrollToTop', () => {
  it('renders without crashing', () => {
    const { container } = render(<ScrollToTop />);
    expect(container.innerHTML).toBe('');
  });
});

describe('useDocumentTitle', () => {
  it('sets document title', () => {
    render(<TitleTestComponent title="Pricing — Propflow" />);
    expect(document.title).toBe('Pricing — Propflow');
  });

  it('sets meta description', () => {
    render(<TitleTestComponent title="Test" desc="A description" />);
    const meta = document.querySelector('meta[name="description"]');
    expect(meta?.getAttribute('content')).toBe('A description');
  });
});
