import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaShoppingCart,
  FaStar,
  FaLeaf,
  FaFire,
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


  const featuredProducts = [
    {
      id: 1,
      name: "Organic Tomatoes",
      price: 1500,
      farmer: "Green Valley Farms",
      location: "Lagos",
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1447175008436-054170c2e979?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 2,
      name: "Fresh Carrots",
      price: 1200,
      farmer: "Nature Roots",
      location: "Abuja",
      rating: 4.2,
      image:
        "https://images.unsplash.com/photo-1447175008436-054170c2e979?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 3,
      name: "Premium Rice",
      price: 25000,
      farmer: "Golden Fields",
      location: "Kano",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1547496502-affa22d38842?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
  ];

  const recentOrders = [
    {
      id: 101,
      product: "Organic Tomatoes",
      date: "2023-05-15",
      status: "Delivered",
    },
    {
      id: 102,
      product: "Fresh Carrots",
      date: "2023-05-10",
      status: "Shipped",
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-4 md:p-8  min-h-screen"
    >
      {/* Welcome Section */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 font-clash">
          Welcome back, {" "}
          <span className="text-primary font-clash">
            {user?.fullName || "Valued Customer"}
          </span>
        </h1>
        <p className="text-gray-600 font-satoshi">
          Discover the freshest farm products in your area
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-primary transition-all"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-satoshi">Total Orders</p>
              <p className="text-3xl font-bold font-clash text-gray-800">12</p>
            </div>
            <div className="bg-primary bg-opacity-10 p-3 rounded-full">
              <FaShoppingCart className="text-primary text-xl" />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-primary transition-all"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-satoshi">Cart Items</p>
              <p className="text-3xl font-bold font-clash text-gray-800">3</p>
            </div>
            <div className="bg-primary bg-opacity-10 p-3 rounded-full">
              <FaShoppingCart className="text-primary text-xl" />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-primary transition-all"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-satoshi">Favorites</p>
              <p className="text-3xl font-bold font-clash text-gray-800">5</p>
            </div>
            <div className="bg-primary bg-opacity-10 p-3 rounded-full">
              <FaStar className="text-primary text-xl" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Search Bar */}
      <motion.div variants={itemVariants} className="relative mb-8">
        <input
          type="text"
          placeholder="Search for products, farms, or locations..."
          className="w-full p-4 pl-12 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent font-satoshi shadow-sm transition-all duration-300 focus:shadow-md"
        />
        <FaSearch className="absolute left-4 top-4 text-gray-400" />
      </motion.div>

      {/* Featured Products */}
      <motion.div variants={itemVariants} className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800 font-clash flex items-center gap-2">
            <FaFire className="text-primary" /> Trending Products
          </h2>
          <Link
            to="/buyer-dashboard/products"
            className="text-primary hover:underline font-satoshi flex items-center gap-1"
          >
            View all <span className="text-lg">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover={cardHover}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:border-primary transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <FaStar className="text-yellow-400" />
                  <span>{product.rating}</span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg font-clash text-gray-800">
                    {product.name}
                  </h3>
                  <span className="font-bold text-primary font-clash">
                    ₦{product.price.toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-500 text-sm mb-3 font-satoshi flex items-center">
                  <FaLeaf className="inline mr-2 text-primary" />
                  {product.farmer} • {product.location}
                </p>
                <div className="flex justify-between items-center">
                  <button className="bg-primary text-white px-4 py-2 rounded-lg font-satoshi hover:bg-opacity-90 transition-all flex items-center gap-2">
                    <FaShoppingCart /> Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Orders */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-bold text-gray-800 mb-6 font-clash">
          Recent Orders
        </h2>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-satoshi">
                    Order ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-satoshi">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-satoshi">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-satoshi">
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-satoshi">
                      #{order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-clash">
                      {order.product}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-satoshi">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full font-satoshi ${
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
    </motion.div>
  );
};

export default Overview;
