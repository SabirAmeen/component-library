import type { Meta, StoryObj } from '@storybook/react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from './Carousel';

const meta: Meta<typeof Carousel> = {
  title: 'UI/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    loop: { control: 'boolean' },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  render: (args) => (
    <div className="w-[400px]">
      <Carousel {...args}>
        <CarouselContent>
          <CarouselItem className="flex items-center justify-center p-12 border bg-zinc-50 rounded-xl">
            <span className="text-4xl font-semibold">Slide 1</span>
          </CarouselItem>
          <CarouselItem className="flex items-center justify-center p-12 border bg-zinc-50 rounded-xl">
            <span className="text-4xl font-semibold">Slide 2</span>
          </CarouselItem>
          <CarouselItem className="flex items-center justify-center p-12 border bg-zinc-50 rounded-xl">
            <span className="text-4xl font-semibold">Slide 3</span>
          </CarouselItem>
          <CarouselItem className="flex items-center justify-center p-12 border bg-zinc-50 rounded-xl">
            <span className="text-4xl font-semibold">Slide 4</span>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <CarouselDots />
      </Carousel>
    </div>
  ),
  args: {
    loop: false,
    orientation: 'horizontal',
  },
};

export const Looped: Story = {
  ...Default,
  args: {
    loop: true,
  },
};
