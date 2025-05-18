
// Copied from src/hooks/use-toast.tsx
import { useEffect, useState } from "react";

const TOAST_LIMIT = 3;
const TOAST_REMOVE_DELAY = 1000000;

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
}

const toastTimeouts = new Map();

export const toasts = [];

const addToast = (toast) => {
  toasts.push({ ...toast, id: genId() });
  return toast;
};

const dismissToast = (toastId) => {
  let index = toasts.findIndex((toast) => toast.id === toastId);
  if (index !== -1) {
    toasts.splice(index, 1);
  }
};

export function useToast() {
  const [state, setState] = useState([]);

  useEffect(() => {
    return () => {
      toastTimeouts.forEach((timeout) => {
        clearTimeout(timeout);
      });
      toastTimeouts.clear();
    };
  }, []);

  const toast = (props) => {
    const id = genId();
    const newToast = {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) {
          dismissToast(id);
        }
      },
    };

    setState((prevToasts) => {
      const nextToasts = [...prevToasts, newToast];
      if (nextToasts.length > TOAST_LIMIT) {
        nextToasts.shift();
      }
      return nextToasts;
    });

    return newToast;
  };

  return {
    toast,
    toasts: state,
    dismissToast: (toastId) => {
      setState((prevToasts) =>
        prevToasts.map((toast) =>
          toast.id === toastId
            ? { ...toast, open: false }
            : toast
        )
      );

      if (toastTimeouts.has(toastId)) {
        clearTimeout(toastTimeouts.get(toastId));
      }

      toastTimeouts.set(
        toastId,
        setTimeout(() => {
          setState((prevToasts) => prevToasts.filter((toast) => toast.id !== toastId));
          toastTimeouts.delete(toastId);
        }, TOAST_REMOVE_DELAY)
      );
    },
  };
}

export function toast(props) {
  return addToast(props);
}
