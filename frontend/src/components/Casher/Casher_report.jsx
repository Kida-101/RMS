import React, { useState, useEffect } from 'react';

function Casher_report() {
  const [filter, setFilter] = useState('Daily'); // Default filter
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]); // Default to today
  const [customRange, setCustomRange] = useState({ start: '', end: '' }); // Custom date range
  const [dailyData, setDailyData] = useState([]); // Data for the selected daily date
  const [customData, setCustomData] = useState([]); // Data for the custom date range

  // Example data for monthly and yearly reports
  const monthlyData = [
    { day: 'Day 1', total: 1200, online: 500, onsite: 400, thirdParty: 300 },
    { day: 'Day 2', total: 1500, online: 600, onsite: 500, thirdParty: 400 },
    { day: 'Day 3', total: 1000, online: 400, onsite: 300, thirdParty: 300 },
  ];

  const yearlyData = [
    { month: 'January', total: 36000, online: 15000, onsite: 12000, thirdParty: 9000 },
    { month: 'February', total: 30000, online: 12000, onsite: 10000, thirdParty: 8000 },
    { month: 'March', total: 40000, online: 18000, onsite: 14000, thirdParty: 8000 },
  ];

  // Simulate fetching daily data (replace with backend API call in the future)
  const fetchDailyData = () => {
    const exampleDailyData = [
      { id: 'P001', type: 'Online Payment', time: '10:30 AM', total: 500 },
      { id: 'P002', type: 'Onsite Payment', time: '11:15 AM', total: 400 },
      { id: 'P003', type: '3rd Party Payment (Delivery Co. A)', time: '01:45 PM', total: 300 },
    ];
    setDailyData(exampleDailyData);
  };

  // Simulate fetching custom data (replace with backend API call in the future)
  const fetchCustomData = () => {
    const exampleCustomData = [
      { date: '2025-03-01', total: 2000, online: 800, onsite: 700, thirdParty: 500 },
      { date: '2025-03-02', total: 2500, online: 1000, onsite: 900, thirdParty: 600 },
    ];
    setCustomData(exampleCustomData);
  };

  useEffect(() => {
    if (filter === 'Daily') {
      fetchDailyData();
    }
  }, [filter]);

  const calculateTotal = (data) =>
    data.reduce(
      (totals, item) => ({
        total: totals.total + item.total,
        online: totals.online + (item.online || 0),
        onsite: totals.onsite + (item.onsite || 0),
        thirdParty: totals.thirdParty + (item.thirdParty || 0),
      }),
      { total: 0, online: 0, onsite: 0, thirdParty: 0 }
    );

  const renderTable = () => {
    let data = [];
    if (filter === 'Daily') {
      data = dailyData;
    } else if (filter === 'Monthly') {
      data = monthlyData;
    } else if (filter === 'Yearly') {
      data = yearlyData;
    } else if (filter === 'Customizable') {
      data = customData;
    }

    const totals = calculateTotal(data);

    return (
      <div className="overflow-x-auto bg-gray-100 p-4 rounded-xl shadow-xl">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-white">
              {filter === 'Daily' && <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-semibold">Payment ID</th>}
              {filter === 'Daily' && <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-semibold">Type</th>}
              {filter === 'Daily' && <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-semibold">Time</th>}
              {filter !== 'Daily' && filter === 'Monthly' && (
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-semibold">Day</th>
              )}
              {filter !== 'Daily' && filter === 'Yearly' && (
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-semibold">Month</th>
              )}
              {filter !== 'Daily' && filter === 'Customizable' && (
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-semibold">Date</th>
              )}
              <th className="border border-gray-300 px-4 py-2 text-right text-gray-700 font-semibold">Total Payment ($)</th>
              {filter !== 'Daily' && (
                <>
                  <th className="border border-gray-300 px-4 py-2 text-right text-gray-700 font-semibold">Online Payment ($)</th>
                  <th className="border border-gray-300 px-4 py-2 text-right text-gray-700 font-semibold">Onsite Payment ($)</th>
                  <th className="border border-gray-300 px-4 py-2 text-right text-gray-700 font-semibold">3rd Party Payment ($)</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                {filter === 'Daily' && <td className="border border-gray-300 px-4 py-2 text-gray-700">{item.id}</td>}
                {filter === 'Daily' && <td className="border border-gray-300 px-4 py-2 text-gray-700">{item.type}</td>}
                {filter === 'Daily' && <td className="border border-gray-300 px-4 py-2 text-gray-700">{item.time}</td>}
                {filter !== 'Daily' && filter === 'Monthly' && (
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">{item.day}</td>
                )}
                {filter !== 'Daily' && filter === 'Yearly' && (
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">{item.month}</td>
                )}
                {filter !== 'Daily' && filter === 'Customizable' && (
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">{item.date}</td>
                )}
                <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">${item.total.toLocaleString()}</td>
                {filter !== 'Daily' && (
                  <>
                    <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">${item.online.toLocaleString()}</td>
                    <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">${item.onsite.toLocaleString()}</td>
                    <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">${item.thirdParty.toLocaleString()}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-100">
              <td
                className="border border-gray-300 px-4 py-2 font-semibold text-gray-700"
                colSpan={filter === 'Daily' ? 3 : 1}
              >
                Grand Total
              </td>
              <td className="border border-gray-300 px-4 py-2 text-right font-bold text-gray-800">
                ${totals.total.toLocaleString()}
              </td>
              {filter !== 'Daily' && (
                <>
                  <td className="border border-gray-300 px-4 py-2 text-right font-bold text-gray-800">
                    ${totals.online.toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right font-bold text-gray-800">
                    ${totals.onsite.toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right font-bold text-gray-800">
                    ${totals.thirdParty.toLocaleString()}
                  </td>
                </>
              )}
            </tr>
          </tfoot>
        </table>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Payment Report</h1>

      {/* Filter Section */}
      <div className="flex justify-end items-center mb-6">
        <label htmlFor="filter" className="text-lg font-semibold text-gray-700 mr-4">
          Select Report Type:
        </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 rounded border-gray-300 shadow-sm"
        >
          <option value="Daily">Daily</option>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
          <option value="Customizable">Customizable</option>
        </select>
      </div>

      {/* Daily Filter */}
      {filter === 'Daily' && (
        <div className="mb-6">
          <label htmlFor="dailyDate" className="block text-lg font-semibold text-gray-700 mb-2">
            Select Date:
          </label>
          <div className="flex gap-4">
            <input
              type="date"
              id="dailyDate"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="p-2 rounded border-gray-300 shadow-sm"
            />
            <button
              onClick={fetchDailyData}
              className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
            >
              Fetch Data
            </button>
          </div>
        </div>
      )}

      {/* Custom Date Range Picker */}
      {filter === 'Customizable' && (
        <div className="mb-6">
          <label htmlFor="startDate" className="block text-lg font-semibold text-gray-700 mb-2">
            Select Date Range:
          </label>
          <div className="flex gap-4">
            <input
              type="date"
              id="startDate"
              value={customRange.start}
              onChange={(e) => setCustomRange({ ...customRange, start: e.target.value })}
              className="p-2 rounded border-gray-300 shadow-sm"
            />
            <input
              type="date"
              id="endDate"
              value={customRange.end}
              onChange={(e) => setCustomRange({ ...customRange, end: e.target.value })}
              className="p-2 rounded border-gray-300 shadow-sm"
            />
            <button
              onClick={fetchCustomData}
              className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
            >
              Fetch Data
            </button>
          </div>
        </div>
      )}

      {/* Render Table */}
      {renderTable()}
    </div>
  );
}

export default Casher_report;