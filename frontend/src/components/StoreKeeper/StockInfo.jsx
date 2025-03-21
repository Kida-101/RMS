import React from "react";

const StockInfo = () => {
  return (
    <div className="p-4 ">
      <h2 className="text-lg font-semibold mb-4">Track Overall Stock Number</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">Total Stock</h3>
          <p className="text-2xl font-semibold">1,234</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">Available Stock</h3>
          <p className="text-2xl font-semibold">1,000</p>
        </div>
      </div>
    </div>
  );
};

export default StockInfo;
