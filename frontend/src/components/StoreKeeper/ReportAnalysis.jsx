import React, { useState, useMemo } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ReportAnalysis = ({ stockData, disposedItems = [] }) => {
  const [timeRange, setTimeRange] = useState("all");
  const [chartType, setChartType] = useState("bar");

  // Filter data based on time range
  const filteredData = useMemo(() => {
    const currentDate = new Date();

    switch (timeRange) {
      case "daily":
        return stockData.filter((item) => {
          const itemDate = new Date(item.time);
          return (
            itemDate.getDate() === currentDate.getDate() &&
            itemDate.getMonth() === currentDate.getMonth() &&
            itemDate.getFullYear() === currentDate.getFullYear()
          );
        });

      case "weekly":
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        return stockData.filter((item) => {
          const itemDate = new Date(item.time);
          return itemDate >= oneWeekAgo && itemDate <= currentDate;
        });

      case "monthly":
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        return stockData.filter((item) => {
          const itemDate = new Date(item.time);
          return itemDate >= oneMonthAgo && itemDate <= currentDate;
        });

      case "yearly":
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        return stockData.filter((item) => {
          const itemDate = new Date(item.time);
          return itemDate >= oneYearAgo && itemDate <= currentDate;
        });

      default:
        return stockData;
    }
  }, [stockData, timeRange]);

  // Filter disposed items based on time range
  const filteredDisposedItems = useMemo(() => {
    const currentDate = new Date();

    switch (timeRange) {
      case "daily":
        return disposedItems.filter((item) => {
          const itemDate = new Date(item.time);
          return (
            itemDate.getDate() === currentDate.getDate() &&
            itemDate.getMonth() === currentDate.getMonth() &&
            itemDate.getFullYear() === currentDate.getFullYear()
          );
        });

      case "weekly":
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        return disposedItems.filter((item) => {
          const itemDate = new Date(item.time);
          return itemDate >= oneWeekAgo && itemDate <= currentDate;
        });

      case "monthly":
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        return disposedItems.filter((item) => {
          const itemDate = new Date(item.time);
          return itemDate >= oneMonthAgo && itemDate <= currentDate;
        });

      case "yearly":
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        return disposedItems.filter((item) => {
          const itemDate = new Date(item.time);
          return itemDate >= oneYearAgo && itemDate <= currentDate;
        });

      default:
        return disposedItems;
    }
  }, [disposedItems, timeRange]);

  // Calculate stats
  const statusData = {
    normal: filteredData.filter((item) => item.status === "normal").length,
    low: filteredData.filter((item) => item.status === "low").length,
    expired: filteredData.filter((item) => item.status === "expired").length,
    disposed: filteredDisposedItems.length,
  };

  // Get categories
  const categories = [...new Set(filteredData.map((item) => item.category))];

  // Generate monthly data
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const generateMonthlyData = () => {
    return {
      labels: months,
      datasets: categories.map((category) => {
        const categoryItems = filteredData.filter(
          (item) => item.category === category
        );
        return {
          label: category,
          data: months.map((_, month) =>
            categoryItems
              .filter((item) => new Date(item.time).getMonth() === month)
              .reduce((sum, item) => sum + item.quantity, 0)
          ),
          backgroundColor:
            category === "Electronics"
              ? "rgba(54, 162, 235, 0.6)"
              : category === "Chemicals"
              ? "rgba(255, 99, 132, 0.6)"
              : category === "oil"
              ? "rgba(255, 206, 86, 0.6)"
              : "rgba(153, 102, 255, 0.6)",
          borderColor:
            category === "Electronics"
              ? "rgba(54, 162, 235, 1)"
              : category === "Chemicals"
              ? "rgba(255, 99, 132, 1)"
              : category === "oil"
              ? "rgba(255, 206, 86, 1)"
              : "rgba(153, 102, 255, 1)",
          borderWidth: 1,
        };
      }),
    };
  };

  // Generate data for each mode
  const generateChartData = (mode) => {
    return {
      labels: categories,
      datasets: [
        {
          label: mode,
          data: categories.map((category) => {
            const categoryItems = filteredData.filter(
              (item) => item.category === category
            );
            switch (mode) {
              case "Quantity":
                return categoryItems.reduce(
                  (sum, item) => sum + item.quantity,
                  0
                );
              case "Expired":
                return categoryItems
                  .filter((item) => item.status === "expired")
                  .reduce((sum, item) => sum + item.quantity, 0);
              case "Disposed":
                return filteredDisposedItems.filter(
                  (item) => item.category === category
                ).length;
              case "Low Stock":
                return categoryItems
                  .filter((item) => item.status === "low")
                  .reduce((sum, item) => sum + item.quantity, 0);
              default:
                return 0;
            }
          }),
          backgroundColor: categories.map((category) =>
            category === "Electronics"
              ? "rgba(54, 162, 235, 0.6)"
              : category === "Chemicals"
              ? "rgba(255, 99, 132, 0.6)"
              : category === "oil"
              ? "rgba(255, 206, 86, 0.6)"
              : "rgba(153, 102, 255, 0.6)"
          ),
          borderColor: categories.map((category) =>
            category === "Electronics"
              ? "rgba(54, 162, 235, 1)"
              : category === "Chemicals"
              ? "rgba(255, 99, 132, 1)"
              : category === "oil"
              ? "rgba(255, 206, 86, 1)"
              : "rgba(153, 102, 255, 1)"
          ),
          borderWidth: 1,
        },
      ],
    };
  };

  // Status chart data with center text
  const statusChartData = {
    labels: ["Normal", "Low Stock", "Expired", "Disposed"],
    datasets: [
      {
        data: [
          statusData.normal,
          statusData.low,
          statusData.expired,
          statusData.disposed,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Custom Pie chart with center text
  const PieWithCenterText = ({ data }) => {
    return (
      <div style={{ position: "relative", height: "100%", width: "100%" }}>
        <Pie data={data} options={chartOptions} />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "24px", fontWeight: "bold" }}>
            {data.datasets[0].data.reduce((a, b) => a + b, 0)}
          </div>
          <div style={{ fontSize: "14px" }}>Total Items</div>
        </div>
      </div>
    );
  };

  // Render chart based on type
  const renderChart = (data) => {
    switch (chartType) {
      case "bar":
        return <Bar data={data} options={chartOptions} />;
      case "line":
        return <Line data={data} options={chartOptions} />;
      case "pie":
        return <PieWithCenterText data={data} />;
      default:
        return <Bar data={data} options={chartOptions} />;
    }
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: `Stock Analysis - ${
          timeRange.charAt(0).toUpperCase() + timeRange.slice(1)
        } View`,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Stock Analysis Dashboard
        </h2>
        <div className="flex space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="all">All Time</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="bar">Bar Chart</option>
            <option value="line">Line Chart</option>
            <option value="pie">Pie Chart</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-6">
        {/* Status chart moved to top */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 h-80">
          <h3 className="text-lg font-medium mb-2">Stock Status Overview</h3>
          {renderChart(statusChartData)}
        </div>

        {/* Category charts below */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200 h-80">
            <h3 className="text-lg font-medium mb-2">Quantity by Category</h3>
            {renderChart(generateChartData("Quantity"))}
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 h-80">
            <h3 className="text-lg font-medium mb-2">
              Expired Items by Category
            </h3>
            {renderChart(generateChartData("Expired"))}
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 h-80">
            <h3 className="text-lg font-medium mb-2">Disposals by Category</h3>
            {renderChart(generateChartData("Disposed"))}
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 h-80">
            <h3 className="text-lg font-medium mb-2">Low Stock by Category</h3>
            {renderChart(generateChartData("Low Stock"))}
          </div>
        </div>
        {/* Monthly trend chart */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 h-80">
          <h3 className="text-lg font-medium mb-2">
            Monthly Quantity by Category
          </h3>
          <Bar
            data={generateMonthlyData()}
            options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                title: {
                  ...chartOptions.plugins.title,
                  text: "Monthly Quantity Trend",
                },
              },
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h3 className="text-sm font-medium text-blue-600">Total Items</h3>
          <p className="text-2xl font-semibold text-blue-800">
            {filteredData.length}
          </p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
          <h3 className="text-sm font-medium text-yellow-600">Low Stock</h3>
          <p className="text-2xl font-semibold text-yellow-800">
            {statusData.low}
          </p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border border-red-100">
          <h3 className="text-sm font-medium text-red-600">Expired</h3>
          <p className="text-2xl font-semibold text-red-800">
            {statusData.expired}
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
          <h3 className="text-sm font-medium text-purple-600">Disposed</h3>
          <p className="text-2xl font-semibold text-purple-800">
            {filteredDisposedItems.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReportAnalysis;
