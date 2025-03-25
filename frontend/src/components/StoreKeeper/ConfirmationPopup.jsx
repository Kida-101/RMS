import React from "react";

const ConfirmationPopup = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2">
      <div className="bg-white p-8 rounded-lg w-full max-w-md shadow-2xl">
        <h2 className="text-xl font-bold mb-2 text-gray-800">Confirm Action</h2>
        <p className="text-[17px] text-gray-700 mb-1 p-5">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-[#3447AA] text-white rounded-lg hover:bg-[#414a76] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
