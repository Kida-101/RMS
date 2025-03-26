import React from "react";
import { FaUtensils, FaClock } from "react-icons/fa";

const ReceiveAssigned = ({ orders, onStartCooking }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <FaUtensils className="text-blue-600 text-2xl mr-3" />
        <h1 className="text-2xl font-bold text-gray-800">New Orders</h1>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-lg shadow">
          <p className="text-gray-500 text-lg">No new orders waiting</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div className="bg-blue-100 text-blue-800 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                      <span className="font-bold">{order.tableNumber}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">
                        Table {order.tableNumber}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <FaClock className="mr-1" />
                        <span>{order.assignedTime}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => onStartCooking(order.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Start Cooking
                  </button>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-700 mb-3">
                    Order Items:
                  </h4>
                  <ul className="space-y-2">
                    {order.items.map((item, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center bg-gray-50 p-1 rounded-lg"
                      >
                        <span className="font-medium">{item.name}</span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                          {item.quantity}x
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReceiveAssigned;
