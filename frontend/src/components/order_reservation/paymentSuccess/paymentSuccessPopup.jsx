import React, { useState } from "react";
import { motion } from "framer-motion";

const PaymentSuccessPopup = ({ isOpen, onClose, order }) => {
  if (!isOpen) return null;
  const [showPopup, setShowPopup] = useState();

  const orderDetails = {
    tableNumber: 5,
    date: "March 25, 2025",
    startTime: "7:00 PM",
    endTime: "9:00 PM",
    items: [
      { name: "Pizza", quantity: 2 },
      { name: "Pasta", quantity: 1 },
    ],
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div className="items-center text-center justify-center bg-gray-200/40 text-white p-6 align-center rounded-lg shadow-lg w-86">
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center w-[110px] h-[110px] rounded-full bg-green-600 text-white text-[46px] mb-4">
            <i className="fa-solid fa-check"></i>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-2">
          Payment Successful!
        </h2>
        <p className="text-center text-sm mb-4">
          Your order has been confirmed.
        </p>

        <div className="bg-gray-400/40 p-3 rounded-md shadow">
          <p>
            <strong>Table:</strong>
            {order.tableNumber}
          </p>
          <p>
            <strong>Date:</strong>
            {order.date}
          </p>
          <p>
            <strong>Time:</strong>
            {order.startTime} - {order.endTime}
          </p>
          <p>
            <strong>Ordered Items:</strong>
          </p>
          <ul className="list-disc list-inside text-sm">
            {order.items.map((item, index) => (
              <li key={index}>
                {item.name} × {item.quantity}
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={onClose}
          isOpen={showPopup}
          onClose={() => setShowPopup(false)}
          order={orderDetails}
          className="mt-4 w-full bg-white text-green-600 py-2 rounded-lg font-bold hover:bg-green-200"
        >
          Close
        </button>
      </div>
    </motion.div>
  );
};

export default PaymentSuccessPopup;
