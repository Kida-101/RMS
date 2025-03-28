import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

function Kitchen_Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('daily'); // State to manage the selected period

  const dailyData = {
  labels: ["Total Orders", "Online Orders", "Onsite Orders", "3rd Party Orders", "Pending Orders", "Assigned Orders", "Served Orders", "Delivered Orders"],
  datasets: [
    {
      label: 'Daily Orders',
      data: [120, 50, 30, 40, 25, 20, 15, 10],
      backgroundColor: ['#4C51BF', '#4299E1', '#ECC94B', '#38A169', '#ED8936', '#5A67D8', '#48BB78', '#319795'],
      borderRadius: 8,
    },
  ],
};

const monthlyData = {
  labels: ["Total Orders", "Online Orders", "Onsite Orders", "3rd Party Orders"],
  datasets: [
    {
      label: 'Monthly Orders',
      data: [1200, 450, 320, 480],
      backgroundColor: ['#4C51BF', '#4299E1', '#ECC94B', '#38A169'],
      borderRadius: 8,
    },
  ],
};

const yearlyData = {
  labels: ["Total Orders", "Online Orders", "Onsite Orders", "3rd Party Orders"],
  datasets: [
    {
      label: 'Yearly Orders',
      data: [14000, 5400, 3800, 5000],
      backgroundColor: ['#4C51BF', '#4299E1', '#ECC94B', '#38A169'],
      borderRadius: 8,
    },
  ],
};

const allTimeData = {
  labels: ["Total Orders", "Online Orders", "Onsite Orders", "3rd Party Orders"],
  datasets: [
    {
      label: 'All Time Orders',
      data: [50000, 18000, 12000, 15000],
      backgroundColor: ['#4C51BF', '#4299E1', '#ECC94B', '#38A169'],
      borderRadius: 8,
    },
  ],
};

