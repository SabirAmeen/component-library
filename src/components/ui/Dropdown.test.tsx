import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from './Dropdown';

test('renders dropdown trigger', () => {
  render(
    <Dropdown>
      <DropdownTrigger>Open Menu</DropdownTrigger>
      <DropdownMenu>
        <DropdownItem>Item 1</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
  
  expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument();
});
