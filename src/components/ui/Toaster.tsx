import { useToast } from "../../hooks/use-toast";
import { Toast } from "./Toast";
import { cn } from "../../lib/utils";

export type ToasterPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface ToasterProps {
  position?: ToasterPosition;
  className?: string;
}

export function Toaster({ position = "bottom-right", className }: ToasterProps) {
  const { toasts, dismiss } = useToast();

  const positions = {
    "top-left": "top-0 left-0 flex-col-reverse",
    "top-center": "top-0 left-1/2 -translate-x-1/2 flex-col-reverse",
    "top-right": "top-0 right-0 flex-col-reverse",
    "bottom-left": "bottom-0 left-0 flex-col",
    "bottom-center": "bottom-0 left-1/2 -translate-x-1/2 flex-col",
    "bottom-right": "bottom-0 right-0 flex-col",
  };

  return (
    <div
      className={cn(
        "fixed z-50 flex max-h-screen w-full flex-col p-4 sm:max-w-[420px]",
        positions[position],
        className
      )}
    >
      <div className="flex flex-col gap-3">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            onDismiss={dismiss}
            className={cn(
              "animate-in fade-in duration-300",
              position.includes("top") ? "slide-in-from-top-full" : "slide-in-from-bottom-full"
            )}
          />
        ))}
      </div>
    </div>
  );
}
