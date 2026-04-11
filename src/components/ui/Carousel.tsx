import * as React from 'react';
import { cn } from '../../lib/utils';

// ─── Context ────────────────────────────────────────────────────────────────

interface CarouselContextValue {
  current: number;
  count: number;
  goTo: (index: number) => void;
  prev: () => void;
  next: () => void;
  orientation: 'horizontal' | 'vertical';
  loop: boolean;
}

const CarouselContext = React.createContext<CarouselContextValue | null>(null);

function useCarousel() {
  const ctx = React.useContext(CarouselContext);
  if (!ctx) {
    throw new Error('Carousel sub-components must be used inside <Carousel>');
  }
  return ctx;
}

// ─── Root ────────────────────────────────────────────────────────────────────

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultIndex?: number;
  index?: number;
  onIndexChange?: (index: number) => void;
  orientation?: 'horizontal' | 'vertical';
  loop?: boolean;
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      className,
      defaultIndex = 0,
      index,
      onIndexChange,
      orientation = 'horizontal',
      loop = false,
      ...props
    },
    ref
  ) => {
    const [uncontrolled, setUncontrolled] = React.useState(defaultIndex);
    const [count, setCount] = React.useState(0);

    const current = index !== undefined ? index : uncontrolled;

    const goTo = React.useCallback(
      (i: number) => {
        setUncontrolled(i);
        onIndexChange?.(i);
      },
      [onIndexChange]
    );

    const prev = React.useCallback(() => {
      const target = current - 1;
      if (target < 0) {
        if (loop) goTo(count - 1);
      } else {
        goTo(target);
      }
    }, [current, count, loop, goTo]);

    const next = React.useCallback(() => {
      const target = current + 1;
      if (target >= count) {
        if (loop) goTo(0);
      } else {
        goTo(target);
      }
    }, [current, count, loop, goTo]);

    // Keyboard navigation
    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (orientation === 'horizontal') {
          if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
          else if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
        } else {
          if (e.key === 'ArrowUp') { e.preventDefault(); prev(); }
          else if (e.key === 'ArrowDown') { e.preventDefault(); next(); }
        }
      },
      [orientation, prev, next]
    );

    return (
      <CarouselContext.Provider value={{ current, count, goTo, prev, next, orientation, loop }}>
        {/* Internal setter so CarouselContent can register slide count */}
        <CarouselCountContext.Provider value={setCount}>
          <div
            ref={ref}
            role="region"
            aria-roledescription="carousel"
            aria-label="carousel"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className={cn('relative focus:outline-none', className)}
            {...props}
          />
        </CarouselCountContext.Provider>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = 'Carousel';

// Internal context to let CarouselContent report slide count upward
const CarouselCountContext = React.createContext<
  React.Dispatch<React.SetStateAction<number>>
>(() => {});

// ─── Content ─────────────────────────────────────────────────────────────────

export type CarouselContentProps = React.HTMLAttributes<HTMLDivElement>;

const CarouselContent = React.forwardRef<HTMLDivElement, CarouselContentProps>(
  ({ className, children, ...props }, ref) => {
    const { current, orientation } = useCarousel();
    const setCount = React.useContext(CarouselCountContext);

    const slides = React.Children.toArray(children);
    const count = slides.length;

    // Register slide count with parent
    React.useLayoutEffect(() => {
      setCount(count);
    }, [count, setCount]);

    const translateValue =
      orientation === 'horizontal'
        ? `translateX(-${current * 100}%)`
        : `translateY(-${current * 100}%)`;

    return (
      <div
        ref={ref}
        aria-live="polite"
        className={cn(
          'overflow-hidden',
          orientation === 'vertical' && 'h-full',
          className
        )}
        {...props}
      >
        <div
          className={cn(
            'flex transition-transform duration-500 ease-in-out will-change-transform',
            orientation === 'vertical' && 'flex-col'
          )}
          style={{ transform: translateValue }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${i + 1} of ${count}`}
              aria-hidden={current !== i}
              className={cn(
                'min-w-0 shrink-0 grow-0 basis-full',
                orientation === 'vertical' && 'min-h-0'
              )}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>
    );
  }
);
CarouselContent.displayName = 'CarouselContent';

// ─── Item ─────────────────────────────────────────────────────────────────────

export type CarouselItemProps = React.HTMLAttributes<HTMLDivElement>;

const CarouselItem = React.forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('w-full', className)} {...props} />
  )
);
CarouselItem.displayName = 'CarouselItem';

// ─── Previous Button ──────────────────────────────────────────────────────────

export type CarouselPreviousProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const CarouselPrevious = React.forwardRef<HTMLButtonElement, CarouselPreviousProps>(
  ({ className, ...props }, ref) => {
    const { prev, current, loop } = useCarousel();
    const isDisabled = !loop && current === 0;

    return (
      <button
        ref={ref}
        type="button"
        aria-label="Previous slide"
        onClick={prev}
        disabled={isDisabled}
        className={cn(
          'absolute left-3 top-1/2 z-10 -translate-y-1/2',
          'flex h-9 w-9 items-center justify-center rounded-full',
          'bg-white/80 shadow-md backdrop-blur-sm border border-zinc-200',
          'text-zinc-700 transition-colors hover:bg-white',
          'disabled:pointer-events-none disabled:opacity-40',
          'dark:bg-zinc-900/80 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900',
          className
        )}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
    );
  }
);
CarouselPrevious.displayName = 'CarouselPrevious';

// ─── Next Button ──────────────────────────────────────────────────────────────

export type CarouselNextProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const CarouselNext = React.forwardRef<HTMLButtonElement, CarouselNextProps>(
  ({ className, ...props }, ref) => {
    const { next, current, count, loop } = useCarousel();
    const isDisabled = !loop && current === count - 1;

    return (
      <button
        ref={ref}
        type="button"
        aria-label="Next slide"
        onClick={next}
        disabled={isDisabled}
        className={cn(
          'absolute right-3 top-1/2 z-10 -translate-y-1/2',
          'flex h-9 w-9 items-center justify-center rounded-full',
          'bg-white/80 shadow-md backdrop-blur-sm border border-zinc-200',
          'text-zinc-700 transition-colors hover:bg-white',
          'disabled:pointer-events-none disabled:opacity-40',
          'dark:bg-zinc-900/80 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900',
          className
        )}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    );
  }
);
CarouselNext.displayName = 'CarouselNext';

// ─── Dots / Indicator ─────────────────────────────────────────────────────────

export type CarouselDotsProps = React.HTMLAttributes<HTMLDivElement>;

const CarouselDots = React.forwardRef<HTMLDivElement, CarouselDotsProps>(
  ({ className, ...props }, ref) => {
    const { current, count, goTo } = useCarousel();

    return (
      <div
        ref={ref}
        role="tablist"
        aria-label="Slide indicators"
        className={cn('flex items-center justify-center gap-1.5 mt-3', className)}
        {...props}
      >
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={current === i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={cn(
              'h-2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500',
              current === i
                ? 'bg-indigo-600 w-6'
                : 'bg-zinc-300 dark:bg-zinc-600 w-2 hover:bg-zinc-400 dark:hover:bg-zinc-500'
            )}
          />
        ))}
      </div>
    );
  }
);
CarouselDots.displayName = 'CarouselDots';

// ─── Exports ──────────────────────────────────────────────────────────────────

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselDots };
