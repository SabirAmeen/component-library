import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Toast } from './Toast';

test('renders toast', () => {
  render(
    <Toast id="1" title="Notification" description="Action completed successfully." />
  );
  
  expect(screen.getByText('Notification')).toBeInTheDocument();
  expect(screen.getByText('Action completed successfully.')).toBeInTheDocument();
});
