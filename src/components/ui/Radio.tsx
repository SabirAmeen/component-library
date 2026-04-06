import * as React from "react";
import { cn } from "../../lib/utils";

export interface RadioProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        <label className="flex items-center gap-2 group cursor-pointer w-fit">
          <input
            type="radio"
            className={cn(
              "peer sr-only",
              className
            )}
            ref={ref}
            {...props}
          />
          <div className="relative flex items-center justify-center h-5 w-5 rounded-full border border-zinc-300 bg-white group-hover:border-indigo-500 peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-500 transition-all peer-checked:border-indigo-600">
            {/* Custom Dot */}
            <div className="h-2.5 w-2.5 rounded-full bg-indigo-600 opacity-0 scale-50 peer-checked:opacity-100 peer-checked:scale-100 transition-all pointer-events-none" />
          </div>
          {label && (
            <span className="text-sm font-medium leading-none text-zinc-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {label}
            </span>
          )}
        </label>
      </div>
    );
  }
);
Radio.displayName = "Radio";

export { Radio };
