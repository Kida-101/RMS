import React from "react";

const ReportAnalysis = () => {
  return (
    <div className="p-4 ">
      <h2 className="text-lg font-semibold mb-4">Report and Analysis</h2>
      <div className="space-y-4">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">Monthly Sales</h3>
          <p className="text-2xl font-semibold">$12,345</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">Stock Usage</h3>
          <p className="text-2xl font-semibold">78%</p>
        </div>
      </div>
    </div>
  );
};

export default ReportAnalysis;
