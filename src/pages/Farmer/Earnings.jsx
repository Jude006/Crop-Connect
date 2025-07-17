import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  FiDollarSign,
  FiTrendingUp,
  FiTrendingDown,
  FiCalendar,
  FiPieChart,
  FiBarChart2
} from 'react-icons/fi';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useNavigate } from 'react-router-dom';

Chart.register(...registerables);

const Earnings = () => {
  const [stats, setStats] = useState({
    totalEarnings: 0,
    thisMonth: 0,
    lastMonth: 0,
    pendingPayouts: 0,
    completedOrders: 0,
    cancelledOrders: 0
  });
  const [timeRange, setTimeRange] = useState('monthly');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchEarnings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/api/farmers/earnings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { range: timeRange }
      });

      setStats(response.data);
    } catch (err) {
      console.error("Earnings fetch error:", err);
      setError(err.response?.data?.error || err.message);
      toast.error(err.response?.data?.error || "Failed to load earnings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEarnings();
  }, [timeRange]);

  // Chart data
  const earningsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Earnings (₦)',
        data: [150000, 180000, 210000, 190000, 220000, 240000, 230000],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  const productDistributionData = {
    labels: ['Tomatoes', 'Peppers', 'Maize', 'Beans', 'Others'],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
        ],
        borderWidth: 1,
      },
    ],
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8 text-center">
        <FiTrendingDown className="mx-auto text-4xl text-red-500 mb-4" />
        <h3 className="text-lg font-medium mb-2">Error Loading Earnings</h3>
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={fetchEarnings}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Earnings Overview</h1>
        
        <div className="relative">
          <select
            className="appearance-none bg-white border rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="weekly">This Week</option>
            <option value="monthly">This Month</option>
            <option value="yearly">This Year</option>
          </select>
          <FiCalendar className="absolute right-3 top-3 text-gray-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Earnings</p>
              <p className="text-3xl font-bold">₦{stats.totalEarnings?.toLocaleString() || '0'}</p>
            </div>
            <FiDollarSign className="text-4xl text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">This Month</p>
              <p className="text-3xl font-bold">₦{stats.thisMonth?.toLocaleString() || '0'}</p>
            </div>
            <FiTrendingUp className="text-4xl text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Pending Payouts</p>
              <p className="text-3xl font-bold">₦{stats.pendingPayouts?.toLocaleString() || '0'}</p>
            </div>
            <FiTrendingDown className="text-4xl text-yellow-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Earnings Trend</h3>
            <FiBarChart2 className="text-gray-400" />
          </div>
          <div className="h-64">
            <Bar 
              data={earningsData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: function(value) {
                        return '₦' + value.toLocaleString();
                      }
                    }
                  }
                }
              }}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Product Distribution</h3>
            <FiPieChart className="text-gray-400" />
          </div>
          <div className="h-64">
            <Pie 
              data={productDistributionData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-medium mb-4">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[1, 2, 3, 4, 5].map((item) => (
                <tr key={item}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#ORD-{Math.random().toString(36).substr(2, 6).toUpperCase()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date().toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₦{(Math.random() * 10000 + 5000).toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item % 3 === 0 ? 'bg-green-100 text-green-800' : 
                      item % 2 === 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {item % 3 === 0 ? 'Completed' : item % 2 === 0 ? 'Pending' : 'Processing'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Earnings;