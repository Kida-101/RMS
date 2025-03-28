import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

function Casher_Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('daily'); // State to manage the selected period

  // Example payment data
  const paymentData = {
    daily: {
      total: 1200,
      online: 500,
      onsite: 400,
      thirdParty: 300,
    },
    monthly: {
      total: 36000,
      online: 15000,
      onsite: 12000,
      thirdParty: 9000,
    },
    yearly: {
      total: 432000,
      online: 180000,
      onsite: 144000,
      thirdParty: 108000,
    },
    alltime: {
      total: 1200000,
      online: 500000,
      onsite: 400000,
      thirdParty: 300000,
    },
  };

  // Monthly daily breakdown data
  const monthlyDailyData = {
    labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`), // Days of the month
    datasets: [
      {
        label: 'Total Payment',
        data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 2000) + 500),
        backgroundColor: '#4C51BF',
      },
      {
        label: 'Online Payment',
        data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 1000) + 200),
        backgroundColor: '#4299E1',
      },
      {
        label: 'Onsite Payment',
        data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 800) + 100),
        backgroundColor: '#ECC94B',
      },
      {
        label: '3rd Party Payment',
        data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 600) + 50),
        backgroundColor: '#38A169',
      },
    ],
  };

  // Yearly monthly breakdown data
  const yearlyMonthlyData = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ], // Months of the year
    datasets: [
      {
        label: 'Total Payment',
        data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 50000) + 10000),
        backgroundColor: '#4C51BF',
      },
      {
        label: 'Online Payment',
        data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 30000) + 5000),
        backgroundColor: '#4299E1',
      },
      {
        label: 'Onsite Payment',
        data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 20000) + 3000),
        backgroundColor: '#ECC94B',
      },
      {
        label: '3rd Party Payment',
        data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 15000) + 2000),
        backgroundColor: '#38A169',
      },
    ],
  };

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

  // Chart data for daily, monthly, yearly, and all-time
  const dailyData = {
    labels: ['Total Payment', 'Online Payment', 'Onsite Payment', '3rd Party Payment'],
    datasets: [
      {
        label: 'Daily Payments',
        data: [paymentData.daily.total, paymentData.daily.online, paymentData.daily.onsite, paymentData.daily.thirdParty],
        backgroundColor: ['#4C51BF', '#4299E1', '#ECC94B', '#38A169'],
        borderRadius: 8,
      },
    ],
  };

  const monthlyData = {
    labels: ['Total Payment', 'Online Payment', 'Onsite Payment', '3rd Party Payment'],
    datasets: [
      {
        label: 'Monthly Payments',
        data: [paymentData.monthly.total, paymentData.monthly.online, paymentData.monthly.onsite, paymentData.monthly.thirdParty],
        backgroundColor: ['#4C51BF', '#4299E1', '#ECC94B', '#38A169'],
        borderRadius: 8,
      },
    ],
  };

  const yearlyData = {
    labels: ['Total Payment', 'Online Payment', 'Onsite Payment', '3rd Party Payment'],
    datasets: [
      {
        label: 'Yearly Payments',
        data: [paymentData.yearly.total, paymentData.yearly.online, paymentData.yearly.onsite, paymentData.yearly.thirdParty],
        backgroundColor: ['#4C51BF', '#4299E1', '#ECC94B', '#38A169'],
        borderRadius: 8,
      },
    ],
  };

  const allTimeData = {
    labels: ['Total Payment', 'Online Payment', 'Onsite Payment', '3rd Party Payment'],
    datasets: [
      {
        label: 'All Time Payments',
        data: [paymentData.alltime.total, paymentData.alltime.online, paymentData.alltime.onsite, paymentData.alltime.thirdParty],
        backgroundColor: ['#4C51BF', '#4299E1', '#ECC94B', '#38A169'],
        borderRadius: 8,
      },
    ],
  };

  // Get pie chart data based on selected period
  const getPieData = () => ({
    labels: ['Online Payment', 'Onsite Payment', '3rd Party Payment'],
    datasets: [
      {
        data: [paymentData[selectedPeriod].online, paymentData[selectedPeriod].onsite, paymentData[selectedPeriod].thirdParty],
        backgroundColor: ['#4299E1', '#ECC94B', '#38A169'],
        borderRadius: 8,
      },
    ],
  });

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
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
          <option value="alltime">All Time</option>
        </select>
      </div>

      {/* Display charts based on selected period */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-xl shadow-xl">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
            {selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)} Payment Statistics
          </h2>
          <div className="h-72">
            <Bar
              data={
                selectedPeriod === 'daily'
                  ? dailyData
                  : selectedPeriod === 'monthly'
                  ? monthlyData
                  : selectedPeriod === 'yearly'
                  ? yearlyData
                  : allTimeData
              }
              options={chartOptions}
            />
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-xl shadow-xl">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Payment Distribution</h2>
          <div className="h-72 flex justify-center items-center">
            <Pie data={getPieData()} />
          </div>
        </div>
      </div>

      {/* Yearly Breakdown */}
      {selectedPeriod === 'yearly' && (
        <div className="bg-white p-4 rounded-xl shadow-xl mt-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Monthly Breakdown (This Year)</h2>
          <div className="h-96">
            <Bar data={yearlyMonthlyData} options={chartOptions} />
          </div>
        </div>
      )}

      {/* Monthly Breakdown */}
      {selectedPeriod === 'monthly' && (
        <div className="bg-white p-4 rounded-xl shadow-xl mt-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Daily Breakdown (This Month)</h2>
          <div className="h-96">
            <Bar data={monthlyDailyData} options={chartOptions} />
          </div>
        </div>
      )}

      {/* Summary Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-xl">
          <h3 className="text-lg font-semibold text-gray-700">Total Payment</h3>
          <p className="text-2xl font-bold text-gray-800">${paymentData[selectedPeriod].total.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-xl">
          <h3 className="text-lg font-semibold text-gray-700">Online Payment</h3>
          <p className="text-2xl font-bold text-gray-800">${paymentData[selectedPeriod].online.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-xl">
          <h3 className="text-lg font-semibold text-gray-700">Onsite Payment</h3>
          <p className="text-2xl font-bold text-gray-800">${paymentData[selectedPeriod].onsite.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-xl">
          <h3 className="text-lg font-semibold text-gray-700">3rd Party Payment</h3>
          <p className="text-2xl font-bold text-gray-800">${paymentData[selectedPeriod].thirdParty.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

export default Casher_Dashboard;