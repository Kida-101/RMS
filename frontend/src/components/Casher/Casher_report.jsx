import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios'; // Import axios

// Define the base URL for the API endpoints
// Make sure VITE_BACKEND_URL is set in your .env file if using Vite
// Adjust if using Create React App (REACT_APP_BACKEND_URL) or hardcoding.
const API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/casher/casher_report`;
// Example if not using env vars: const API_BASE_URL = "http://localhost:4000/api/casher/casher_report";

function Casher_report() {
    const [filter, setFilter] = useState('Daily'); // Default filter
    const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]); // Default to today
    const [customRange, setCustomRange] = useState({ start: '', end: '' }); // Custom date range
    const [reportData, setReportData] = useState([]); // Combined state for report data
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state
    const [isInitialLoad, setIsInitialLoad] = useState(true); // Track initial load

    // --- Central Data Fetching Function ---
    // Accepts overrideParams to fetch specific data (e.g., today's date for Daily reset)
    const fetchReportData = useCallback(async (currentFilter = filter, overrideParams = null) => {
        console.log(`WorkspaceReportData called with filter: ${currentFilter}`, overrideParams || '(no overrides)');
        setLoading(true);
        setError(null);
        // Clear data strategically before fetch based on context (in useEffect/handlers)

        let endpoint = '';
        let baseParams = {}; // Parameters based on current state
        let finalParams = {}; // Parameters to actually use for the request
        let shouldFetch = true; // Flag to decide if API call should proceed

        try {
            // Determine endpoint and baseParams from state
            switch (currentFilter) {
                case 'Daily':
                    endpoint = '/daily';
                    // Base params use component state unless overridden
                    baseParams = { date: selectedDate };
                    break;
                case 'Monthly':
                    endpoint = '/monthly';
                    baseParams = {
                        month: new Date().getMonth() + 1,
                        year: new Date().getFullYear(),
                    };
                    break;
                case 'Yearly':
                    endpoint = '/yearly';
                    baseParams = { year: new Date().getFullYear() };
                    break;
                case 'Customizable':
                    endpoint = '/custom';
                    baseParams = { start: customRange.start, end: customRange.end };
                    break;
                default:
                    console.error('Invalid filter type in fetchReportData');
                    shouldFetch = false;
                    setError('Invalid report type selected.');
            }

            // Decide the final parameters: override if provided, otherwise use state-based ones
            finalParams = overrideParams ? overrideParams : baseParams;
            console.log(`Final params for fetch:`, finalParams);


            // Perform validation using finalParams (especially for Custom)
            if (currentFilter === 'Customizable') {
                if (!finalParams.start || !finalParams.end) {
                    setError("Please select both start and end dates.");
                    shouldFetch = false;
                } else if (new Date(finalParams.start) > new Date(finalParams.end)) {
                    setError("Start date cannot be after end date.");
                    shouldFetch = false;
                }
            }
             // Add validation for Daily if needed (e.g., date format, though handled by input type="date")
             if (currentFilter === 'Daily' && !finalParams.date) {
                 setError("Date is required for daily report.");
                 shouldFetch = false;
             }


            if (shouldFetch) {
                console.log(`Workspaceing data from: ${API_BASE_URL}${endpoint}`, finalParams);
                 setReportData([]); // Clear data right before successful fetch attempt
                const response = await axios.get(`${API_BASE_URL}${endpoint}`, { params: finalParams });
                console.log("Data received:", response.data);
                setReportData(response.data || []);
                setError(null); // Clear error on successful fetch
            } else {
                 setReportData([]); // Clear data if fetch is prevented by validation/logic
                 // Error should be set by validation logic above if needed
                 console.log("Fetch prevented due to validation or logic.");
            }

        } catch (err) {
            console.error("Error fetching report data:", err);
            let errorMessage = "Failed to fetch data. Please try again.";
            if (err.response && err.response.data && err.response.data.error) {
                errorMessage = err.response.data.error;
            } else if (err.message) {
                errorMessage = err.message;
            }
            setError(errorMessage);
            setReportData([]); // Clear data on error
        } finally {
            setLoading(false); // Stop loading indicator regardless of success/error
            // Mark initial load as complete *after* the first fetch attempt finishes
            if (isInitialLoad) {
                console.log("Marking initial load as complete.");
                setIsInitialLoad(false);
            }
        }
    // Dependencies should include all state variables used to determine `baseParams`
    }, [filter, selectedDate, customRange, isInitialLoad]); // Keep original state dependencies


    // --- Effect for Handling Filter Changes ---
    useEffect(() => {
        console.log(`Filter Effect Triggered. Filter: ${filter}. Initial Load: ${isInitialLoad}`);

        // 1. Handle Initial Load (only for default 'Daily' filter)
        if (filter === 'Daily' && isInitialLoad) {
            console.log("Effect: Fetching initial daily data...");
            // Date is already today via useState initializer
            setReportData([]); // Clear just in case
            setError(null);
            fetchReportData('Daily'); // Fetch with default state (today's date)
            return; // Stop effect processing for initial load
        }

        // --- Handle Subsequent Filter Changes (Not Initial Load) ---
        if (!isInitialLoad) {
            // 2. Auto-Fetch for Monthly/Yearly
            if (filter === 'Monthly' || filter === 'Yearly') {
                 console.log(`Effect: Fetching ${filter} data automatically...`);
                 setReportData([]); // Clear previous data
                 setError(null);
                 fetchReportData(filter); // Fetch these automatically
            }
            // 3. Handle switching BACK to Daily (Reset to Today & Fetch)
            else if (filter === 'Daily') {
                 console.log(`Effect: Switching back to Daily view. Resetting date to today and fetching.`);
                 const todayDate = new Date().toISOString().split('T')[0];
                 setSelectedDate(todayDate); // Reset date state to today first
                 setReportData([]);
                 setError(null);
                 // Call fetchReportData, providing today's date as an override
                 fetchReportData('Daily', { date: todayDate }); // Fetch for today immediately
            }
            // 4. Clear Data/Error for Customizable (Requires button click to fetch)
            else if (filter === 'Customizable') {
                 console.log(`Effect: Clearing data/error for ${filter} view.`);
                 setReportData([]); // Clear data
                 setError(null);    // Clear error
                 // Optional: Reset custom range picker if desired when switching TO it
                 // setCustomRange({ start: '', end: '' });
            }
        }

    // Run this effect when the filter changes, or on initial load status change.
    // fetchReportData is included because its identity changes if its dependencies change (though they mostly overlap with filter/isInitialLoad).
    }, [filter, isInitialLoad, fetchReportData]);


    // --- Button Click Handlers ---
    const handleFetchDaily = () => {
        // Explicitly trigger fetch for Daily filter when button is clicked
        if(filter === 'Daily' && !loading) { // Prevent clicks while loading
            console.log("Manual fetch triggered for Daily with date:", selectedDate);
             setReportData([]); // Clear previous
             setError(null);    // Clear previous error
            // Fetch using the currently selected date from the state
            fetchReportData('Daily'); // No override needed, uses selectedDate state
        }
    };

    const handleFetchCustom = () => {
        // Explicitly trigger fetch for Custom filter when button is clicked
         if(filter === 'Customizable' && !loading) { // Prevent clicks while loading
             console.log("Manual fetch triggered for Customizable with range:", customRange);
             setReportData([]); // Clear previous
             setError(null);    // Clear previous error
             // Validation is inside fetchReportData, just call it
            fetchReportData('Customizable'); // Uses customRange state
        }
    };

    // --- Calculate Totals ---
    const calculateTotal = (data) =>
        data.reduce(
            (totals, item) => {
                // **FIX:** Explicitly convert values to numbers before adding
                // Use parseFloat and handle potential NaN results by defaulting to 0
                const currentTotal = parseFloat(item.total || 0);
                const currentOnline = parseFloat(item.online || 0);
                const currentOnsite = parseFloat(item.onsite || 0);
                const currentThirdParty = parseFloat(item.thirdParty || 0);

                return {
                    total: totals.total + (isNaN(currentTotal) ? 0 : currentTotal),
                    online: totals.online + (isNaN(currentOnline) ? 0 : currentOnline),
                    onsite: totals.onsite + (isNaN(currentOnsite) ? 0 : currentOnsite),
                    thirdParty: totals.thirdParty + (isNaN(currentThirdParty) ? 0 : currentThirdParty),
                };
            },
            // Initial totals remain 0
            { total: 0, online: 0, onsite: 0, thirdParty: 0 }
        );


    // --- Render Table Function ---
    const renderTable = () => {
        // Use the unified reportData state
        const data = reportData;
        const totals = calculateTotal(data);

        // Conditionally show message if no data and not loading/error
        // Added specific messages for Daily/Customizable when empty after interaction
        if (!loading && !error && data.length === 0) {
           if (filter === 'Customizable') {
               return <p className="text-center text-gray-600 mt-4">Please select a date range and click 'Fetch Data'.</p>;
           }
           // Show specific message for Daily only if it's not the initial load phase
            if (filter === 'Daily' && !isInitialLoad) {
               return <p className="text-center text-gray-600 mt-4">Please select a date and click 'Fetch Data', or today's data should be loading/shown.</p>;
           }
           // Generic message for other cases (like initial load还没开始, or actual empty results for Monthly/Yearly)
           if(!isInitialLoad) { // Avoid showing "No data" during the very brief initial load moment
                return <p className="text-center text-gray-600 mt-4">No data found for the selected period.</p>;
           }
           return null; // Don't show anything during initial load before first fetch finishes
        }

        // Show table only if data exists and not loading/error
        // Note: data length check is now above, so we just need to check loading/error
         if (!loading && !error && data.length > 0) {
            return (
                <div className="overflow-x-auto bg-gray-100 p-4 rounded-xl shadow-xl">
                    <table className="min-w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-white">
                                {/* Headers adjusted based on filter */}
                                {filter === 'Daily' && <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-semibold">Payment ID</th>}
                                {filter === 'Daily' && <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-semibold">Type</th>}
                                {filter === 'Daily' && <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-semibold">Time</th>}
                                {filter === 'Monthly' && <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-semibold">Day</th>}
                                {filter === 'Yearly' && <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-semibold">Month</th>}
                                {filter === 'Customizable' && <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-semibold">Date</th>}

                                {/* Common Headers */}
                                <th className="border border-gray-300 px-4 py-2 text-right text-gray-700 font-semibold">Total Payment ($)</th>

                                {/* Headers specific to aggregated views */}
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
                                <tr key={filter === 'Daily' ? item.id : index} className="hover:bg-gray-50"> {/* Use unique ID for daily */}
                                    {/* Cells adjusted based on filter */}
                                    {filter === 'Daily' && <td className="border border-gray-300 px-4 py-2 text-gray-700">{item.id}</td>}
                                    {filter === 'Daily' && <td className="border border-gray-300 px-4 py-2 text-gray-700">{item.type}</td>}
                                    {filter === 'Daily' && <td className="border border-gray-300 px-4 py-2 text-gray-700">{item.time}</td>}
                                    {filter === 'Monthly' && <td className="border border-gray-300 px-4 py-2 text-gray-700">{item.day}</td>}
                                    {filter === 'Yearly' && <td className="border border-gray-300 px-4 py-2 text-gray-700">{item.month}</td>}
                                    {filter === 'Customizable' && <td className="border border-gray-300 px-4 py-2 text-gray-700">{item.date}</td>}

                                    {/* Common Cells */}
                                    <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">${(item.total || 0).toLocaleString()}</td>

                                    {/* Cells specific to aggregated views */}
                                    {filter !== 'Daily' && (
                                        <>
                                            <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">${(item.online || 0).toLocaleString()}</td>
                                            <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">${(item.onsite || 0).toLocaleString()}</td>
                                            <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">${(item.thirdParty || 0).toLocaleString()}</td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                        {/* Footer with totals */}
                        {data.length > 0 && ( // Show footer only if there's data
                            <tfoot>
                                <tr className="bg-gray-100 font-semibold">
                                    <td
                                        className="border border-gray-300 px-4 py-2 text-gray-700"
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
                        )}
                    </table>
                </div>
            );
        }
        // Return null or specific message if loading or error
        return null; // Table structure is returned above if conditions met
    };

    // --- Main Component Return ---
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Payment Report</h1>

            {/* Filter Section */}
            <div className="flex justify-end items-center mb-6 gap-4">
                <label htmlFor="filter" className="text-lg font-semibold text-gray-700">
                    Report Type:
                </label>
                <select
                    id="filter"
                    value={filter}
                    onChange={(e) => {
                        setFilter(e.target.value); // Update filter state, useEffect handles the logic
                    }}
                    className="p-2 rounded border-gray-300 shadow-sm"
                    disabled={loading} // Disable while loading
                >
                    <option value="Daily">Daily</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                    <option value="Customizable">Customizable</option>
                </select>
            </div>

            {/* Daily Filter - Always visible when filter is 'Daily' */}
            {filter === 'Daily' && (
                <div className="mb-6">
                    <label htmlFor="dailyDate" className="block text-lg font-semibold text-gray-700 mb-2">
                        Select Date:
                    </label>
                    <div className="flex gap-4 items-center">
                        <input
                            type="date"
                            id="dailyDate"
                            value={selectedDate} // Controlled input
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="p-2 rounded border-gray-300 shadow-sm"
                            disabled={loading}
                        />
                        <button
                            onClick={handleFetchDaily} // Manual fetch trigger
                            className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? 'Fetching...' : 'Fetch Data'}
                        </button>
                    </div>
                </div>
            )}

            {/* Custom Date Range Picker - Always visible when filter is 'Customizable' */}
            {filter === 'Customizable' && (
                <div className="mb-6">
                    <label className="block text-lg font-semibold text-gray-700 mb-2">
                        Select Date Range:
                    </label>
                    <div className="flex gap-4 items-center flex-wrap">
                        <input
                            type="date"
                            id="startDate"
                            value={customRange.start}
                            onChange={(e) => setCustomRange({ ...customRange, start: e.target.value })}
                            className="p-2 rounded border-gray-300 shadow-sm"
                             disabled={loading}
                        />
                         <span className="text-gray-600">to</span>
                        <input
                            type="date"
                            id="endDate"
                            value={customRange.end}
                             onChange={(e) => setCustomRange({ ...customRange, end: e.target.value })}
                            className="p-2 rounded border-gray-300 shadow-sm"
                             disabled={loading}
                        />
                        <button
                             onClick={handleFetchCustom} // Manual fetch trigger
                            className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 disabled:opacity-50"
                            disabled={loading || !customRange.start || !customRange.end} // Also disable if range incomplete
                        >
                             {loading ? 'Fetching...' : 'Fetch Data'}
                        </button>
                    </div>
                </div>
            )}

            {/* Loading Indicator */}
            {loading && <p className="text-center text-blue-600 mt-4">Loading report data...</p>}

            {/* Error Display - Show only if not loading */}
            {!loading && error && (
                 <p className="text-center text-red-600 mt-4 border border-red-400 bg-red-100 p-3 rounded">
                     Error: {error}
                 </p>
            )}

            {/* Render Table Area - RenderTable handles no data message */}
            {renderTable()}

        </div>
    );
}

export default Casher_report;