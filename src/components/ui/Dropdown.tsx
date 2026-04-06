import * as React from "react";
import { cn } from "../../lib/utils";

const DropdownContext = React.createContext<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

function useDropdown() {
  const context = React.useContext(DropdownContext);
  if (!context) {
    throw new Error("Dropdown components must be used within a Dropdown provider");
  }
  return context;
}

export type DropdownProps = React.HTMLAttributes<HTMLDivElement>;

const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  ({ className, children, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      const handleOutsideClick = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleOutsideClick);
      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }, []);

    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref]
    );

    return (
      <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
        <div ref={setRefs} className={cn("relative inline-block text-left", className)} {...props}>
          {children}
        </div>
      </DropdownContext.Provider>
    );
  }
);
Dropdown.displayName = "Dropdown";

export type DropdownTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const DropdownTrigger = React.forwardRef<HTMLButtonElement, DropdownTriggerProps>(
  ({ className, onClick, ...props }, ref) => {
    const { isOpen, setIsOpen } = useDropdown();

    return (
      <button
        ref={ref}
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={(e) => {
          setIsOpen(!isOpen);
          onClick?.(e);
        }}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300",
          className
        )}
        {...props}
      />
    );
  }
);
DropdownTrigger.displayName = "DropdownTrigger";

export type DropdownMenuProps = React.HTMLAttributes<HTMLDivElement>;

const DropdownMenu = React.forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ className, ...props }, ref) => {
    const { isOpen } = useDropdown();

    if (!isOpen) return null;

    return (
      <div
        ref={ref}
        data-state={isOpen ? "open" : "closed"}
        data-side="bottom"
        className={cn(
          "absolute right-0 z-50 mt-2 min-w-[8rem] overflow-hidden rounded-md border border-zinc-200 bg-white p-1 text-zinc-950 shadow-md",
          "animate-in fade-in-0 zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          "dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50",
          className
        )}
        {...props}
      />
    );
  }
);
DropdownMenu.displayName = "DropdownMenu";

export type DropdownItemProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const DropdownItem = React.forwardRef<HTMLButtonElement, DropdownItemProps>(
  ({ className, onClick, ...props }, ref) => {
    const { setIsOpen } = useDropdown();

    return (
      <button
        ref={ref}
        role="menuitem"
        onClick={(e) => {
          setIsOpen(false);
          onClick?.(e);
        }}
        className={cn(
          "relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus:bg-zinc-100 focus:text-zinc-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-zinc-800 dark:focus:text-zinc-50 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
          className
        )}
        {...props}
      />
    );
  }
);
DropdownItem.displayName = "DropdownItem";

export type DropdownLabelProps = React.HTMLAttributes<HTMLDivElement>;

const DropdownLabel = React.forwardRef<HTMLDivElement, DropdownLabelProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("px-2 py-1.5 text-sm font-semibold", className)}
      {...props}
    />
  )
);
DropdownLabel.displayName = "DropdownLabel";

export type DropdownSeparatorProps = React.HTMLAttributes<HTMLDivElement>;

const DropdownSeparator = React.forwardRef<HTMLDivElement, DropdownSeparatorProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("-mx-1 my-1 h-px bg-zinc-100 dark:bg-zinc-800", className)}
      {...props}
    />
  )
);
DropdownSeparator.displayName = "DropdownSeparator";

export {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
};
