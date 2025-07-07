import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBoxOpen,
  FaMoneyBillWave,
  FaClipboardList,
  FaChartLine,
  FaLeaf,
  FaTruck,
  FaPlus,
  FaUser,
  FaShoppingBag,
  FaCalendarAlt
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthProvider";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { format } from 'date-fns';
import { toast } from "react-toastify";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const cardHover = {
  scale: 1.03,
  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
  transition: {
    duration: 0.3,
  },
};

const Overview = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeOrders: 0,
    totalEarnings: 0,
    totalCustomers: 0
  });
  const [salesData, setSalesData] = useState([]);
  const [productDistribution, setProductDistribution] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

  // Create axios instance with interceptors
  const api = axios.create({
    baseURL: API_BASE_URL,
  });

  // Add request interceptor to attach token
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  // Add response interceptor to handle errors
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        logout();
        navigate("/auth/login");
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // First verify token and farmer status
        const verifyRes = await api.get('/api/farmers/verify-farmer');
        if (!verifyRes.data.isFarmer) {
          throw new Error("Farmer verification failed");
        }

        // Then fetch all data
        const [statsRes, salesRes, productsRes, ordersRes] = await Promise.all([
          api.get('/api/farmers/dashboard-stats'),
          api.get('/api/farmers/sales-performance'),
          api.get('/api/farmers/product-distribution'),
          api.get('/api/farmers/dashboard-stats') // This already includes recentOrders
        ]);

        setStats(statsRes.data);
        setSalesData(salesRes.data);
        setProductDistribution(productsRes.data);
        setRecentOrders(statsRes.data.recentOrders || []);

      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.response?.data?.message || err.message);
        toast.error(err.response?.data?.error || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper function for status badges
  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: "bg-yellow-100 text-yellow-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
      shipped: "bg-blue-100 text-blue-800"
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  // Process sales data for chart
  const salesChartData = {
    labels: salesData.map(item => item.month),
    datasets: [
      {
        label: 'Sales (₦)',
        data: salesData.map(item => item.sales),
        backgroundColor: 'rgba(74, 222, 128, 0.8)',
      }
    ]
  };

  // Process product distribution for chart
  const productDistributionChartData = {
    labels: productDistribution.map(item => item.category),
    datasets: [
      {
        data: productDistribution.map(item => item.count),
        backgroundColor: [
          'rgba(74, 222, 128, 0.8)',
          'rgba(249, 115, 22, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(168, 85, 247, 0.8)'
        ],
      }
    ]
  };

  // Stats cards data
  const statsCards = [
    {
      id: 1,
      title: "Total Products",
      value: stats.totalProducts,
      icon: <FaBoxOpen />,
      color: "bg-blue-100 text-blue-800",
      link: "/farmer-dashboard/products"
    },
    {
      id: 2,
      title: "Active Orders",
      value: stats.activeOrders,
      icon: <FaClipboardList />,
      color: "bg-purple-100 text-purple-800",
      link: "/farmer-dashboard/orders"
    },
    {
      id: 3,
      title: "Total Earnings",
      value: `₦${stats.totalEarnings?.toLocaleString() || '0'}`,
      icon: <FaMoneyBillWave />,
      color: "bg-green-100 text-green-800",
      link: "/farmer-dashboard/earnings"
    },
    {
      id: 4,
      title: "Total Customers",
      value: stats.totalCustomers,
      icon: <FaUser />,
      color: "bg-orange-100 text-orange-800",
      link: "/farmer-dashboard/customers"
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="bg-white rounded-xl shadow-sm p-6 max-w-md mx-auto">
          <div className="text-red-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2">Error Loading Dashboard</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-4 md:p-6 lg:p-8 min-h-screen bg-gray-50"
    >
      {/* Welcome Section */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Welcome back,{" "}
              <span className="text-primary">
                {user?.fullName || "Farmer"}
              </span>
            </h1>
            <p className="text-gray-600">
              Here's your farming overview for today
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-sm bg-white p-3 rounded-lg shadow-sm border border-gray-100">
            <span className="text-gray-500">Today is</span>{" "}
            {format(new Date(), 'EEEE, MMMM do yyyy')}
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {statsCards.map((stat) => (
          <motion.div
            key={stat.id}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
          >
            <Link to={stat.link} className="block">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{stat.title}</p>
                  <p className="text-2xl md:text-3xl font-bold text-gray-800 mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  {React.cloneElement(stat.icon, {
                    className: "text-xl"
                  })}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Sales Performance */}
        <motion.div 
          variants={itemVariants} 
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <FaChartLine className="text-primary" /> Sales Performance
            </h2>
            <Link
              to="/farmer-dashboard/earnings"
              className="text-primary hover:underline flex items-center gap-1 text-sm"
            >
              View details
            </Link>
          </div>
          
          <div className="h-64">
            <Bar 
              data={salesChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        return `₦${context.raw.toLocaleString()}`;
                      }
                    }
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: function(value) {
                        return `₦${value.toLocaleString()}`;
                      }
                    }
                  }
                }
              }}
            />
          </div>
        </motion.div>

        {/* Product Distribution */}
        <motion.div 
          variants={itemVariants}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <FaShoppingBag className="text-primary" /> Product Distribution
            </h2>
            <Link
              to="/farmer-dashboard/products"
              className="text-primary hover:underline flex items-center gap-1 text-sm"
            >
              View all
            </Link>
          </div>

          <div className="h-64">
            <Pie 
              data={productDistributionChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right',
                  },
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        return `${context.label}: ${context.raw} products`;
                      }
                    }
                  }
                }
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Recent Orders and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-xl shadow-sm border border-gray-100 lg:col-span-2"
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaClipboardList className="text-primary" /> Recent Orders
              </h2>
              <Link
                to="/farmer-dashboard/orders"
                className="text-primary hover:underline flex items-center gap-1 text-sm"
              >
                View all
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <motion.tr
                      key={order._id}
                      whileHover={{ backgroundColor: "rgba(74, 222, 128, 0.05)" }}
                      className="transition-colors duration-200"
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        <Link to={`/farmer-dashboard/orders/${order._id}`} className="text-primary hover:underline">
                          #{order._id.slice(-6).toUpperCase()}
                        </Link>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {format(new Date(order.createdAt), 'MMM dd, yyyy')}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        ₦{order.totalPrice?.toLocaleString() || '0'}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {getStatusBadge(order.status)}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {recentOrders.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No recent orders found
              </div>
            )}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants}>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <FaLeaf className="text-primary" /> Quick Actions
            </h2>
            <div className="space-y-4">
              <motion.div
                whileHover={cardHover}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:border-primary transition-all"
              >
                <Link
                  to="/farmer-dashboard/products/add"
                  className="flex items-center gap-4 p-2"
                >
                  <div className="bg-primary bg-opacity-10 p-3 rounded-full">
                    <FaPlus className="text-primary text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Add New Product
                    </h3>
                    <p className="text-gray-500 text-sm">
                      List your farm products
                    </p>
                  </div>
                </Link>
              </motion.div>

              <motion.div
                whileHover={cardHover}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:border-primary transition-all"
              >
                <Link
                  to="/farmer-dashboard/orders"
                  className="flex items-center gap-4 p-2"
                >
                  <div className="bg-primary bg-opacity-10 p-3 rounded-full">
                    <FaClipboardList className="text-primary text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Manage Orders
                    </h3>
                    <p className="text-gray-500 text-sm">
                      View and update orders
                    </p>
                  </div>
                </Link>
              </motion.div>

              <motion.div
                whileHover={cardHover}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:border-primary transition-all"
              >
                <Link
                  to="/farmer-dashboard/earnings"
                  className="flex items-center gap-4 p-2"
                >
                  <div className="bg-primary bg-opacity-10 p-3 rounded-full">
                    <FaMoneyBillWave className="text-primary text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      View Earnings
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Check your sales performance
                    </p>
                  </div>
                </Link>
              </motion.div>

              <motion.div
                whileHover={cardHover}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:border-primary transition-all"
              >
                <Link
                  to="/farmer-dashboard/settings"
                  className="flex items-center gap-4 p-2"
                >
                  <div className="bg-primary bg-opacity-10 p-3 rounded-full">
                    <FaTruck className="text-primary text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Delivery Settings
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Update your delivery options
                    </p>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Calendar Widget */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaCalendarAlt className="text-primary" /> Upcoming Tasks
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="bg-blue-100 text-blue-800 p-2 rounded-full">
                  <FaTruck className="text-sm" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Order Delivery</h4>
                  <p className="text-gray-500 text-xs">Tomorrow, 10:00 AM</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                <div className="bg-yellow-100 text-yellow-800 p-2 rounded-full">
                  <FaLeaf className="text-sm" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Harvest Season</h4>
                  <p className="text-gray-500 text-xs">Next week</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <div className="bg-green-100 text-green-800 p-2 rounded-full">
                  <FaShoppingBag className="text-sm" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Inventory Check</h4>
                  <p className="text-gray-500 text-xs">Every Friday</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Overview;