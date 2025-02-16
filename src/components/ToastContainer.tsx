import { Toast } from "./Toast";
import "../index.css"
import { ComponentType } from "react";
import { CardToastType } from "../context/ToastContext";
interface ToastContainerProps {
  toasts: any[];
  dismissToast: (id: number) => void;
  card?: ComponentType<CardToastType>;
}

export function ToastContainer({ toasts, dismissToast, card: Card }: ToastContainerProps) {
  const positions = ["top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right"];

  return (
    <>
      {positions.map((pos) => (
        <div key={pos} className={`toast-container ${pos}`}>
          {toasts
            .filter((t) => t.position === pos)
            .map((toast) =>
              Card ? (
                <Card key={toast.id} {...toast} dismiss={() => dismissToast(toast.id)} />
              ) : (
                <Toast key={toast.id} {...toast} dismiss={() => dismissToast(toast.id)} />
              )
            )}
        </div>
      ))}
    </>
  )
}

