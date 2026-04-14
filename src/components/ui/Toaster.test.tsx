import { render } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Toaster } from './Toaster';

test('renders toaster', () => {
  const { container } = render(<Toaster />);
  // Check if toaster mounts successfully
  expect(container).toBeTruthy();
});
