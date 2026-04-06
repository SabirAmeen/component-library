import * as React from "react";

export type ToastVariant = "default" | "success" | "error" | "info" | "warning";

export interface ToastData {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  open?: boolean;
}

type ActionType = "ADD_TOAST" | "UPDATE_TOAST" | "REMOVE_TOAST" | "DISMISS_TOAST";

interface Action {
  type: ActionType;
  toast?: ToastData;
  id?: string;
}

interface State {
  toasts: ToastData[];
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const addToRemoveQueue = (id: string, duration: number) => {
  if (toastTimeouts.has(id)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(id);
    dispatch({
      type: "REMOVE_TOAST",
      id,
    });
  }, duration);

  toastTimeouts.set(id, timeout);
};

const listeners: Array<(state: State) => void> = [];
let memoryState: State = { toasts: [] };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast!, ...state.toasts].slice(0, 5),
      };

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast!.id ? { ...t, ...action.toast } : t
        ),
      };

    case "DISMISS_TOAST": {
      const { id } = action;

      if (id) {
        addToRemoveQueue(id, 300); // Wait for exit animation
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id, 300);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === id || id === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      };
    }
    case "REMOVE_TOAST":
      if (action.id === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.id),
      };
  }
}

export function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, []);

  return {
    ...state,
    toast,
    dismiss: (id?: string) => dispatch({ type: "DISMISS_TOAST", id }),
  };
}

function toast({ ...props }: Omit<ToastData, "id">) {
  const id = Math.random().toString(36).substring(2, 9);

  const update = (props: ToastData) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", id });

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
    },
  });

  const duration = props.duration || 3000;
  if (duration !== Infinity) {
    setTimeout(() => {
        dismiss();
    }, duration);
  }

  return {
    id,
    dismiss,
    update,
  };
}

export { toast };
