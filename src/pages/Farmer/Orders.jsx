import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FiTruck,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiFilter,
  FiRefreshCw,
} from "react-icons/fi";
import { motion } from "framer-motion";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: "all", // all, pending, processing, delivered, cancelled
    sort: "newest", // newest, oldest, highest, lowest
  });

  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

 const fetchOrders = async () => {
  try {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("authToken");
    
    if (!token) {
      throw new Error("Please login to view your orders");
    }

    const response = await axios.get(`${API_BASE_URL}/api/orders/farmer-orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      timeout: 10000 // 10 second timeout
    });

    if (response.status === 403) {
      throw new Error("Only farmers can view these orders");
    }

    if (response.status !== 200) {
      throw new Error(response.data?.error || "Failed to load orders");
    }

 const processedOrders = response.data.map(order => ({
  ...order,
  buyer: order.buyer || { name: 'Unknown Buyer', email: '' },
  shippingInfo: order.shippingInfo || {
    address: '',
    city: '',
    state: '',
    phone: '',
    country: 'Nigeria'
  },
  items: order.items.map(item => ({
    ...item,
    product: item.product || {
      name: 'Unknown Product',
      images: [],
      price: 0,
      farmer: { name: 'Unknown Farmer' }
    }
  }))
}));

    setOrders(processedOrders);
  } catch (err) {
    console.error("Order fetch error:", {
      message: err.message,
      response: err.response?.data
    });
    
    let errorMessage = err.message;
    if (err.response?.data?.error) {
      errorMessage = err.response.data.error;
      if (err.response.data.details) {
        errorMessage += ` (${err.response.data.details})`;
      }
    }

    setError(errorMessage);
    toast.error(errorMessage);
    
    if (err.response?.status === 401 || err.message.includes("token")) {
      navigate("/login");
    }
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      await axios.patch(
        `${API_BASE_URL}/api/orders/${orderId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // Optimistic UI update
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
      
      toast.success(`Order marked as ${newStatus}`);
    } catch (err) {
      console.error("Error updating order:", err);
      toast.error(err.response?.data?.error || "Failed to update order");
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(order => {
    if (filters.status === "all") return true;
    return order.status === filters.status;
  }).sort((a, b) => {
    if (filters.sort === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
    if (filters.sort === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
    if (filters.sort === "highest") return b.totalPrice - a.totalPrice;
    if (filters.sort === "lowest") return a.totalPrice - b.totalPrice;
    return 0;
  });

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    
    switch (status) {
      case "pending":
        return (
          <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>
            <FiClock className="inline mr-1" /> Pending
          </span>
        );
      case "processing":
        return (
          <span className={`${baseClasses} bg-blue-100 text-blue-800`}>
            <FiRefreshCw className="inline mr-1" /> Processing
          </span>
        );
      case "delivered":
        return (
          <span className={`${baseClasses} bg-green-100 text-green-800`}>
            <FiCheckCircle className="inline mr-1" /> Delivered
          </span>
        );
      case "cancelled":
        return (
          <span className={`${baseClasses} bg-red-100 text-red-800`}>
            <FiXCircle className="inline mr-1" /> Cancelled
          </span>
        );
      default:
        return (
          <span className={`${baseClasses} bg-gray-100 text-gray-800`}>
            Unknown
          </span>
        );
    }
  };

  if (loading && orders.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

 if (error) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-8 text-center">
      <FiXCircle className="mx-auto text-4xl text-red-500 mb-4" />
      <h3 className="text-lg font-medium mb-2">Error Loading Orders</h3>
      <p className="text-red-500 mb-4">{error}</p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={fetchOrders}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90"
        >
          Try Again
        </button>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Your Orders</h1>
        
        <div className="flex space-x-2">
          <div className="relative">
            <select
              className="appearance-none bg-white border rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <FiFilter className="absolute right-3 top-3 text-gray-400" />
          </div>
          
          <div className="relative">
            <select
              className="appearance-none bg-white border rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              value={filters.sort}
              onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Amount</option>
              <option value="lowest">Lowest Amount</option>
            </select>
          </div>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <FiTruck className="mx-auto text-4xl text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">No orders found</h3>
          <p className="text-gray-500 mb-4">
            {filters.status === "all"
              ? "You haven't received any orders yet"
              : `You don't have any ${filters.status} orders`}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">
                      Order #{order._id.slice(-6).toUpperCase()}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    {getStatusBadge(order.status)}
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 mb-4">
                  <h4 className="font-medium mb-2">Buyer Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Name</p>
                      <p>{order.buyer?.name || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Email</p>
                      <p>{order.buyer?.email || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Phone</p>
                      <p>{order.shippingInfo?.phone || "N/A"}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 mb-4">
                  <h4 className="font-medium mb-2">Shipping Address</h4>
                  <p className="text-sm">
                    {order.shippingInfo?.address || "N/A"},{" "}
                    {order.shippingInfo?.city || "N/A"},{" "}
                    {order.shippingInfo?.state || "N/A"}
                  </p>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <h4 className="font-medium mb-2">Order Items</h4>
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div
                        key={item._id || item.product._id}
                        className="flex justify-between py-2"
                      >
                        <div className="flex items-center">
                          {item.product?.images?.[0] ? (
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              className="w-12 h-12 object-cover rounded mr-3"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-gray-100 rounded mr-3 flex items-center justify-center">
                              <FiImage className="text-gray-400" />
                            </div>
                          )}
                          <div>
                            <p className="font-medium">{item.product?.name || "Product"}</p>
                            <p className="text-sm text-gray-500">
                              {item.quantity} × ₦{item.priceAtPurchase?.toLocaleString() || "0"}
                            </p>
                          </div>
                        </div>
                        <p className="font-medium">
                          ₦{(item.priceAtPurchase * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 mt-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Payment Method</p>
                    <p className="capitalize">{order.paymentMethod?.replace(/-/g, " ") || "N/A"}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="text-lg font-bold">
                      ₦{order.totalPrice?.toLocaleString() || "0"}
                    </p>
                  </div>
                </div>

                {order.status !== "cancelled" && order.status !== "delivered" && (
                  <div className="border-t border-gray-100 pt-4 mt-4 flex justify-end space-x-3">
                    {order.status === "pending" && (
                      <button
                        onClick={() => updateOrderStatus(order._id, "processing")}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                        disabled={loading}
                      >
                        Mark as Processing
                      </button>
                    )}
                    {order.status === "processing" && (
                      <button
                        onClick={() => updateOrderStatus(order._id, "delivered")}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                        disabled={loading}
                      >
                        Mark as Delivered
                      </button>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;