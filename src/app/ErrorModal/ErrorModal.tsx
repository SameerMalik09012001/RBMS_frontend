"use client";

import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const ErrorModal = ({
  message,
  onClose,
}: {
  message: string;
}) => {
  // Automatically close the modal after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose({status: false, msg: ''});
    }, 2000);

    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-start justify-end p-4 pointer-events-none">
      <div className="bg-red-500 text-white p-4 rounded-lg shadow-lg relative max-w-sm w-full pointer-events-auto">
        <button
          className="absolute top-2 right-2 text-white text-xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>
        <p className="text-lg">{message}</p>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default ErrorModal;
