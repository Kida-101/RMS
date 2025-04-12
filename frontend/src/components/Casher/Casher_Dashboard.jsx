import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

function Casher_Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('day'); // State to manage the selected period
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the backend API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let endpoint = '';
        
        switch (selectedPeriod) {
          case 'day':
            endpoint = 'day';
            break;
          case 'month':
            endpoint = 'month';
            break;
          case 'year':
            endpoint = 'year';
            break;
          case 'alltime':
            endpoint = 'alltime';
            break;
          default:
            endpoint = 'day';
        }

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/casher/dashboard/${endpoint}`);
        const data = response.data;
        setDashboardData(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedPeriod]);

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `$${context.raw.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: { title: { display: true, text: 'Categories' } },
      y: { title: { display: true, text: 'Amount ($)' }, beginAtZero: true },
    },
  };

  // Handle period selection change
  const handlePeriodChange = (e) => {
    setSelectedPeriod(e.target.value);
  };

  // Prepare chart data based on the selected period and fetched data
  const getBarChartData = () => {
    if (!dashboardData) return null;
    
    return {
      labels: ['Total Payment', 'Online Payment', 'Onsite Payment', '3rd Party Payment'],
      datasets: [
        {
          label: `${selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)} Payments`,
          data: [dashboardData.total || 0, dashboardData.online || 0, dashboardData.onsite || 0, dashboardData.third_party || 0],
          backgroundColor: ['#4C51BF', '#4299E1', '#ECC94B', '#38A169'],
          borderRadius: 8,
        },
      ],
    };
  };

  // Prepare pie chart data
  const getPieData = () => {
    if (!dashboardData) return null;
    
    return {
      labels: ['Online Payment', 'Onsite Payment', '3rd Party Payment'],
      datasets: [
        {
          data: [dashboardData.online || 0, dashboardData.onsite || 0, dashboardData.third_party || 0],
          backgroundColor: ['#4299E1', '#ECC94B', '#38A169'],
          borderRadius: 8,
        },
      ],
    };
  };

  // Prepare breakdown data for monthly or yearly views
  // Prepare breakdown data for monthly or yearly views
const getBreakdownData = () => {
  if (!dashboardData || !dashboardData.breakdown) return null;
  
  const isMonthly = selectedPeriod === 'month';
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const labels = isMonthly 
    ? dashboardData.breakdown.map(item => `Day ${item.day}`)
    : dashboardData.breakdown.map(item => monthNames[item.month - 1]); // Map month number to month name

  return {
    labels: labels,
    datasets: [
      {
        label: 'Total Payment',
        data: dashboardData.breakdown.map(item => item.total || 0),
        backgroundColor: '#4C51BF',
      },
      {
        label: 'Online Payment',
        data: dashboardData.breakdown.map(item => item.online || 0),
        backgroundColor: '#4299E1',
      },
      {
        label: 'Onsite Payment',
        data: dashboardData.breakdown.map(item => item.onsite || 0),
        backgroundColor: '#ECC94B',
      },
      {
        label: '3rd Party Payment',
        data: dashboardData.breakdown.map(item => item.third_party || 0),
        backgroundColor: '#38A169',
      },
    ],
  };
};


  if (loading && !dashboardData) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
        <div className="text-xl font-semibold">Loading dashboard data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
        <div className="text-xl font-semibold text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800">Casher Dashboard</h1>
        <select
          value={selectedPeriod}
          onChange={handlePeriodChange}
          className="p-2 rounded border-gray-300 shadow-sm"
        >
          <option value="day">Daily</option>
          <option value="month">Monthly</option>
          <option value="year">Yearly</option>
          <option value="alltime">All Time</option>
        </select>
      </div>

      {/* Display charts based on selected period */}
      {dashboardData && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bar Chart */}
            <div className="bg-white p-4 rounded-xl shadow-xl">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
                {selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)} Payment Statistics
              </h2>
              <div className="h-72">
                {getBarChartData() && <Bar data={getBarChartData()} options={chartOptions} />}
              </div>
            </div>

            {/* Pie Chart */}
            <div className="bg-white p-4 rounded-xl shadow-xl">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Payment Distribution</h2>
              <div className="h-72 flex justify-center items-center">
                {getPieData() && <Pie data={getPieData()} />}
              </div>
            </div>
          </div>

          {/* Breakdown Charts */}
          {(selectedPeriod === 'month' || selectedPeriod === 'year') && dashboardData.breakdown && (
            <div className="bg-white p-4 rounded-xl shadow-xl mt-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
                {selectedPeriod === 'month' ? 'Daily' : 'Monthly'} Breakdown
              </h2>
              <div className="h-96">
                <Bar data={getBreakdownData()} options={chartOptions} />
              </div>
            </div>
          )}

          {/* Summary Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 mb-6">
            <div className="bg-white p-4 rounded-xl shadow-xl">
              <h3 className="text-lg font-semibold text-gray-700">Total Payment</h3>
              <p className="text-2xl font-bold text-gray-800">${(dashboardData.total || 0).toLocaleString()}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-xl">
              <h3 className="text-lg font-semibold text-gray-700">Online Payment</h3>
              <p className="text-2xl font-bold text-gray-800">${(dashboardData.online || 0).toLocaleString()}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-xl">
              <h3 className="text-lg font-semibold text-gray-700">Onsite Payment</h3>
              <p className="text-2xl font-bold text-gray-800">${(dashboardData.onsite || 0).toLocaleString()}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-xl">
              <h3 className="text-lg font-semibold text-gray-700">3rd Party Payment</h3>
              <p className="text-2xl font-bold text-gray-800">${(dashboardData.third_party || 0).toLocaleString()}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Casher_Dashboard;