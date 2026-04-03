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
        <label className="flex items-center gap-2 group cursor-pointer">
          <div className="relative flex items-center justify-center h-5 w-5 rounded border border-zinc-300 bg-white group-hover:border-indigo-500 group-focus-within:ring-2 group-focus-within:ring-indigo-500 transition-all">
            <input
              type="checkbox"
              className={cn(
                "peer absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed",
                className
              )}
              ref={ref}
              {...props}
            />
            {/* Custom Checkmark SVG */}
            <svg
              className="h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <div className="absolute inset-0 rounded bg-indigo-600 opacity-0 peer-checked:opacity-100 -z-10 transition-opacity" />
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
