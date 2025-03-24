import React from "react";

const RequestStock = () => {
  return (
    <div className="p-4 ">
      <h2 className="text-lg font-semibold mb-4">
        Request Stock Material from Suppliers
      </h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Material Name
          </label>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Request Stock
        </button>
      </form>
    </div>
  );
};

export default RequestStock;
