import React from "react";

interface DialogBoxProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isLoading?: boolean;
}

export default function DialogBox({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  isLoading = false,
}: DialogBoxProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  flex items-center justify-center z-99999">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-sm rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
