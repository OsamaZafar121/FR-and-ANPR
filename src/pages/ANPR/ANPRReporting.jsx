import React from 'react';
import { Bar } from 'react-chartjs-2'; // Changed from Line to Bar
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement, // Added BarElement
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement, // Register BarElement
  Title,
  Tooltip,
  Legend
);

function ANPRReporting() {
  // Chart data - modified for bar chart
  const chartData = {
    labels: ['10:00', '12:00', '14:00', '16:00', '18:00', '19:00', '19:30'],
    datasets: [
      {
        label: 'Detected Vehicles',
        data: [12, 19, 15, 27, 23, 7, 5],
        backgroundColor: 'rgba(16, 19, 218, 0.7)', // Solid color for bars
        borderWidth: 1,
        borderRadius: 4, // Rounded corners for bars
      },
      {
        label: 'UnDetected Vehicles',
        data: [2, 3, 1, 4, 2, 0, 0],
        backgroundColor: 'rgba(65, 180, 237, 0.7)', // Solid color for bars
        borderWidth: 1,
        borderRadius: 4, // Rounded corners for bars
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'ANPR Recognition Over Time',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Vehicles',
        },
        grid: {
          display: true,
          drawBorder: false,
        },
      },
      x: {
        title: {
          display: true,
          text: 'Time',
        },
        grid: {
          display: false,
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  };

  return (
    <div className="max-w-6xl mx-auto p-5 bg-gray-50 rounded-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">System Statistics</h1>
      </div>

      <div className="flex justify-between mb-6">
        <div className="bg-white p-4 rounded shadow-sm flex-1 mx-2">
          <h3 className="text-gray-700">Total Detections: 7</h3>
        </div>
        <div className="bg-white p-4 rounded shadow-sm flex-1 mx-2">
          <h3 className="text-gray-700">Recognition Accuracy: 97.5%</h3>
        </div>
        <div className="bg-white p-4 rounded shadow-sm flex-1 mx-2">
          <h3 className="text-gray-700">Unknown Vehicles: 0</h3>
        </div>
      </div>

      {/* Chart Section - Now using Bar instead of Line */}
      <div className="bg-white p-5 rounded shadow-sm mb-6 h-[70vh] w-full">
        <div className="h-full w-full">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

        <div className="flex justify-center mb-6">
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-medium shadow-md transition-all duration-300 transform hover:scale-105">
            Download Report <span className="ml-2">🌟</span>
          </button>
        </div>

      <div className="bg-white p-5 rounded shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Detected Vehicles</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-left font-medium text-gray-700">ID</th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">Name</th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">Confidence</th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">TimeStamp</th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">Status</th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4">6</td>
                <td className="py-3 px-4">john</td>
                <td className="py-3 px-4">92.6%</td>
                <td className="py-3 px-4">19:24:12</td>
                <td className="py-3 px-4">Verified</td>
                <td className="py-3 px-4">
                  <span className="text-green-500 cursor-pointer text-xl">✔</span>
                  <span className="text-red-500 cursor-pointer text-xl ml-2">✘</span>
                </td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4">5</td>
                <td className="py-3 px-4">clark</td>
                <td className="py-3 px-4">90.2%</td>
                <td className="py-3 px-4">19:24:10</td>
                <td className="py-3 px-4">Verified</td>
                <td className="py-3 px-4">
                  <span className="text-green-500 cursor-pointer text-xl">✔</span>
                  <span className="text-red-500 cursor-pointer text-xl ml-2">✘</span>
                </td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4">4</td>
                <td className="py-3 px-4">jenny</td>
                <td className="py-3 px-4">88.5%</td>
                <td className="py-3 px-4">19:24:09</td>
                <td className="py-3 px-4">Verified</td>
                <td className="py-3 px-4">
                  <span className="text-green-500 cursor-pointer text-xl">✔</span>
                  <span className="text-red-500 cursor-pointer text-xl ml-2">✘</span>
                </td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4">3</td>
                <td className="py-3 px-4">hurry</td>
                <td className="py-3 px-4">97%</td>
                <td className="py-3 px-4">19:24:08</td>
                <td className="py-3 px-4">Spoof Attempt</td>
                <td className="py-3 px-4">
                  <span className="text-green-500 cursor-pointer text-xl">✔</span>
                  <span className="text-red-500 cursor-pointer text-xl ml-2">✘</span>
                </td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4">2</td>
                <td className="py-3 px-4">chris</td>
                <td className="py-3 px-4">93.9%</td>
                <td className="py-3 px-4">19:24:06</td>
                <td className="py-3 px-4">Verified</td>
                <td className="py-3 px-4">
                  <span className="text-green-500 cursor-pointer text-xl">✔</span>
                  <span className="text-red-500 cursor-pointer text-xl ml-2">✘</span>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-4">1</td>
                <td className="py-3 px-4">both</td>
                <td className="py-3 px-4">94.5%</td>
                <td className="py-3 px-4">19:24:03</td>
                <td className="py-3 px-4">Spoof Attempt</td>
                <td className="py-3 px-4">
                  <span className="text-green-500 cursor-pointer text-xl">✔</span>
                  <span className="text-red-500 cursor-pointer text-xl ml-2">✘</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ANPRReporting
