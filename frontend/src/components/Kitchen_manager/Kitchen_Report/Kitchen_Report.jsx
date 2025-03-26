import React, { useState } from 'react';

function OrderReport({ view }) {
    return (
        <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2">Order Report</h3>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        {view === 'daily' ? (
                            <>
                                <th className="border p-2">Order ID</th>
                                <th className="border p-2">Order Items</th>
                                <th className="border p-2">Order From</th>
                            </>
                        ) : (
                            <>
                                <th className="border p-2">{view === 'weekly' ? 'Date' : 'Date Range'}</th>
                                <th className="border p-2">Total Orders</th>
                                <th className="border p-2">Online Orders</th>
                                <th className="border p-2">Onsite Orders</th>
                                <th className="border p-2">Third-Party Orders</th>
                            </>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {/* Example Data */}
                    {view === 'daily' ? (
                        <>
                            <tr>
                                <td className="border p-2">#12345</td>
                                <td className="border p-2">Burger, Fries</td>
                                <td className="border p-2">Online</td>
                            </tr>
                        </>
                    ) : (
                        <>
                            <tr>
                                <td className="border p-2">01-07 March</td>
                                <td className="border p-2">420</td>
                                <td className="border p-2">210</td>
                                <td className="border p-2">150</td>
                                <td className="border p-2">60</td>
                            </tr>
                        </>
                    )}
                </tbody>
            </table>
        </div>
    );
}

function StockReport({ view }) {
    return (
        <div>
            <h3 className="text-xl font-semibold mb-2">Stock Received Report</h3>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        {view === 'daily' ? (
                            <>
                                <th className="border p-2">Request ID</th>
                                <th className="border p-2">Items Requested</th>
                                <th className="border p-2">Number of Items Requested</th>
                            </>
                        ) : (
                            <>
                                <th className="border p-2">{view === 'weekly' ? 'Date' : 'Date Range'}</th>
                                <th className="border p-2">Total Items Requested</th>
                            </>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {/* Example Data */}
                    {view === 'daily' ? (
                        <>
                            <tr>
                                <td className="border p-2">#REQ789</td>
                                <td className="border p-2">Tomatoes, Lettuce</td>
                                <td className="border p-2">30</td>
                            </tr>
                        </>
                    ) : (
                        <>
                            <tr>
                                <td className="border p-2">01-07 March</td>
                                <td className="border p-2">4200</td>
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

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Kitchen Report</h2>
            
            {/* Report Type Switch */}
            <div className="flex flex-wrap space-x-4 mb-4">
                {['order', 'stock'].map(type => (
                    <button
                        key={type}
                        className={`mt-2 w-full sm:w-auto p-2 rounded-md transition-all ${
                            reportType === type ? 'text-blue-600 border border-blue-600 bg-transparent' : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                        onClick={() => setReportType(type)}
                    >
                        {type === 'order' ? 'Order Report' : 'Stock Report'}
                    </button>
                ))}
            </div>

            {/* Report View Buttons */}
            <div className="flex flex-wrap space-x-4 mb-4">
                {['daily', 'weekly', 'monthly', 'custom'].map(type => (
                    <button
                        key={type}
                        className={`mt-2 w-full sm:w-auto p-2 rounded-md transition-all ${
                            view === type ? 'text-blue-600 border border-blue-600 bg-transparent' : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                        onClick={() => setView(type)}
                    >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                ))}
            </div>

            {/* Custom Report Date Filters */}
            {view === 'custom' && (
                <div className="mb-4 flex flex-wrap space-x-4">
                    <input
                        type="date"
                        className="border p-2 rounded-md w-full sm:w-auto"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <input
                        type="date"
                        className="border p-2 rounded-md w-full sm:w-auto"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                    <button className="mt-2 w-full sm:w-auto p-2 bg-blue-600 text-white rounded-md transition-all hover:bg-blue-700">
                        Generate Report
                    </button>
                </div>
            )}
            
            {/* Render Report Based on Selection */}
            {reportType === 'order' ? <OrderReport view={view} /> : <StockReport view={view} />}
        </div>
    );
}

export default Kitchen_Report;
