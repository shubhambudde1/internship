import React from "react";
import { Bar, Pie, Doughnut, Line, PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
} from "chart.js";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale
);

const Analysis = () => {
  // 📌 Dummy Data
  const salesData = [5000, 7000, 8000, 6000, 9000, 10000]; // Monthly Sales (₹)
  const returnData = [300, 500, 400, 600, 700, 800]; // Monthly Returns (₹)
  const ordersData = [120, 140, 180, 160, 200, 230]; // Orders Per Month
  const categoryData = [
    { category: "Electronics", sales: 4000 },
    { category: "Clothing", sales: 3500 },
    { category: "Home Appliances", sales: 3000 },
    { category: "Books", sales: 2500 },
    { category: "Toys", sales: 2000 },
  ];
  const totalUsers = 5000; // Total Registered Users
  const buyingUsers = 3500; // Users who made purchases
  const revenue = 120000; // Total Revenue
  const roiData = [2, 3, 5, 6, 8, 12]; // ROI Growth %

  // 📊 Bar Chart (Sales vs Returns)
  const barChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      { label: "Sales (₹)", data: salesData, backgroundColor: "rgba(34, 197, 94, 0.6)" }, // Green
      { label: "Returns (₹)", data: returnData, backgroundColor: "rgba(239, 68, 68, 0.6)" }, // Red
    ],
  };

  // 🥧 Pie Chart (Category-wise Sales)
  const pieChartData = {
    labels: categoryData.map((c) => c.category),
    datasets: [
      {
        data: categoryData.map((c) => c.sales),
        backgroundColor: ["#60a5fa", "#34d399", "#facc15", "#f472b6", "#f87171"], // Tailwind Colors
      },
    ],
  };

  // 🍩 Doughnut Chart (Total Users vs Buying Users)
  const doughnutChartData = {
    labels: ["Buying Users", "Non-Buying Users"],
    datasets: [
      {
        data: [buyingUsers, totalUsers - buyingUsers],
        backgroundColor: ["#22c55e", "#f87171"], // Green & Red
      },
    ],
  };

  // 📈 Line Chart (ROI Growth Over Time)
  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "ROI (%)",
        data: roiData,
        borderColor: "#2563eb", // Tailwind Blue
        backgroundColor: "rgba(37, 99, 235, 0.2)",
        fill: true,
      },
    ],
  };

  // 📊 Orders Per Month (Polar Area Chart)
  const ordersChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Orders",
        data: ordersData,
        backgroundColor: ["#eab308", "#ef4444", "#3b82f6", "#14b8a6", "#a855f7", "#22c55e"], // Vibrant Colors
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">📊 Sales Analysis</h1>

      {/* 🔥 Top Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-semibold text-gray-700">Total Users</h2>
          <p className="text-2xl font-bold text-blue-600">{totalUsers}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-semibold text-gray-700">Revenue</h2>
          <p className="text-2xl font-bold text-green-600">₹{revenue.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-semibold text-gray-700">Total Orders</h2>
          <p className="text-2xl font-bold text-yellow-600">{ordersData.reduce((a, b) => a + b, 0)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-semibold text-gray-700">ROI Growth</h2>
          <p className="text-2xl font-bold text-indigo-600">{roiData[roiData.length - 1]}%</p>
        </div>
      </div>

      {/* 📊 Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">📈 Sales vs Returns</h2>
          <Bar data={barChartData} />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">🏷️ Category-wise Sales</h2>
          <Pie data={pieChartData} />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">👥 Users Overview</h2>
          <Doughnut data={doughnutChartData} />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">💰 ROI Over Time</h2>
          <Line data={lineChartData} />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">📦 Orders Per Month</h2>
          <PolarArea data={ordersChartData} />
        </div>
      </div>
    </div>
  );
};

export default Analysis;
