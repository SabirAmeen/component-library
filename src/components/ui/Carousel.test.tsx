import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from './Carousel';

test('renders carousel components', () => {
  render(
    <Carousel>
      <CarouselContent>
        <CarouselItem>Slide 1</CarouselItem>
        <CarouselItem>Slide 2</CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
  
  expect(screen.getByText('Slide 1')).toBeInTheDocument();
  expect(screen.getByText('Slide 2')).toBeInTheDocument();
});
