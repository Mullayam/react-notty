import { X } from "lucide-react";

export function Toast({ title, description, icon, dismiss }: any) {
  return (
    <div className="toast">
      {icon && icon}
      
      <div className="toast-content">
        {title && <h3 className="toast-title">{title}</h3>}
        {description && <h3 className="toast-description">{description}</h3>}       
      </div>
      <button onClick={dismiss} className="toast-close">
        <X size={16} />
      </button>
    </div>
  );
}
