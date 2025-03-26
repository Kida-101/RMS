import React, { useState, useEffect } from "react";
import axios from "axios";

const Reports = () => {
  const [reportType, setReportType] = useState("daily");
  const [reports, setReports] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchReports(reportType);
  }, [reportType]);

  const fetchReports = async (type) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/reports?type=${type}`);
      setReports(response.data);
    } catch (err) {
      setError("Failed to load reports");
    }
  };

  return (
    <section className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Reports & Analysis</h2>

      <div className="flex gap-4 mb-4">
        <button onClick={() => setReportType("daily")} className="bg-blue-500 text-white px-4 py-2 rounded">Daily Report</button>
        <button onClick={() => setReportType("weekly")} className="bg-blue-500 text-white px-4 py-2 rounded">Weekly Report</button>
        <button onClick={() => setReportType("monthly")} className="bg-blue-500 text-white px-4 py-2 rounded">Monthly Report</button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {reports ? (
        <div className="text-lg">
          <p>Sales: {reports.sales}</p>
          <p>Orders: {reports.orders}</p>
          <p>Revenue: ${reports.revenue}</p>
        </div>
      ) : (
        <p>Loading reports...</p>
      )}
    </section>
  );
};

export default Reports;
