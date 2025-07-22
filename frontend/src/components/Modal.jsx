import React from "react";

const Modal = ({ isVisible, title, onClose, children, footer }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-opacity-10 backdrop-blur flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {title || "Modal Title"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-2xl"
          >
            &times;
          </button>
        </div>

        <div className="mb-6">{children}</div>

        {footer && <div className="flex justify-end space-x-3">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
