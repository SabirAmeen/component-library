import * as React from "react";
import { cn } from "../../lib/utils";
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from "lucide-react";
import type { ToastVariant } from "../../hooks/use-toast";

export interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  onDismiss?: (id: string) => void;
  className?: string;
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ id, title, description, variant = "default", onDismiss, className }, ref) => {
    const icons = {
      default: null,
      success: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
      error: <AlertCircle className="h-5 w-5 text-red-500" />,
      info: <Info className="h-5 w-5 text-blue-500" />,
      warning: <AlertTriangle className="h-5 w-5 text-amber-500" />,
    };

    const variants = {
      default: "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-950 dark:text-zinc-50",
      success: "bg-white dark:bg-zinc-900 border-emerald-100 dark:border-emerald-900/30 text-zinc-950 dark:text-zinc-50",
      error: "bg-white dark:bg-zinc-900 border-red-100 dark:border-red-900/30 text-zinc-950 dark:text-zinc-50",
      info: "bg-white dark:bg-zinc-900 border-blue-100 dark:border-blue-900/30 text-zinc-950 dark:text-zinc-50",
      warning: "bg-white dark:bg-zinc-900 border-amber-100 dark:border-amber-900/30 text-zinc-950 dark:text-zinc-50",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-xl border p-4 pr-8 shadow-lg transition-all animate-in slide-in-from-right-full fade-in duration-300",
          variants[variant],
          className
        )}
      >
        <div className="flex gap-3">
          {icons[variant] && <div className="mt-0.5">{icons[variant]}</div>}
          <div className="grid gap-1">
            {title && <div className="text-sm font-semibold">{title}</div>}
            {description && (
              <div className="text-sm opacity-70 leading-relaxed">{description}</div>
            )}
          </div>
        </div>
        <button
          onClick={() => onDismiss?.(id)}
          className="absolute right-2 top-2 rounded-md p-1 text-zinc-950/50 opacity-0 transition-opacity hover:text-zinc-950 focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 dark:text-zinc-50/50 dark:hover:text-zinc-50"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }
);
Toast.displayName = "Toast";

export { Toast };
