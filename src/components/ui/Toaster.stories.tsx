import type { Meta, StoryObj } from '@storybook/react';
import { Toaster } from './Toaster';
import { toast } from '../../hooks/use-toast';
import { Button } from './Button';

const meta: Meta<typeof Toaster> = {
  title: 'UI/Toaster',
  component: Toaster,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toaster>;

export const Default: Story = {
  render: (args) => {
    return (
      <div className="flex flex-col gap-4 items-center p-12">
        <Toaster {...args} />
        <Button
          onClick={() =>
            toast({
              title: "Success",
              description: "Action completed successfully",
              variant: "success",
            })
          }
        >
          Show Toast
        </Button>
      </div>
    );
  },
  args: {
    position: 'bottom-right',
  },
};
