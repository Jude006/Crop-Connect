import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  FaBoxOpen,
  FaMoneyBillWave,
  FaClipboardList,
  FaChartLine,
  FaLeaf,
  FaTruck,
  FaPlus
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthProvider";

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
  const { user } = useAuth();

  const stats = [
    {
      id: 1,
      title: "Total Products",
      value: 24,
      icon: <FaBoxOpen />,
      link: "/farmer-dashboard/products"
    },
    {
      id: 2,
      title: "Active Orders",
      value: 8,
      icon: <FaClipboardList />,
      link: "/farmer-dashboard/orders"
    },
    {
      id: 3,
      title: "Total Earnings",
      value: "₦186,500",
      icon: <FaMoneyBillWave />,
      link: "/farmer-dashboard/earnings"
    }
  ];

  const recentOrders = [
    {
      id: "ORD-1001",
      product: "Organic Tomatoes",
      buyer: "Fresh Foods Ltd",
      date: "2023-06-15",
      status: "Pending",
      amount: "₦45,000"
    },
    {
      id: "ORD-1002",
      product: "Premium Rice",
      buyer: "Urban Kitchen",
      date: "2023-06-12",
      status: "Shipped",
      amount: "₦62,000"
    },
    {
      id: "ORD-1003",
      product: "Fresh Carrots",
      buyer: "Healthy Eats",
      date: "2023-06-10",
      status: "Delivered",
      amount: "₦28,500"
    }
  ];

  const performanceData = [
    { month: "Jan", sales: 120000 },
    { month: "Feb", sales: 180000 },
    { month: "Mar", sales: 150000 },
    { month: "Apr", sales: 210000 },
    { month: "May", sales: 190000 },
    { month: "Jun", sales: 165000 }
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-4 md:p-8 min-h-screen"
    >
      {/* Welcome Section */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 font-clash">
          Welcome back,{" "}
          <span className="text-primary font-clash">
            {user?.fullName || "Farmer"}
          </span>
        </h1>
        <p className="text-gray-600 font-satoshi">
          Here's what's happening with your farm today
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.id}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-primary transition-all"
          >
            <Link to={stat.link} className="block">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-satoshi">{stat.title}</p>
                  <p className="text-3xl font-bold font-clash text-gray-800">
                    {stat.value}
                  </p>
                </div>
                <div className="bg-primary bg-opacity-10 p-3 rounded-full">
                  {React.cloneElement(stat.icon, {
                    className: "text-primary text-xl"
                  })}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Performance and Orders Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Sales Performance */}
        <motion.div 
          variants={itemVariants} 
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full flex flex-col"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 font-clash flex items-center gap-2">
              <FaChartLine className="text-primary" /> Sales Performance
            </h2>
            <Link
              to="/farmer-dashboard/earnings"
              className="text-primary hover:underline font-satoshi flex items-center gap-1 text-sm"
            >
              View details
            </Link>
          </div>
          
          {/* Simple bar chart */}
          <div className="flex-grow">
            <div className="flex items-end h-48 gap-2 mt-4">
              {performanceData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-primary bg-opacity-20 rounded-t-sm hover:bg-opacity-30 transition-all"
                    style={{ height: `${(data.sales / 250000) * 100}%` }}
                  >
                    <div className="text-xs text-center mt-1 text-gray-500">
                      ₦{(data.sales / 1000).toFixed(0)}k
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">{data.month}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Recent Orders */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col h-full"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 font-clash flex items-center gap-2">
              <FaClipboardList className="text-primary" /> Recent Orders
            </h2>
            <Link
              to="/farmer-dashboard/orders"
              className="text-primary hover:underline font-satoshi flex items-center gap-1 text-sm"
            >
              View all
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 flex-grow">
            <div className="overflow-x-auto h-full">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-satoshi">
                      Order ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-satoshi">
                      Product
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-satoshi">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-satoshi">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <motion.tr
                      key={order.id}
                      whileHover={{ backgroundColor: "rgba(74, 222, 128, 0.05)" }}
                      className="transition-colors duration-200"
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 font-satoshi">
                        {order.id}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 font-clash">
                        {order.product}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 font-satoshi">
                        {order.amount}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full font-satoshi ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Shipped"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants} className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6 font-clash flex items-center gap-2">
          <FaLeaf className="text-primary" /> Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            whileHover={cardHover}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:border-primary transition-all h-full"
          >
            <Link
              to="/farmer-dashboard/products/add"
              className="flex flex-col items-center text-center p-4 h-full"
            >
              <div className="bg-primary bg-opacity-10 p-3 rounded-full mb-3">
                <FaPlus className="text-primary text-xl" />
              </div>
              <h3 className="font-semibold text-gray-800 font-clash">
                Add New Product
              </h3>
              <p className="text-gray-500 text-sm mt-1 font-satoshi">
                List your farm products
              </p>
            </Link>
          </motion.div>

          <motion.div
            whileHover={cardHover}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:border-primary transition-all h-full"
          >
            <Link
              to="/farmer-dashboard/orders"
              className="flex flex-col items-center text-center p-4 h-full"
            >
              <div className="bg-primary bg-opacity-10 p-3 rounded-full mb-3">
                <FaClipboardList className="text-primary text-xl" />
              </div>
              <h3 className="font-semibold text-gray-800 font-clash">
                Manage Orders
              </h3>
              <p className="text-gray-500 text-sm mt-1 font-satoshi">
                View and update orders
              </p>
            </Link>
          </motion.div>

          <motion.div
            whileHover={cardHover}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:border-primary transition-all h-full"
          >
            <Link
              to="/farmer-dashboard/earnings"
              className="flex flex-col items-center text-center p-4 h-full"
            >
              <div className="bg-primary bg-opacity-10 p-3 rounded-full mb-3">
                <FaMoneyBillWave className="text-primary text-xl" />
              </div>
              <h3 className="font-semibold text-gray-800 font-clash">
                View Earnings
              </h3>
              <p className="text-gray-500 text-sm mt-1 font-satoshi">
                Check your sales performance
              </p>
            </Link>
          </motion.div>

          <motion.div
            whileHover={cardHover}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:border-primary transition-all h-full"
          >
            <Link
              to="/farmer-dashboard/settings"
              className="flex flex-col items-center text-center p-4 h-full"
            >
              <div className="bg-primary bg-opacity-10 p-3 rounded-full mb-3">
                <FaTruck className="text-primary text-xl" />
              </div>
              <h3 className="font-semibold text-gray-800 font-clash">
                Delivery Settings
              </h3>
              <p className="text-gray-500 text-sm mt-1 font-satoshi">
                Update your delivery options
              </p>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Overview;