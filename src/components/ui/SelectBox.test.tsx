import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { SelectBox } from './SelectBox';

test('renders select button', () => {
  const options = [{ value: '1', label: 'Option 1' }];
  render(
    <SelectBox placeholder="Select an option" options={options} />
  );
  expect(screen.getByRole('combobox')).toBeInTheDocument();
  expect(screen.getByText('Select an option')).toBeInTheDocument();
  expect(screen.getByText('Option 1')).toBeInTheDocument();
});
