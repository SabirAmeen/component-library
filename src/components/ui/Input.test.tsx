import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import { Input } from './Input';

test('renders input with placeholder', () => {
  render(<Input placeholder="Enter text" />);
  expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
});

test('handles value change', async () => {
  const handleChange = vi.fn();
  render(<Input placeholder="Enter text" onChange={handleChange} />);
  
  const input = screen.getByPlaceholderText('Enter text');
  await userEvent.type(input, 'hello');
  
  expect(handleChange).toHaveBeenCalled();
});
