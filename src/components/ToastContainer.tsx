import { Toast } from "./Toast";
import "../index.css"

export function ToastContainer({ toasts, dismissToast }: { toasts: any[]; dismissToast: (id: number) => void }) {
  const positions = ["top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right"];

  return (
    <>
      {positions.map((pos) => (
        <div key={pos} className={`toast-container ${pos}`}>
          {toasts.filter((t) => t.position === pos).map((toast) => (
            <Toast key={toast.id} {...toast} dismiss={() => dismissToast(toast.id)} />
          ))}
        </div>
      ))}
    </>
  );
}

function getPositionStyles(position: string) {
  switch (position) {
    case "top-left":
      return "top-4 left-4";
    case "top-center":
      return "top-4 left-1/2 -translate-x-1/2";
    case "top-right":
      return "top-4 right-4";
    case "bottom-left":
      return "bottom-4 left-4";
    case "bottom-center":
      return "bottom-4 left-1/2 -translate-x-1/2";
    case "bottom-right":
      return "bottom-4 right-4";
    default:
      return "bottom-4 left-1/2 -translate-x-1/2";
  }
}
