import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './Radio';

const meta: Meta<typeof Radio> = {
  title: 'UI/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    checked: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: {
    label: 'Radio Option',
  },
};

export const Checked: Story = {
  args: {
    label: 'Checked Option',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Option',
    disabled: true,
  },
};

export const CheckedDisabled: Story = {
  args: {
    label: 'Checked & Disabled',
    checked: true,
    disabled: true,
  },
};
