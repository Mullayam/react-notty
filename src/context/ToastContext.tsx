import { createContext, useState, ReactNode,  ComponentType } from "react";
import { ToastContainer } from "../components/ToastContainer";
interface ToastType {
  id: number;
  title?: string;
  description?: string;
  icon?: ReactNode;
  position?: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
  duration?: number;
  action?: () => void;
}
export type CardToastType = Omit<ToastType, "id"> & { dismiss: () => void };
type PromiseConfigType = { loading: string; success: string; error: string };
interface ToastContextType {
  showToast: (toast: Omit<ToastType, "id">) => void;
  showPromiseToast: <T>(promise: Promise<T>, config: PromiseConfigType) => Promise<T>;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children, card }: { children: ReactNode, card?: ComponentType<CardToastType> }) {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const showToast = (toast: Omit<ToastType, "id">) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, ...toast, position: toast.position || "bottom-center" }]);
    setTimeout(() => dismissToast(id), toast.duration || 2000);
  };

  const showPromiseToast = async <T,>(promise: Promise<T>, config: PromiseConfigType): Promise<T> => {
    showToast({ title: "Loading", description: config.loading });
    try {
      const result = await promise;
      showToast({ title: "Success", description: config.success });
      return result;
    } catch (error) {
      showToast({ title: "Error", description: config.error });
      throw error;
    }
  };

  const dismissToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast, showPromiseToast }}>
      {children}
      <ToastContainer toasts={toasts} dismissToast={dismissToast} card={card} />
    </ToastContext.Provider>
  );
}
