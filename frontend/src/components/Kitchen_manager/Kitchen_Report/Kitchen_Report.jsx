import React, { useState } from 'react';

function OrderReport({ view }) {
    return (
        <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2">Order Report</h3>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        {view === 'daily' && (
                            <>
                                <th className="border p-2">Order ID</th>
                                <th className="border p-2">Order Items</th>
                                <th className="border p-2">Order From</th>
                            </>
                        )}
                        {view !== 'daily' && (
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
                            <tr>
                                <td className="border p-2">#12346</td>
                                <td className="border p-2">Pizza, Soda</td>
                                <td className="border p-2">Onsite</td>
                            </tr>
                            <tr>
                                <td className="border p-2">#12347</td>
                                <td className="border p-2">Pasta, Garlic Bread</td>
                                <td className="border p-2">Third-Party App</td>
                            </tr>
                        </>
                    ) : view === 'weekly' ? (
                        <>
                            <tr>
                                <td className="border p-2">01 March</td>
                                <td className="border p-2">40</td>
                                <td className="border p-2">15</td>
                                <td className="border p-2">20</td>
                                <td className="border p-2">5</td>
                            </tr>
                            <tr>
                                <td className="border p-2">02 March</td>
                                <td className="border p-2">50</td>
                                <td className="border p-2">25</td>
                                <td className="border p-2">15</td>
                                <td className="border p-2">10</td>
                            </tr>
                            <tr>
                                <td className="border p-2">03 March</td>
                                <td className="border p-2">30</td>
                                <td className="border p-2">10</td>
                                <td className="border p-2">15</td>
                                <td className="border p-2">5</td>
                            </tr>
                            <tr>
                                <td className="border p-2">04 March</td>
                                <td className="border p-2">60</td>
                                <td className="border p-2">30</td>
                                <td className="border p-2">20</td>
                                <td className="border p-2">10</td>
                            </tr>
                            <tr>
                                <td className="border p-2">05 March</td>
                                <td className="border p-2">70</td>
                                <td className="border p-2">35</td>
                                <td className="border p-2">25</td>
                                <td className="border p-2">10</td>
                            </tr>
                            <tr>
                                <td className="border p-2">06 March</td>
                                <td className="border p-2">80</td>
                                <td className="border p-2">40</td>
                                <td className="border p-2">30</td>
                                <td className="border p-2">10</td>
                            </tr>
                            <tr>
                                <td className="border p-2">07 March</td>
                                <td className="border p-2">100</td>
                                <td className="border p-2">50</td>
                                <td className="border p-2">30</td>
                                <td className="border p-2">20</td>
                            </tr>
                            {/* Total Row */}
                            <tr className="bg-gray-200">
                                <td className="border p-2 font-bold">Total</td>
                                <td className="border p-2 font-bold">430</td>
                                <td className="border p-2 font-bold">205</td>
                                <td className="border p-2 font-bold">160</td>
                                <td className="border p-2 font-bold">65</td>
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
                            <tr>
                                <td className="border p-2">08-14 March</td>
                                <td className="border p-2">500</td>
                                <td className="border p-2">250</td>
                                <td className="border p-2">180</td>
                                <td className="border p-2">70</td>
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
                        {view === 'daily' && (
                            <>
                                <th className="border p-2">Request ID</th>
                                <th className="border p-2">Items Requested</th>
                                <th className="border p-2">Number of Items Requested</th>
                            </>
                        )}
                        {view !== 'daily' && (
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
                            <tr>
                                <td className="border p-2">#REQ790</td>
                                <td className="border p-2">Chicken, Cheese</td>
                                <td className="border p-2">45</td>
                            </tr>
                            {/* Total Row */}
                            <tr className="bg-gray-200">
                                <td className="border p-2 font-bold">Total</td>
                                <td className="border p-2"></td>
                                <td className="border p-2 font-bold">75</td>
                            </tr>
                        </>
                    ) : view === 'weekly' ? (
                        <>
                            <tr>
                                <td className="border p-2">01 March</td>
                                <td className="border p-2">300</td>
                            </tr>
                            <tr>
                                <td className="border p-2">02 March</td>
                                <td className="border p-2">450</td>
                            </tr>
                            <tr>
                                <td className="border p-2">03 March</td>
                                <td className="border p-2">400</td>
                            </tr>
                            <tr>
                                <td className="border p-2">04 March</td>
                                <td className="border p-2">500</td>
                            </tr>
                            <tr>
                                <td className="border p-2">05 March</td>
                                <td className="border p-2">600</td>
                            </tr>
                            <tr>
                                <td className="border p-2">06 March</td>
                                <td className="border p-2">550</td>
                            </tr>
                            <tr>
                                <td className="border p-2">07 March</td>
                                <td className="border p-2">700</td>
                            </tr>
                            {/* Total Row */}
                            <tr className="bg-gray-200">
                                <td className="border p-2 font-bold">Total</td>
                                <td className="border p-2 font-bold">4000</td>
                            </tr>
                        </>
                    ) : (
                        <>
                            <tr>
                                <td className="border p-2">01-07 March</td>
                                <td className="border p-2">4200</td>
                            </tr>
                            <tr>
                                <td className="border p-2">08-14 March</td>
                                <td className="border p-2">5000</td>
                            </tr>
                        </>
                    )}
                </tbody>
            </table>
        </div>
    );
}

function Kitchen_Report() {
    const [view, setView] = useState('daily'); // 'daily', 'weekly', 'monthly', 'custom'
    const [reportType, setReportType] = useState('order'); // 'order', 'stock'
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Kitchen Report</h2>
            
            {/* Report Type Switch */}
            <div className="flex flex-wrap space-x-4 mb-4">
                <button
                    className="mt-2 w-full sm:w-auto p-2 bg-blue-600 text-white rounded-md transition-all hover:bg-blue-700"
                    onClick={() => setReportType('order')}
                >
                    Order Report
                </button>
                <button
                    className="mt-2 w-full sm:w-auto p-2 bg-blue-600 text-white rounded-md transition-all hover:bg-blue-700"
                    onClick={() => setReportType('stock')}
                >
                    Stock Report
                </button>
            </div>

            {/* Report View Buttons */}
            <div className="flex flex-wrap space-x-4 mb-4">
                {['daily', 'weekly', 'monthly', 'custom'].map(type => (
                    <button
                        key={type}
                        className="mt-2 w-full sm:w-auto p-2 bg-blue-600 text-white rounded-md transition-all hover:bg-blue-700"
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
