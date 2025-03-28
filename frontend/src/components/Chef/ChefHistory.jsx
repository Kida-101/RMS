import React, { useState } from "react";
import { FaFilter, FaCalendarAlt, FaUtensils, FaSearch } from "react-icons/fa";

const ChefHistory = ({ orders }) => {
  const [timeFilter, setTimeFilter] = useState("daily");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.servedTime);
    const now = new Date();

    // Time filter logic
    let timeMatch = false;
    switch (timeFilter) {
      case "daily":
        timeMatch =
          orderDate.getDate() === selectedDate.getDate() &&
          orderDate.getMonth() === selectedDate.getMonth() &&
          orderDate.getFullYear() === selectedDate.getFullYear();
        break;
      case "monthly":
        timeMatch =
          orderDate.getMonth() === selectedDate.getMonth() &&
          orderDate.getFullYear() === selectedDate.getFullYear();
        break;
      case "yearly":
        timeMatch = orderDate.getFullYear() === selectedDate.getFullYear();
        break;
      default:
        timeMatch = true;
    }

    const searchMatch =
      order.tableNumber.toString().includes(searchTerm) ||
      order.items.some((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return timeMatch && searchMatch;
  });

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <FaUtensils className="mr-2 text-orange-500" />
          Order History
        </h1>

        <div className="flex flex-col gap-4 mt-4 md:mt-0">
          <div className="flex items-center bg-gray-100 rounded-lg p-2">
            <FaSearch className="mr-2 text-gray-500" />
            <input
              type="text"
              placeholder="Search table or item..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent outline-none w-full"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center bg-gray-100 rounded-lg p-2">
              <FaFilter className="mr-2 text-gray-500" />
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="bg-transparent outline-none"
              >
                <option value="daily">Daily</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="all">All Time</option>
              </select>
            </div>

            {timeFilter !== "all" && (
              <div className="flex items-center bg-gray-100 rounded-lg p-2">
                <FaCalendarAlt className="mr-2 text-gray-500" />
                <input
                  type="date"
                  value={selectedDate.toISOString().split("T")[0]}
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  className="bg-transparent outline-none"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No orders found for selected filters</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                <div>
                  <h3 className="font-bold text-lg">
                    Table {order.tableNumber}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Prepared by:{" "}
                    <span className="font-medium">{order.chef}</span>
                  </p>
                </div>
                <p className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  {formatDate(order.servedTime)}
                </p>
              </div>

              <div className="mt-3 pt-3 border-t">
                <h4 className="font-medium mb-2">Items Prepared:</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {order.items.map((item, index) => (
                    <li
                      key={index}
                      className="bg-gray-50 p-1 rounded flex justify-between items-center"
                    >
                      <span className="font-medium">{item.name}</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                        x{item.quantity}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChefHistory;
