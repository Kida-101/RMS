import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

// Define the base URL for the API from environment variables
const API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/Kitchen/dashboard/`;

function Kitchen_Dashboard() {
    // State for selected period (matching backend endpoints)
    const [selectedPeriod, setSelectedPeriod] = useState('day'); // Default to daily view

    // State for fetched data
    const [summaryData, setSummaryData] = useState(null); // For summary cards and pie chart
    const [breakdownData, setBreakdownData] = useState(null); // For breakdown bar charts (month/year view)

    // State for loading and error handling
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // --- Data Fetching ---
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            setSummaryData(null); // Clear previous data
            setBreakdownData(null); // Clear previous data

            try {
                const response = await fetch(`${API_BASE_URL}${selectedPeriod}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                // Separate summary and breakdown data based on period
                if (selectedPeriod === 'month' || selectedPeriod === 'year') {
                    const { breakdown, ...summary } = data;
                    setSummaryData(summary);
                    setBreakdownData(breakdown || []); // Ensure breakdown is an array
                } else { // For 'day' and 'alltime'
                    setSummaryData(data);
                    setBreakdownData(null); // No breakdown for these periods in the new structure
                }

            } catch (e) {
                console.error("Failed to fetch dashboard data:", e);
                setError(`Failed to load data: ${e.message}`);
                setSummaryData(null); // Clear data on error
                setBreakdownData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedPeriod]); // Re-fetch when selectedPeriod changes


    // --- Chart Data Preparation ---

    // Prepare data for the main Bar chart (changes based on period)
    const getMainBarChartData = () => {
        if (!summaryData) return { labels: [], datasets: [] };

        let labels = [];
        let data = [];
        let label = '';
        let backgroundColors = [];

        if (selectedPeriod === 'day') {
            labels = ["Total Orders", "Online Orders", "Onsite Orders", "3rd Party Orders", "Pending Orders", "Assigned Orders", "Served Orders", "Delivered Orders"];
            data = [
                summaryData.total || 0,
                summaryData.online || 0,
                summaryData.onsite || 0,
                summaryData.thirdParty || 0,
                summaryData.pending || 0,
                summaryData.assigned || 0,
                summaryData.served || 0,
                summaryData.delivered || 0 // Assuming delivered is present in summaryData for 'day'
            ];
            label = 'Daily Order Status';
            backgroundColors = ['#4C51BF', '#4299E1', '#ECC94B', '#38A169', '#ED8936', '#5A67D8', '#48BB78', '#319795'];
        } else { // 'month', 'year', 'alltime' show order types
            labels = ["Total Orders", "Online Orders", "Onsite Orders", "3rd Party Orders"];
            data = [
                summaryData.total || 0,
                summaryData.online || 0,
                summaryData.onsite || 0,
                summaryData.thirdParty || 0
            ];
            label = `${selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)} Order Types`;
             backgroundColors = ['#4C51BF', '#4299E1', '#ECC94B', '#38A169'];
        }

        return {
            labels,
            datasets: [{
                label: label,
                data: data,
                backgroundColor: backgroundColors,
                borderRadius: 8,
            }],
        };
    };

    // Prepare data for the Pie Chart (Online vs Onsite vs 3rd Party Ratio)
    const getPieData = () => {
        if (!summaryData) {
           return { labels: ["Online", "Onsite", "3rd Party"], datasets: [{ data: [0, 0, 0], backgroundColor: ['#4299E1', '#ECC94B', '#38A169'], borderWidth: 2 }] };
        }
        // Use summary data which is available for all periods
        const data = [
            summaryData.online || 0,
            summaryData.onsite || 0,
            summaryData.thirdParty || 0
        ];

        return {
            labels: ["Online Orders", "Onsite Orders", "3rd Party Orders"],
            datasets: [{
                data: data,
                backgroundColor: ['#4299E1', '#ECC94B', '#38A169'],
                borderWidth: 2,
            }],
        };
    };

    // Prepare data for the Daily Breakdown Chart (visible in Monthly view)
    const getMonthlyDailyBreakdownData = () => {
        if (!breakdownData || selectedPeriod !== 'month') return { labels: [], datasets: [] };

        // Determine the number of days based on the breakdown data or current month
        const daysInMonth = breakdownData.length > 0 ? Math.max(...breakdownData.map(d => d.day)) : new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();

        const labels = Array.from({ length: daysInMonth }, (_, i) => `Day ${i + 1}`);
        const totalData = Array(daysInMonth).fill(0);
        const onlineData = Array(daysInMonth).fill(0);
        const onsiteData = Array(daysInMonth).fill(0);
        const thirdPartyData = Array(daysInMonth).fill(0);

        breakdownData.forEach(item => {
            const index = item.day - 1;
            if (index >= 0 && index < daysInMonth) {
                totalData[index] = item.total || 0;
                onlineData[index] = item.online || 0;
                onsiteData[index] = item.onsite || 0;
                thirdPartyData[index] = item.thirdParty || 0;
            }
        });

        return {
            labels: labels,
            datasets: [
                { label: 'Total Orders', data: totalData, backgroundColor: '#4C51BF' },
                { label: 'Online Orders', data: onlineData, backgroundColor: '#4299E1' },
                { label: 'Onsite Orders', data: onsiteData, backgroundColor: '#ECC94B' },
                { label: '3rd Party Orders', data: thirdPartyData, backgroundColor: '#38A169' },
            ],
        };
    };

     // Prepare data for the Monthly Breakdown Chart (visible in Yearly view)
    const getYearlyMonthlyBreakdownData = () => {
         if (!breakdownData || selectedPeriod !== 'year') return { labels: [], datasets: [] };

         const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
         const totalData = Array(12).fill(0);
         const onlineData = Array(12).fill(0);
         const onsiteData = Array(12).fill(0);
         const thirdPartyData = Array(12).fill(0);

         breakdownData.forEach(item => {
             const index = item.month - 1; // item.month is 1-12
             if (index >= 0 && index < 12) {
                totalData[index] = item.total || 0;
                onlineData[index] = item.online || 0;
                onsiteData[index] = item.onsite || 0;
                thirdPartyData[index] = item.thirdParty || 0;
             }
         });

         return {
             labels: monthNames,
             datasets: [
                { label: 'Total Orders', data: totalData, backgroundColor: '#4C51BF' },
                { label: 'Online Orders', data: onlineData, backgroundColor: '#4299E1' },
                { label: 'Onsite Orders', data: onsiteData, backgroundColor: '#ECC94B' },
                { label: '3rd Party Orders', data: thirdPartyData, backgroundColor: '#38A169' },
             ],
         };
     };


    // --- Chart Options --- (Adjusted slightly for clarity)
    const barChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: { display: false }, // Title is handled by card headers
            legend: { display: true, position: 'top' }, // Show legend for breakdown charts
            tooltip: {
                callbacks: {
                    label: (context) => `${context.dataset.label}: ${context.raw} orders`,
                },
            },
        },
        scales: {
            x: { title: { display: true, text: selectedPeriod === 'month' ? 'Day of Month' : selectedPeriod === 'year' ? 'Month' : 'Categories' } },
            y: { title: { display: true, text: 'Order Count' }, beginAtZero: true },
        },
    };

     const summaryBarChartOptions = { ...barChartOptions, plugins: { ...barChartOptions.plugins, legend: { display: false } }}; // No legend for summary bar

    const pieChartOptions = {
        responsive: true,
        maintainAspectRatio: false, // Allow resizing
        plugins: {
             title: { display: false },
             legend: { display: true, position: 'top' },
             tooltip: {
                 callbacks: {
                    label: (context) => {
                        // Calculate percentage for pie chart tooltip
                        const total = context.dataset.data.reduce((acc, value) => acc + value, 0);
                        const value = context.raw || 0;
                        const percentage = total > 0 ? ((value / total) * 100).toFixed(1) + '%' : '0%';
                        return `${context.label}: ${value} (${percentage})`;
                    }
                 },
             },
        },
    };


    // Handle the period selection change
    const handlePeriodChange = (e) => {
        setSelectedPeriod(e.target.value);
    };

    // Helper to render summary cards
    const renderSummaryCards = () => {
        if (!summaryData) return null;

        // Base cards available for all periods
        const cards = [
            { title: "Total Orders", value: summaryData.total },
            { title: "Online Orders", value: summaryData.online },
            { title: "Onsite Orders", value: summaryData.onsite },
            { title: "3rd Party Orders", value: summaryData.thirdParty },
        ];

        // Add daily specific cards
        if (selectedPeriod === 'day') {
            cards.push(
                { title: "Pending Orders", value: summaryData.pending },
                { title: "Assigned Orders", value: summaryData.assigned },
                { title: "Served Orders", value: summaryData.served },
                { title: "Delivered Orders", value: summaryData.delivered } // Assuming 'delivered' is provided
            );
        }

        return cards.map(card => (
            card.value !== undefined && card.value !== null && // Render only if value exists
                <div key={card.title} className="bg-white p-4 rounded-xl shadow-xl text-center md:text-left">
                    <h3 className="text-lg font-semibold text-gray-700">{card.title}</h3>
                    <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                </div>
        ));
    };

    return (
        <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Kitchen Dashboard</h1>
                <select
                    value={selectedPeriod}
                    onChange={handlePeriodChange}
                    className="p-2 rounded border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    disabled={loading} // Disable while loading
                >
                    {/* Use values matching backend endpoints */}
                    <option value="day">Daily</option>
                    <option value="month">Monthly</option>
                    <option value="year">Yearly</option>
                    <option value="alltime">All Time</option>
                </select>
            </div>

            {/* Loading and Error Display */}
            {loading && <div className="text-center py-10 text-xl font-semibold text-gray-600">Loading data...</div>}
            {error && <div className="text-center py-10 text-xl font-semibold text-red-600 bg-red-100 p-4 rounded border border-red-500">{error}</div>}

             {/* Data Display Area (only rendered when not loading and no critical error) */}
            {!loading && !error && summaryData && (
                 <>
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                         {renderSummaryCards()}
                    </div>

                    {/* Charts Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                         {/* Main Bar/Status Chart */}
                         <div className="bg-white p-4 rounded-xl shadow-xl">
                             <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
                                 {selectedPeriod === 'day' ? 'Daily Order Status' : `${selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)} Order Types`}
                             </h2>
                             <div className="h-72"> {/* Fixed height container */}
                                 <Bar data={getMainBarChartData()} options={summaryBarChartOptions} />
                             </div>
                         </div>

                         {/* Pie Chart */}
                         <div className="bg-white p-4 rounded-xl shadow-xl">
                             <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Order Source Distribution</h2>
                             <div className="h-72 flex justify-center items-center"> {/* Fixed height container */}
                                <Pie data={getPieData()} options={pieChartOptions} />
                             </div>
                         </div>
                    </div>

                    {/* Breakdown Charts (Conditional) */}
                    {/* Monthly Breakdown (shown when 'Monthly' period selected) */}
                    {selectedPeriod === 'month' && breakdownData && (
                        <div className="bg-white p-4 rounded-xl shadow-xl mt-6">
                           <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Daily Breakdown (This Month)</h2>
                           <div className="h-96"> {/* Larger height for breakdown */}
                                <Bar data={getMonthlyDailyBreakdownData()} options={barChartOptions} />
                           </div>
                        </div>
                    )}

                     {/* Yearly Breakdown (shown when 'Yearly' period selected) */}
                    {selectedPeriod === 'year' && breakdownData && (
                        <div className="bg-white p-4 rounded-xl shadow-xl mt-6">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Monthly Breakdown (This Year)</h2>
                            <div className="h-96"> {/* Larger height for breakdown */}
                                <Bar data={getYearlyMonthlyBreakdownData()} options={barChartOptions} />
                            </div>
                        </div>
                    )}
                </>
            )}
            {/* Fallback message if data is fetched but empty */}
             {!loading && !error && !summaryData && selectedPeriod &&
                 <div className="text-center py-10 text-xl font-semibold text-gray-500">No data available for the selected period.</div>
             }

        </div>
    );
}

export default Kitchen_Dashboard;