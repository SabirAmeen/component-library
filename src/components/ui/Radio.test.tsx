import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import { Radio } from './Radio';

test('renders radio items', () => {
  render(
    <div>
      <Radio value="1" label="Option 1" name="test" />
      <Radio value="2" label="Option 2" name="test" />
    </div>
  );
  expect(screen.getByText('Option 1')).toBeInTheDocument();
  expect(screen.getByText('Option 2')).toBeInTheDocument();
});

test('handles value change', async () => {
  const handleChange = vi.fn();
  render(
    <div>
      <Radio value="1" label="Option 1" name="test" />
      <Radio value="2" label="Option 2" name="test" onChange={handleChange} />
    </div>
  );
  
  const radios = screen.getAllByRole('radio');
  await userEvent.click(radios[1]);
  
  expect(handleChange).toHaveBeenCalled();
});
