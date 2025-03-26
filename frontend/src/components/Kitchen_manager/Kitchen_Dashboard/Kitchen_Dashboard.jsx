import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

function Kitchen_Dashboard() {
  // Daily Orders Data
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

  // Monthly Orders Data
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

  // Generate Overall Data (Last 30 Days)
  const generateOverallData = () => {
    const days = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);
    const totalOrders = Array.from({ length: 30 }, () => Math.floor(Math.random() * 50) + 80);
    const onlineOrders = Array.from({ length: 30 }, () => Math.floor(Math.random() * 20) + 30);
    const onsiteOrders = Array.from({ length: 30 }, () => Math.floor(Math.random() * 15) + 25);
    const thirdPartyOrders = Array.from({ length: 30 }, () => Math.floor(Math.random() * 10) + 20);

    return {
      labels: days,
      datasets: [
        { label: 'Total Orders', data: totalOrders, backgroundColor: '#4C51BF' },
        { label: 'Online Orders', data: onlineOrders, backgroundColor: '#4299E1' },
        { label: 'Onsite Orders', data: onsiteOrders, backgroundColor: '#ECC94B' },
        { label: '3rd Party Orders', data: thirdPartyOrders, backgroundColor: '#38A169' },
      ],
    };
  };

  const overallData = generateOverallData();

  // Pie Chart Data (Online vs Onsite vs 3rd Party Ratio for Last 30 Days)
  const totalOnline = 450;
  const totalOnsite = 320;
  const totalThirdParty = 480;

  const pieData = {
    labels: ["Online Orders", "Onsite Orders", "3rd Party Orders"],
    datasets: [
      {
        data: [totalOnline, totalOnsite, totalThirdParty],
        backgroundColor: ['#4299E1', '#ECC94B', '#38A169'],
        borderWidth: 2,
      },
    ],
  };

  // Generate Yearly Data (12 months)
  const generateYearlyData = () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const totalOrders = Array.from({ length: 12 }, () => Math.floor(Math.random() * 200) + 100);
    const onlineOrders = Array.from({ length: 12 }, () => Math.floor(Math.random() * 80) + 50);
    const onsiteOrders = Array.from({ length: 12 }, () => Math.floor(Math.random() * 60) + 30);
    const thirdPartyOrders = Array.from({ length: 12 }, () => Math.floor(Math.random() * 50) + 20);

    return {
      labels: months,
      datasets: [
        { label: 'Total Orders', data: totalOrders, backgroundColor: '#4C51BF' },
        { label: 'Online Orders', data: onlineOrders, backgroundColor: '#4299E1' },
        { label: 'Onsite Orders', data: onsiteOrders, backgroundColor: '#ECC94B' },
        { label: '3rd Party Orders', data: thirdPartyOrders, backgroundColor: '#38A169' },
      ],
    };
  };

  const yearlyData = generateYearlyData();

  // Pie Chart for Yearly Data (Online vs Onsite vs Delivery for the Year)
  const yearlyOnline = 1000;
  const yearlyOnsite = 750;
  const yearlyThirdParty = 600;

  const yearlyPieData = {
    labels: ["Online Orders", "Onsite Orders", "3rd Party Orders"],
    datasets: [
      {
        data: [yearlyOnline, yearlyOnsite, yearlyThirdParty],
        backgroundColor: ['#4299E1', '#ECC94B', '#38A169'],
        borderWidth: 2,
      },
    ],
  };

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

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Kitchen Dashboard</h1>

      {/* Pending, Served, Assigned, Delivered Orders (Top) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
        {["Pending Orders", "Assigned Orders", "Served Orders", "Delivered Orders"].map((label, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md text-center">
            <h2 className="text-md font-semibold text-gray-700">{label}</h2>
            <p className="text-3xl font-extrabold text-blue-600 mt-2">{dailyData.datasets[0].data[index + 4]}</p>
          </div>
        ))}
      </div>

      {/* Daily & Monthly Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Daily Orders Chart */}
        <div className="bg-white p-4 rounded-xl shadow-xl">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Daily Order Statistics</h2>
          <div className="h-72">
            <Bar data={dailyData} options={chartOptions} />
          </div>
        </div>

        {/* Monthly Orders Chart */}
        <div className="bg-white p-4 rounded-xl shadow-xl">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Monthly Order Statistics</h2>
          <div className="h-72">
            <Bar data={monthlyData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Other Order Stats (Under Daily Chart) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
        {dailyData.labels.slice(0, 4).map((label, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md text-center">
            <h2 className="text-md font-semibold text-gray-700">{label}</h2>
            <p className="text-3xl font-extrabold text-blue-600 mt-2">{dailyData.datasets[0].data[index]}</p>
          </div>
        ))}
      </div>

      {/* Overall Graph & Pie Chart Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
  {/* Overall Graph */}
  <div
    className="bg-white p-4 rounded-xl shadow-xl"
    style={{ width: 'auto' }} // Set to 65% of the width
  >
    <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
      Overall Order Trends (Last 30 Days)
    </h2>
    <div className="h-80">
      <Bar data={overallData} options={chartOptions} />
    </div>
  </div>

  {/* Pie Chart */}
  <div
    className="bg-white p-4 rounded-xl shadow-xl"
    style={{ width: 'auto' }} // Set to 35% of the width
  >
    <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
      Order Distribution (Last 30 Days)
    </h2>
    <div className="h-80 flex justify-center items-center">
      <Pie data={pieData} />
    </div>
  </div>
</div>


      {/* Yearly Report */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Yearly Report</h2>
       
        {/* Yearly Totals */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h2 className="text-md font-semibold text-gray-700">Yearly Total Orders</h2>
            <p className="text-3xl font-extrabold text-blue-600 mt-2">{yearlyData.datasets[0].data.reduce((acc, val) => acc + val, 0)}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h2 className="text-md font-semibold text-gray-700">Yearly Online Orders</h2>
            <p className="text-3xl font-extrabold text-blue-600 mt-2">{yearlyData.datasets[1].data.reduce((acc, val) => acc + val, 0)}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h2 className="text-md font-semibold text-gray-700">Yearly Onsite Orders</h2>
            <p className="text-3xl font-extrabold text-blue-600 mt-2">{yearlyData.datasets[2].data.reduce((acc, val) => acc + val, 0)}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h2 className="text-md font-semibold text-gray-700">Yearly 3rd Party Orders</h2>
            <p className="text-3xl font-extrabold text-blue-600 mt-2">{yearlyData.datasets[3].data.reduce((acc, val) => acc + val, 0)}</p>
          </div>
        </div>
         {/* Overall Graph & Pie Chart Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Yearly Bar Chart */}
        <div className="bg-white p-4 rounded-xl shadow-xl" style={{ width: 'auto' }}>
          <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">Order Trends (12 Months)</h3>
          <div className="h-80">
            <Bar data={yearlyData} options={chartOptions} />
          </div>
        </div>

        {/* Yearly Pie Chart */}
        <div className="bg-white p-4 rounded-xl shadow-xl" style={{ width: 'auto' }}>
          <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">Yearly Order Distribution</h3>
          <div className="h-80 flex justify-center items-center">
            <Pie data={yearlyPieData} />
          </div>
        </div>
       </div>
        
      </div>
    </div>
  );
}

export default Kitchen_Dashboard;
