import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';

const meta: Meta<typeof Toast> = {
  title: 'UI/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    id: { control: 'text' },
    title: { control: 'text' },
    description: { control: 'text' },
    variant: {
      control: 'select',
      options: ['default', 'success', 'error', 'info', 'warning'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  args: {
    id: '1',
    title: 'Notification',
    description: 'This is a default toast.',
    variant: 'default',
  },
};

export const Success: Story = {
  args: {
    id: '2',
    title: 'Success!',
    description: 'Your action was successful.',
    variant: 'success',
  },
};

export const ErrorToast: Story = {
  args: {
    id: '3',
    title: 'Error Encountered',
    description: 'Something went wrong.',
    variant: 'error',
  },
};

export const Warning: Story = {
  args: {
    id: '4',
    title: 'Warning',
    description: 'Please be careful.',
    variant: 'warning',
  },
};

export const Info: Story = {
  args: {
    id: '5',
    title: 'Information',
    description: 'System update available.',
    variant: 'info',
  },
};
