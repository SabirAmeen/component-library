import * as React from "react";
import { cn } from "../../lib/utils";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        <label className="flex items-center gap-2 group cursor-pointer w-fit">
          <input
            type="checkbox"
            className={cn(
              "peer sr-only",
              className
            )}
            ref={ref}
            {...props}
          />
          <div className="relative flex items-center justify-center h-5 w-5 rounded border border-zinc-300 bg-white group-hover:border-indigo-500 peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-500 transition-all peer-checked:border-indigo-600 peer-checked:bg-indigo-600">
            {/* Custom Checkmark SVG */}
            <svg
              className="h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none z-10"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          {label && (
            <span className="text-sm font-medium leading-none text-zinc-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {label}
            </span>
          )}
        </label>
        {error && (
          <p className="text-xs font-medium text-red-500">{error}</p>
        )}
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
