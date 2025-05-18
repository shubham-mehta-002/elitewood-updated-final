import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const Dialog = ({ open, onOpenChange, children }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onOpenChange(false);
      }
    };
    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg mx-4">
        {children}
      </div>
    </div>,
    document.body
  );
};

const DialogContent = ({ className = "", children }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const DialogHeader = ({ className = "", children }) => (
  <div className={`mb-4 ${className}`}>{children}</div>
);

const DialogTitle = ({ className = "", children }) => (
  <h2 className={`text-xl font-semibold ${className}`}>{children}</h2>
);

const DialogFooter = ({ className = "", children }) => (
  <div className={`mt-6 flex justify-end gap-2 ${className}`}>{children}</div>
);

export {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
};
