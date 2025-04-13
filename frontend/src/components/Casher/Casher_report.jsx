import React, { useState, useEffect, useCallback, useRef } from 'react'; // Import useRef
import axios from 'axios';

const API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/casher/casher_report`;

function Casher_report() {
    const [filter, setFilter] = useState('Daily');
    const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);
    const [customRange, setCustomRange] = useState({ start: '', end: '' });
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const previousFilterRef = useRef(filter); // Ref to store the previous filter value

    // --- Central Data Fetching Function (No changes needed here) ---
    const fetchReportData = useCallback(async (currentFilter = filter, overrideParams = null) => {
        console.log(`WorkspaceReportData called with filter: ${currentFilter}`, overrideParams || '(no overrides)');
        setLoading(true);
        setError(null);

        let endpoint = '';
        let baseParams = {};
        let finalParams = {};
        let shouldFetch = true;

        try {
            switch (currentFilter) {
                case 'Daily':
                    endpoint = '/daily';
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

            finalParams = overrideParams ? overrideParams : baseParams;
            console.log(`Final params for fetch:`, finalParams);

            if (currentFilter === 'Customizable') {
                if (!finalParams.start || !finalParams.end) {
                    setError("Please select both start and end dates.");
                    shouldFetch = false;
                } else if (new Date(finalParams.start) > new Date(finalParams.end)) {
                    setError("Start date cannot be after end date.");
                    shouldFetch = false;
                }
            }
             if (currentFilter === 'Daily' && !finalParams.date) {
                 setError("Date is required for daily report.");
                 shouldFetch = false;
             }

            if (shouldFetch) {
                console.log(`Workspaceing data from: ${API_BASE_URL}${endpoint}`, finalParams);
                 setReportData([]);
                const response = await axios.get(`${API_BASE_URL}${endpoint}`, { params: finalParams });
                console.log("Data received:", response.data);
                setReportData(response.data || []);
                setError(null);
            } else {
                 setReportData([]);
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
            setReportData([]);
        } finally {
            setLoading(false);
            if (isInitialLoad) {
                console.log("Marking initial load as complete.");
                setIsInitialLoad(false);
            }
        }
    }, [selectedDate, customRange, isInitialLoad]); // Removed 'filter' dependency - fetchReportData gets filter passed explicitly

    // --- Effect for Handling Filter Changes ---
    useEffect(() => {
        const previousFilter = previousFilterRef.current; // Get the previous filter value
        console.log(`Filter Effect Triggered. Prev: ${previousFilter}, Curr: ${filter}. Initial: ${isInitialLoad}`);

        // 1. Handle Initial Load (only for default 'Daily' filter)
        if (filter === 'Daily' && isInitialLoad) {
            console.log("Effect: Fetching initial daily data...");
            setReportData([]);
            setError(null);
            fetchReportData('Daily'); // Fetch initial daily data
            // Update ref *after* handling initial load
            previousFilterRef.current = filter;
            return; // Don't proceed further in this effect run
        }

        // --- Handle Subsequent Filter Changes (Not Initial Load) ---
        // Only run change logic if the filter *actually changed*
        if (!isInitialLoad && filter !== previousFilter) {
            console.log(`Effect: Filter changed from ${previousFilter} to ${filter}`);

            // 2. Auto-Fetch for Monthly/Yearly when filter changes TO them
            if (filter === 'Monthly' || filter === 'Yearly') {
                 console.log(`Effect: Fetching ${filter} data automatically...`);
                 setReportData([]);
                 setError(null);
                 fetchReportData(filter); // Fetch these automatically
            }
            // 3. Handle switching TO Daily (Reset to Today & Fetch)
            else if (filter === 'Daily') {
                 console.log(`Effect: Switching TO Daily view. Resetting date to today and fetching.`);
                 const todayDate = new Date().toISOString().split('T')[0];
                 setSelectedDate(todayDate); // Reset date state to today
                 setReportData([]);
                 setError(null);
                 // Call fetchReportData, providing today's date as an override
                 fetchReportData('Daily', { date: todayDate }); // Fetch for today immediately
            }
            // 4. Clear Data/Error when switching TO Customizable
            else if (filter === 'Customizable') {
                 console.log(`Effect: Clearing data/error for ${filter} view.`);
                 setReportData([]); // Clear data
                 setError(null);    // Clear error
                 // setCustomRange({ start: '', end: '' }); // Optional: reset range inputs
            }

            // Update the ref to the *new* current filter AFTER processing the change
            previousFilterRef.current = filter;

        } else if (!isInitialLoad && filter === previousFilter) {
             console.log(`Effect: Filter (${filter}) did not change, skipping filter change logic.`);
        } else {
             console.log("Effect: Initial load state, but filter is not Daily or no change. No action.");
        }

    // This effect should run primarily when 'filter' or 'isInitialLoad' changes.
    // fetchReportData is included because it's called inside, ensuring the latest version is used.
    }, [filter, isInitialLoad, fetchReportData]);


    // --- Button Click Handlers (No changes needed) ---
    const handleFetchDaily = () => {
        if(filter === 'Daily' && !loading) {
            console.log("Manual fetch triggered for Daily with date:", selectedDate);
             setReportData([]);
             setError(null);
            // Uses current selectedDate state because no override is passed
            fetchReportData('Daily');
        }
    };

    const handleFetchCustom = () => {
         if(filter === 'Customizable' && !loading) {
             console.log("Manual fetch triggered for Customizable with range:", customRange);
             setReportData([]);
             setError(null);
             // Uses current customRange state because no override is passed
            fetchReportData('Customizable');
        }
    };

    // --- Calculate Totals (Includes parseFloat fix) ---
    const calculateTotal = (data) =>
        data.reduce(
            (totals, item) => {
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
            { total: 0, online: 0, onsite: 0, thirdParty: 0 }
        );

    // --- Render Table Function (No changes needed) ---
     const renderTable = () => {
        const data = reportData;
        const totals = calculateTotal(data);

        if (!loading && !error && data.length === 0) {
           if (filter === 'Customizable') {
               return <p className="text-center text-gray-600 mt-4">Please select a date range and click 'Fetch Data'.</p>;
           }
            if (filter === 'Daily' && !isInitialLoad) {
               return <p className="text-center text-gray-600 mt-4">Please select a date and click 'Fetch Data', or today's data should be loading/shown.</p>;
           }
           if(!isInitialLoad) {
                return <p className="text-center text-gray-600 mt-4">No data found for the selected period.</p>;
           }
           return null;
        }

         if (!loading && !error && data.length > 0) {
            return (
                <div className="overflow-x-auto bg-gray-100 p-4 rounded-xl shadow-xl">
                    <table className="min-w-full border-collapse border border-gray-300">
                       <thead>
                           <tr className="bg-white">
                               {filter === 'Daily' && <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-semibold">Payment ID</th>}
                               {filter === 'Daily' && <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-semibold">Type</th>}
                               {filter === 'Daily' && <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-semibold">Time</th>}
                               {filter === 'Monthly' && <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-semibold">Day</th>}
                               {filter === 'Yearly' && <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-semibold">Month</th>}
                               {filter === 'Customizable' && <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-semibold">Date</th>}
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
                               <tr key={filter === 'Daily' ? item.id : index} className="hover:bg-gray-50">
                                   {filter === 'Daily' && <td className="border border-gray-300 px-4 py-2 text-gray-700">{item.id}</td>}
                                   {filter === 'Daily' && <td className="border border-gray-300 px-4 py-2 text-gray-700">{item.type}</td>}
                                   {filter === 'Daily' && <td className="border border-gray-300 px-4 py-2 text-gray-700">{item.time}</td>}
                                   {filter === 'Monthly' && <td className="border border-gray-300 px-4 py-2 text-gray-700">{item.day}</td>}
                                   {filter === 'Yearly' && <td className="border border-gray-300 px-4 py-2 text-gray-700">{item.month}</td>}
                                   {filter === 'Customizable' && <td className="border border-gray-300 px-4 py-2 text-gray-700">{item.date}</td>}
                                   <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">${(item.total || 0).toLocaleString()}</td>
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
                       {data.length > 0 && (
                           <tfoot>
                               <tr className="bg-gray-100 font-semibold">
                                   <td
                                       className="border border-gray-300 px-4 py-2 text-gray-700"
                                       colSpan={filter === 'Daily' ? 3 : 1}
                                   > Grand Total </td>
                                   <td className="border border-gray-300 px-4 py-2 text-right font-bold text-gray-800">
                                       ${totals.total.toLocaleString()}
                                   </td>
                                   {filter !== 'Daily' && (
                                       <>
                                           <td className="border border-gray-300 px-4 py-2 text-right font-bold text-gray-800"> ${totals.online.toLocaleString()} </td>
                                           <td className="border border-gray-300 px-4 py-2 text-right font-bold text-gray-800"> ${totals.onsite.toLocaleString()} </td>
                                           <td className="border border-gray-300 px-4 py-2 text-right font-bold text-gray-800"> ${totals.thirdParty.toLocaleString()} </td>
                                       </>
                                   )}
                               </tr>
                           </tfoot>
                       )}
                   </table>
               </div>
           );
        }
        return null;
    };

    // --- Main Component Return (No changes needed) ---
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Payment Report</h1>

            {/* Filter Section */}
            <div className="flex justify-end items-center mb-6 gap-4">
                <label htmlFor="filter" className="text-lg font-semibold text-gray-700"> Report Type: </label>
                <select id="filter" value={filter} onChange={(e) => { setFilter(e.target.value); }} className="p-2 rounded border-gray-300 shadow-sm" disabled={loading} >
                    <option value="Daily">Daily</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                    <option value="Customizable">Customizable</option>
                </select>
            </div>

            {/* Daily Filter */}
            {filter === 'Daily' && (
                <div className="mb-6">
                    <label htmlFor="dailyDate" className="block text-lg font-semibold text-gray-700 mb-2"> Select Date: </label>
                    <div className="flex gap-4 items-center">
                        <input type="date" id="dailyDate" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="p-2 rounded border-gray-300 shadow-sm" disabled={loading} />
                        <button onClick={handleFetchDaily} className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 disabled:opacity-50" disabled={loading} >
                            {loading ? 'Fetching...' : 'Fetch Data'}
                        </button>
                    </div>
                </div>
            )}

            {/* Custom Date Range Picker */}
            {filter === 'Customizable' && (
                <div className="mb-6">
                    <label className="block text-lg font-semibold text-gray-700 mb-2"> Select Date Range: </label>
                    <div className="flex gap-4 items-center flex-wrap">
                        <input type="date" id="startDate" value={customRange.start} onChange={(e) => setCustomRange({ ...customRange, start: e.target.value })} className="p-2 rounded border-gray-300 shadow-sm" disabled={loading} />
                        <span className="text-gray-600">to</span>
                        <input type="date" id="endDate" value={customRange.end} onChange={(e) => setCustomRange({ ...customRange, end: e.target.value })} className="p-2 rounded border-gray-300 shadow-sm" disabled={loading} />
                        <button onClick={handleFetchCustom} className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 disabled:opacity-50" disabled={loading || !customRange.start || !customRange.end} >
                             {loading ? 'Fetching...' : 'Fetch Data'}
                        </button>
                    </div>
                </div>
            )}

            {/* Loading Indicator */}
            {loading && <p className="text-center text-blue-600 mt-4">Loading report data...</p>}

            {/* Error Display */}
            {!loading && error && (
                 <p className="text-center text-red-600 mt-4 border border-red-400 bg-red-100 p-3 rounded"> Error: {error} </p>
            )}

            {/* Render Table Area */}
            {renderTable()}

        </div>
    );
}

export default Casher_report;