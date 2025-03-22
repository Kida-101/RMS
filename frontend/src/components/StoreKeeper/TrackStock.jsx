import React from "react";

const TrackStock = () => {
  return (
    <div className="p-4 ">
      <h2 className="text-lg font-semibold mb-4">
        Track Low and Expired Stocks
      </h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span>Material A - Low Stock</span>
          <button className="bg-red-500 text-white px-4 py-2 rounded-md">
            Reorder
          </button>
        </div>
        <div className="flex justify-between items-center">
          <span>Material B - Expired</span>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded-md">
            Dispose
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackStock;
