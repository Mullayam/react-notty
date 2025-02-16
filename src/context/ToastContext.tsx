import { createContext, useState, ReactNode } from "react";
import { Toast } from "../components/Toast";
import { ToastContainer } from "../components/ToastContainer";
interface Toast {
  id: number;
  title?: string;
  description?: string|ReactNode;
  icon?: ReactNode;
  position?: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
  duration?: number;
  action?: () => void;
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, "id">) => void;
  showPromiseToast: <T>(promise: Promise<T>, config: { loading: ReactNode; success: ReactNode; error: ReactNode }) => Promise<T>;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (toast: Omit<Toast, "id">) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, ...toast, position: toast.position || "bottom-center" }]);
    setTimeout(() => dismissToast(id), toast.duration||2000);
  };

  const showPromiseToast = async <T,>(promise: Promise<T>, config: { loading: ReactNode; success: ReactNode; error: ReactNode }): Promise<T> => {
    const id = Date.now();
    showToast({ id, title: "Loading", description: config.loading });

    try {
      const result = await promise;
      showToast({ id, title: "Success", description: config.success });
      return result;
    } catch (error) {
      showToast({ id, title: "Error", description: config.error });
      throw error;
    }
  };

  const dismissToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast, showPromiseToast }}>
      {children}
      <ToastContainer toasts={toasts} dismissToast={dismissToast} />
    </ToastContext.Provider>
  );
}