// Create ordersData based on the dataset
const ordersData = {
  daily: {
    total: dailyData.datasets[0].data[0],
    online: dailyData.datasets[0].data[1],
    onsite: dailyData.datasets[0].data[2],
    thirdParty: dailyData.datasets[0].data[3],
    pending: dailyData.datasets[0].data[4],
    assigned: dailyData.datasets[0].data[5],
    served: dailyData.datasets[0].data[6],
    delivered: dailyData.datasets[0].data[7],
  },
  monthly: {
    total: monthlyData.datasets[0].data[0],
    online: monthlyData.datasets[0].data[1],
    onsite: monthlyData.datasets[0].data[2],
    thirdParty: monthlyData.datasets[0].data[3],
  },
  yearly: {
    total: yearlyData.datasets[0].data[0],
    online: yearlyData.datasets[0].data[1],
    onsite: yearlyData.datasets[0].data[2],
    thirdParty: yearlyData.datasets[0].data[3],
  },
  alltime: {
    total: allTimeData.datasets[0].data[0],
    online: allTimeData.datasets[0].data[1],
    onsite: allTimeData.datasets[0].data[2],
    thirdParty: allTimeData.datasets[0].data[3],
  },
};


  // Monthly Daily Breakdown Data (New Chart)
  const monthlyDailyData = {
    labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
    datasets: [
      { label: 'Total Orders', data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 50) + 10), backgroundColor: '#4C51BF' },
      { label: 'Online Orders', data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 20) + 5), backgroundColor: '#4299E1' },
      { label: 'Onsite Orders', data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 15) + 5), backgroundColor: '#ECC94B' },
      { label: '3rd Party Orders', data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 10) + 5), backgroundColor: '#38A169' },
    ],
  };

  // Monthly Breakdown Data (For the Year)
  const yearlyMonthlyData = {
    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    datasets: [
      { label: 'Total Orders', data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 1000) + 100), backgroundColor: '#4C51BF' },
      { label: 'Online Orders', data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 500) + 50), backgroundColor: '#4299E1' },
      { label: 'Onsite Orders', data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 300) + 50), backgroundColor: '#ECC94B' },
      { label: '3rd Party Orders', data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 400) + 50), backgroundColor: '#38A169' },
    ],
  };

  // Pie Chart Data (Online vs Onsite vs 3rd Party Ratio for Last 30 Days)
 const getPieData = () => {
  let data;
  if (selectedPeriod === "daily") data = [50, 30, 40];
  else if (selectedPeriod === "monthly") data = [450, 320, 480];
  else if (selectedPeriod === "yearly") data = [5400, 3800, 5000];
  else if (selectedPeriod === "alltime") data = [18000, 12000, 15000];

  return {
    labels: ["Online Orders", "Onsite Orders", "3rd Party Orders"],
    datasets: [
      {
        data: data,
        backgroundColor: ['#4299E1', '#ECC94B', '#38A169'],
        borderWidth: 2,
      },
    ],
  };
};


  // Chart Options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw} orders`,
        },
      },
    },
    scales: {
      x: { title: { display: true, text: 'Categories' } },
      y: { title: { display: true, text: 'Count' }, beginAtZero: true },
    },
  };

  // Handle the period selection change
  const handlePeriodChange = (e) => {
    setSelectedPeriod(e.target.value);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header with Kitchen Manager Title and Filter Dropdown */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800">Kitchen Manager</h1>
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
        {selectedPeriod === 'daily' && (
          <>
            {/* Daily Orders Chart */}
            <div className="bg-white p-4 rounded-xl shadow-xl">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Daily Order Statistics</h2>
              <div className="h-72">
                <Bar data={dailyData} options={chartOptions} />
              </div>
            </div>
            {/* Pie Chart */}
            <div className="bg-white p-4 rounded-xl shadow-xl">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Order Distribution</h2>
              <div className="h-72 flex justify-center items-center">
                <Pie data={getPieData()} />
              </div>
            </div>
          </>
        )}

        {selectedPeriod === 'monthly' && (
          <>
            {/* Monthly Orders Chart */}
            <div className="bg-white p-4 rounded-xl shadow-xl">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Monthly Order Statistics</h2>
              <div className="h-72">
                <Bar data={monthlyData} options={chartOptions} />
              </div>
            </div>
            {/* Pie Chart for Monthly Orders */}
            <div className="bg-white p-4 rounded-xl shadow-xl">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Order Distribution </h2>
              <div className="h-72 flex justify-center items-center">
                <Pie data={getPieData()} />
              </div>
            </div>
          </>
        )}

        {selectedPeriod === 'yearly' && (
          <>
            {/* Yearly Orders Chart */}
            <div className="bg-white p-4 rounded-xl shadow-xl">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Yearly Order Statistics</h2>
              <div className="h-72">
                <Bar data={yearlyData} options={chartOptions} />
              </div>
            </div>
            {/* Pie Chart for Yearly Orders */}
            <div className="bg-white p-4 rounded-xl shadow-xl">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Order Distribution </h2>
              <div className="h-72 flex justify-center items-center">
                <Pie data={getPieData()} />
              </div>
            </div>
          </>
        )}

        {selectedPeriod === 'alltime' && (
          <>
            {/* All-Time Orders Chart */}
            <div className="bg-white p-4 rounded-xl shadow-xl">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">All Time Order Statistics</h2>
              <div className="h-72">
                <Bar data={allTimeData} options={chartOptions} />
              </div>
            </div>
            {/* Pie Chart for All-Time Orders */}
            <div className="bg-white p-4 rounded-xl shadow-xl">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Order Distribution (All Time)</h2>
              <div className="h-72 flex justify-center items-center">
                <Pie data={getPieData()} />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Monthly Breakdown (Full width at the bottom for Yearly View) */}
      {selectedPeriod === 'yearly' && (
        <div className="bg-white p-4 rounded-xl shadow-xl mt-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Monthly Breakdown (This Year)</h2>
          <div className="h-96">
            <Bar data={yearlyMonthlyData} options={chartOptions} />
          </div>
        </div>
      )}

      {/* Monthly Breakdown (Full width at the bottom for Monthly View) */}
      {selectedPeriod === 'monthly' && (
        <div className="bg-white p-4 rounded-xl shadow-xl mt-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Daily Breakdown (This Month)</h2>
          <div className="h-96">
            <Bar data={monthlyDailyData} options={chartOptions} />
          </div>
        </div>
      )}
      {/* Display data based on selected period */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6 pb-10 w-full">
  {/* For Daily */}
  {selectedPeriod === 'daily' && (
    <>
      <div className="bg-white p-4 rounded-xl shadow-xl">
        <h3 className="text-xl font-semibold text-gray-700">Total Orders</h3>
        <p className="text-2xl font-bold">{ordersData[selectedPeriod].total}</p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-xl">
        <h3 className="text-xl font-semibold text-gray-700">Online Orders</h3>
        <p className="text-2xl font-bold">{ordersData[selectedPeriod].online}</p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-xl">
        <h3 className="text-xl font-semibold text-gray-700">Onsite Orders</h3>
        <p className="text-2xl font-bold">{ordersData[selectedPeriod].onsite}</p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-xl">
        <h3 className="text-xl font-semibold text-gray-700">3rd Party Orders</h3>
        <p className="text-2xl font-bold">{ordersData[selectedPeriod].thirdParty}</p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-xl">
        <h3 className="text-xl font-semibold text-gray-700">Pending Orders</h3>
        <p className="text-2xl font-bold">{ordersData[selectedPeriod].pending}</p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-xl">
        <h3 className="text-xl font-semibold text-gray-700">Assigned Orders</h3>
        <p className="text-2xl font-bold">{ordersData[selectedPeriod].assigned}</p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-xl">
        <h3 className="text-xl font-semibold text-gray-700">Served Orders</h3>
        <p className="text-2xl font-bold">{ordersData[selectedPeriod].served}</p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-xl">
        <h3 className="text-xl font-semibold text-gray-700">Delivered Orders</h3>
        <p className="text-2xl font-bold">{ordersData[selectedPeriod].delivered}</p>
      </div>
    </>
  )}

  {/* For Monthly */}
  {selectedPeriod === 'monthly' && (
    <>
      <div className="bg-white p-4 rounded-xl shadow-xl">
        <h3 className="text-xl font-semibold text-gray-700">Total Orders</h3>
        <p className="text-2xl font-bold">{ordersData[selectedPeriod].total}</p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-xl">
        <h3 className="text-xl font-semibold text-gray-700">Online Orders</h3>
        <p className="text-2xl font-bold">{ordersData[selectedPeriod].online}</p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-xl">
        <h3 className="text-xl font-semibold text-gray-700">Onsite Orders</h3>
        <p className="text-2xl font-bold">{ordersData[selectedPeriod].onsite}</p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-xl">
        <h3 className="text-xl font-semibold text-gray-700">3rd Party Orders</h3>
        <p className="text-2xl font-bold">{ordersData[selectedPeriod].thirdParty}</p>
      </div>
    </>
  )}

  {/* For Yearly */}
  {selectedPeriod === 'yearly' && (
    <>
      <div className="bg-white p-4 rounded-xl shadow-xl">
        <h3 className="text-xl font-semibold text-gray-700">Total Orders</h3>
        <p className="text-2xl font-bold">{ordersData[selectedPeriod].total}</p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-xl">
        <h3 className="text-xl font-semibold text-gray-700">Online Orders</h3>
        <p className="text-2xl font-bold">{ordersData[selectedPeriod].online}</p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-xl">
        <h3 className="text-xl font-semibold text-gray-700">Onsite Orders</h3>
        <p className="text-2xl font-bold">{ordersData[selectedPeriod].onsite}</p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-xl">
        <h3 className="text-xl font-semibold text-gray-700">3rd Party Orders</h3>
        <p className="text-2xl font-bold">{ordersData[selectedPeriod].thirdParty}</p>
      </div>
    </>
  )}

  {/* For All Time */}
  {selectedPeriod === 'alltime' && (
    <>
      <div className="bg-white p-4 rounded-xl shadow-xl">
        <h3 className="text-xl font-semibold text-gray-700">Total Orders</h3>
        <p className="text-2xl font-bold">{ordersData[selectedPeriod].total}</p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-xl">
        <h3 className="text-xl font-semibold text-gray-700">Online Orders</h3>
        <p className="text-2xl font-bold">{ordersData[selectedPeriod].online}</p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-xl">
        <h3 className="text-xl font-semibold text-gray-700">Onsite Orders</h3>
        <p className="text-2xl font-bold">{ordersData[selectedPeriod].onsite}</p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-xl">
        <h3 className="text-xl font-semibold text-gray-700">3rd Party Orders</h3>
        <p className="text-2xl font-bold">{ordersData[selectedPeriod].thirdParty}</p>
      </div>
    </>
  )}
</div>

    </div>
  );
}

export default Kitchen_Dashboard;




 
 
      