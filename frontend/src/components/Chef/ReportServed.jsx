import React from "react";
import { FaCheck, FaFire } from "react-icons/fa";

const ReportServed = ({ orders, onMarkAsServed }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <FaFire className="text-orange-500 text-2xl mr-3" />
        <h1 className="text-2xl font-bold text-gray-800">Orders in Progress</h1>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-lg shadow">
          <p className="text-gray-500 text-lg">No orders being cooked</p>
          <p className="text-gray-400 mt-2">All caught up!</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-orange-100"
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div className="bg-orange-100 text-orange-800 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                      <span className="font-bold">{order.tableNumber}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">
                        Table {order.tableNumber}
                      </h3>
                      <div className="text-sm text-gray-500">
                        Started: {order.startedCooking}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => onMarkAsServed(order.id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                  >
                    <FaCheck className="mr-2" />
                    Mark as Served
                  </button>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-700 mb-3">
                    Cooking Now:
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {order.items.map((item, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center bg-orange-50 p-1 rounded-lg border border-orange-100"
                      >
                        <span className="font-medium">{item.name}</span>
                        <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm">
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

export default ReportServed;
