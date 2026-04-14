import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import { Checkbox } from './Checkbox';

test('renders checkbox', () => {
  render(<Checkbox label="Accept terms" />);
  expect(screen.getByRole('checkbox')).toBeInTheDocument();
  expect(screen.getByText('Accept terms')).toBeInTheDocument();
});

test('can be checked', async () => {
  const handleChange = vi.fn();
  render(<Checkbox label="Accept terms" onChange={handleChange} />);
  
  const checkbox = screen.getByRole('checkbox');
  await userEvent.click(checkbox);
  
  expect(handleChange).toHaveBeenCalled();
});

