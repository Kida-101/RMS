import React, { useState } from "react";
import ConfirmationPopup from "./ConfirmationPopup";

const TrackStock = ({ stockData, onReorder, onDispose }) => {
  const [updateIndex, setUpdateIndex] = useState();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const criticalStocks = stockData.filter(
    (item) => item.status === "low" || item.status === "expired"
  );
  const handleResponse = (itemId) => {
    setUpdateIndex(itemId);
    setShowConfirmation(true);
  };
  const handleCancelPopup = () => {
    setShowConfirmation(false);
  };
  const handleConfirmUpdate = () => {
    onDispose(updateIndex);

    setShowConfirmation(false);
  };
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Track Critical Stocks
      </h2>

      {criticalStocks.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No critical stocks to display</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Material
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expiry Date
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {criticalStocks.map((stock) => (
                <tr key={stock.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-600">
                    {stock.material}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                    {stock.category}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                    {stock.quantity} {stock.unit}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${
                          stock.status === "expired"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                    >
                      {stock.status === "expired" ? "Expired" : "Low Stock"}
                    </span>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                    {stock.expiryDate}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm font-medium">
                    {stock.status === "expired" ? (
                      <button
                        onClick={() => handleResponse(stock.id)}
                        className="text-red-600 hover:text-red-900 bg-red-50 px-3 py-1 rounded-md"
                      >
                        Dispose
                      </button>
                    ) : (
                      <button
                        className="text-blue-600 hover:text-blue-900 bg-blue-50 px-3 py-1 rounded-md cursor-pointer"
                        onClick={() => onReorder(stock)}
                      >
                        Reorder
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showConfirmation && (
        <ConfirmationPopup
          message={`Are you sure you dispose this expired stock from store?`}
          onConfirm={handleConfirmUpdate}
          onCancel={handleCancelPopup}
        />
      )}
    </div>
  );
};

export default TrackStock;
