import type { Meta, StoryObj } from '@storybook/react';
import { SelectBox } from './SelectBox';

const meta: Meta<typeof SelectBox> = {
  title: 'UI/SelectBox',
  component: SelectBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    error: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof SelectBox>;

const exampleOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
];

export const Default: Story = {
  args: {
    placeholder: 'Select a fruit',
    options: exampleOptions,
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Favorite Fruit',
    placeholder: 'Select a fruit',
    options: exampleOptions,
  },
};

export const WithError: Story = {
  args: {
    label: 'Fruit',
    placeholder: 'Select a fruit',
    options: exampleOptions,
    error: 'Please select an option.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Fruit',
    placeholder: 'Select a fruit',
    options: exampleOptions,
    disabled: true,
  },
};
