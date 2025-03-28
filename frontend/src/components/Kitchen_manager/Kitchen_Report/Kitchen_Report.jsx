import React, { useState, useEffect } from 'react';

function OrderReport({ view, selectedDate, fetchDailyData }) {
    return (
        <div className="overflow-x-auto bg-gray-100 p-4 rounded-xl shadow-xl mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Report</h3>
            {view === 'daily' && (
                <div className="mb-4 flex gap-4 items-center">
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => fetchDailyData(e.target.value)}
                        className="p-2 border border-gray-300 rounded-md shadow-sm"
                    />
                    <button
                        onClick={() => fetchDailyData(selectedDate)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
                    >
                        Fetch Data
                    </button>
                </div>
            )}
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-white">
                        {view === 'daily' ? (
                            <>
                                <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-semibold">Order ID</th>
                                <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-semibold">Order Items</th>
                                <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-semibold">Order From</th>
                                <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-semibold">Time</th>
                            </>
                        ) : view === 'monthly' || view === 'custom' ? (
                            <>
                                <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-semibold">Date</th> {/* Updated */}
                                <th className="border border-gray-300 px-4 py-2 text-right text-gray-700 font-semibold">Total Orders</th>
                                <th className="border border-gray-300 px-4 py-2 text-right text-gray-700 font-semibold">Online Orders</th>
                                <th className="border border-gray-300 px-4 py-2 text-right text-gray-700 font-semibold">Onsite Orders</th>
                                <th className="border border-gray-300 px-4 py-2 text-right text-gray-700 font-semibold">Third-Party Orders</th>
                            </>
                        ) : (
                            <>
                                <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-semibold">Month</th>
                                <th className="border border-gray-300 px-4 py-2 text-right text-gray-700 font-semibold">Total Orders</th>
                                <th className="border border-gray-300 px-4 py-2 text-right text-gray-700 font-semibold">Online Orders</th>
                                <th className="border border-gray-300 px-4 py-2 text-right text-gray-700 font-semibold">Onsite Orders</th>
                                <th className="border border-gray-300 px-4 py-2 text-right text-gray-700 font-semibold">Third-Party Orders</th>
                            </>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {view === 'daily' ? (
                        <>
                            <tr className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2 text-gray-700">#12345</td>
                                <td className="border border-gray-300 px-4 py-2 text-gray-700">Burger, Fries</td>
                                <td className="border border-gray-300 px-4 py-2 text-gray-700">Online</td>
                                <td className="border border-gray-300 px-4 py-2 text-gray-700">10:30 AM</td>
                            </tr>
                        </>
                    ) : view === 'monthly' || view === 'custom' ? (
                        <>
                            <tr className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2 text-gray-700">2025-03-01</td> {/* Example Date */}
                                <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">50</td>
                                <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">20</td>
                                <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">15</td>
                                <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">15</td>
                            </tr>
                        </>
                    ) : (
                        <>
                            <tr className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2 text-gray-700">January</td>
                                <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">1500</td>
                                <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">600</td>
                                <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">500</td>
                                <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">400</td>
                            </tr>
                        </>
                    )}
                </tbody>
            </table>
        </div>
    );
}

function StockReport({ view, selectedDate, fetchDailyData }) {
    return (
        <div className="overflow-x-auto bg-gray-100 p-4 rounded-xl shadow-xl mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Stock Report</h3>
            {view === 'daily' && (
                <div className="mb-4 flex gap-4 items-center">
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => fetchDailyData(e.target.value)}
                        className="p-2 border border-gray-300 rounded-md shadow-sm"
                    />
                    <button
                        onClick={() => fetchDailyData(selectedDate)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
                    >
                        Fetch Data
                    </button>
                </div>
            )}
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-white">
                        {view === 'daily' ? (
                            <>
                                <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-semibold">Request ID</th>
                                <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-semibold">Items</th>
                                <th className="border border-gray-300 px-4 py-2 text-right text-gray-700 font-semibold">Quantity</th>
                                <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-semibold">Time</th>
                            </>
                        ) : view === 'monthly' || view === 'custom' ? (
                            <>
                                <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-semibold">Date</th> {/* Updated */}
                                <th className="border border-gray-300 px-4 py-2 text-right text-gray-700 font-semibold">Total Items</th>
                            </>
                        ) : (
                            <>
                                <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-semibold">Month</th>
                                <th className="border border-gray-300 px-4 py-2 text-right text-gray-700 font-semibold">Total Items</th>
                            </>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {view === 'daily' ? (
                        <>
                            <tr className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2 text-gray-700">#REQ001</td>
                                <td className="border border-gray-300 px-4 py-2 text-gray-700">Tomatoes, Lettuce</td>
                                <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">30</td>
                                <td className="border border-gray-300 px-4 py-2 text-gray-700">09:00 AM</td>
                            </tr>
                        </>
                    ) : view === 'monthly' || view === 'custom' ? (
                        <>
                            <tr className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2 text-gray-700">2025-03-01</td> {/* Example Date */}
                                <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">300</td>
                            </tr>
                        </>
                    ) : (
                        <>
                            <tr className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2 text-gray-700">January</td>
                                <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">12000</td>
                            </tr>
                        </>
                    )}
                </tbody>
            </table>
        </div>
    );
}

function Kitchen_Report() {
    const [view, setView] = useState('daily');
    const [reportType, setReportType] = useState('order');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]); // Default to today

    const fetchDailyData = (date) => {
        setSelectedDate(date || selectedDate);
        console.log(`Fetching data for ${date || selectedDate}`);
        // Simulate fetching data for the selected date
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Kitchen Report</h2>

            {/* Report Type Buttons */}
            <div className="flex flex-wrap gap-4 mb-6">
                {['order', 'stock'].map((type) => (
                    <button
                        key={type}
                        className={`px-4 py-2 rounded-md font-semibold transition-all ${
                            reportType === type
                                ? 'bg-blue-500 text-white shadow-md'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                        onClick={() => setReportType(type)}
                    >
                        {type === 'order' ? 'Order Report' : 'Stock Report'}
                    </button>
                ))}
            </div>

            {/* View Buttons */}
            <div className="flex flex-wrap gap-4 mb-6">
                {['daily', 'monthly', 'yearly', 'custom'].map((type) => (
                    <button
                        key={type}
                        className={`px-4 py-2 rounded-md font-semibold transition-all ${
                            view === type
                                ? 'bg-blue-500 text-white shadow-md'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                        onClick={() => setView(type)}
                    >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                ))}
            </div>

            {/* Custom Date Range */}
            {view === 'custom' && (
                <div className="flex flex-wrap gap-4 mb-6">
                    <input
                        type="date"
                        className="p-2 border border-gray-300 rounded-md shadow-sm"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <input
                        type="date"
                        className="p-2 border border-gray-300 rounded-md shadow-sm"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600">
                        Generate Report
                    </button>
                </div>
            )}

            {/* Render Report */}
            {reportType === 'order' ? (
                <OrderReport view={view} selectedDate={selectedDate} fetchDailyData={fetchDailyData} />
            ) : (
                <StockReport view={view} selectedDate={selectedDate} fetchDailyData={fetchDailyData} />
            )}
        </div>
    );
}

export default Kitchen_Report;
