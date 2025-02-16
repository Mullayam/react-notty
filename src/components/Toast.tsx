import { X } from "lucide-react";

export function Toast({ id, title, description, icon, dismiss }: any) {
  return (
    <div className="toast">
      {icon}
      <div className="toast-content">
        <p className="toast-title">{title}</p>
        <p className="toast-description">{description}</p>
      </div>
      <button onClick={dismiss} className="toast-close">
        <X size={16} />
      </button>
    </div>
  );
}
