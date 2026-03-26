import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from './test-utils';
import Accordion from '../components/shared/Accordion';

const items = [
  { question: 'Question 1', answer: 'Answer 1' },
  { question: 'Question 2', answer: 'Answer 2' },
];

describe('Accordion', () => {
  it('renders all questions', () => {
    render(<Accordion items={items} />);
    expect(screen.getByText('Question 1')).toBeInTheDocument();
    expect(screen.getByText('Question 2')).toBeInTheDocument();
  });

  it('opens first item by default', () => {
    render(<Accordion items={items} />);
    const firstButton = screen.getByText('Question 1').closest('button');
    expect(firstButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('toggles items on click', async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);

    const secondButton = screen.getByText('Question 2').closest('button')!;
    expect(secondButton).toHaveAttribute('aria-expanded', 'false');

    await user.click(secondButton);
    expect(secondButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('respects defaultOpen prop', () => {
    render(<Accordion items={items} defaultOpen={1} />);
    const secondButton = screen.getByText('Question 2').closest('button');
    expect(secondButton).toHaveAttribute('aria-expanded', 'true');
  });
});
