import type { Meta, StoryObj } from '@storybook/react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
} from './Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'UI/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger className="border border-zinc-200 px-4 py-2 rounded-md hover:bg-zinc-100">
        Open Menu
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownLabel>My Account</DropdownLabel>
        <DropdownSeparator />
        <DropdownItem>Profile</DropdownItem>
        <DropdownItem>Billing</DropdownItem>
        <DropdownItem>Team</DropdownItem>
        <DropdownItem>Subscription</DropdownItem>
        <DropdownSeparator />
        <DropdownItem disabled>Delete Account (Disabled)</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  ),
};
