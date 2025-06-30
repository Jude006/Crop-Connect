import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FiSearch,
  FiShoppingCart,
  FiHeart,
  FiPackage,
  FiStar,
  FiClock,
  FiTrendingUp,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const Overview = () => {
  const [stats, setStats] = useState({
    cartItems: 0,
    favorites: 0,
    recentOrders: 0,
    totalSpent: 0,
  });
  const [products, setProducts] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Create axios instance with auth header
  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken");
          console.log('Current auth token:', token); // Debug

        // Public data
        const productsRes = await axios.get(
          `${API_BASE_URL}/api/products/public?limit=8`
        );
        setProducts(productsRes.data);

        // Recently viewed
        const recentlyViewed = JSON.parse(
          localStorage.getItem("recentlyViewed") || "[]"
        );
        setRecentProducts(recentlyViewed.slice(0, 4));

         if (token) {
      try {
        console.log('Making API requests with token:', token); // Debug log
        const [cartRes, favoritesRes, ordersRes] = await Promise.all([
          api.get("/api/cart").catch((err) => {
            console.error('Cart error:', err);
            return { data: { items: [] } };
          }),
          api.get("/api/favorites").catch((err) => {
            console.error('Favorites error:', err);
            return { data: [] };
          }),
          api.get("/api/orders/recent").catch((err) => {
            console.error('Orders recent error:', err.response?.data || err);
            return { 
              data: { 
                count: 0, 
                totalSpent: 0,
                success: false 
              }
            };
          }),
        ]);

            // Ensure we use the data even if request failed
            const ordersData = ordersRes.data.success
              ? ordersRes.data
              : {
                  count: 0,
                  totalSpent: 0,
                };

            setStats({
              cartItems: cartRes.data.items?.length || 0,
              favorites: favoritesRes.data.length || 0,
              recentOrders: ordersData.count || 0,
              totalSpent: ordersData.totalSpent || 0,
            });
          } catch (authError) {
            console.log("Auth error:", authError);
            // Set zeros if auth fails
            setStats({
              cartItems: 0,
              favorites: 0,
              recentOrders: 0,
              totalSpent: 0,
            });
          }
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.farmName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(
        `/buyer-dashboard/products?search=${encodeURIComponent(searchTerm)}`
      );
    }
  };

  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("Please login to add items to cart");
        navigate("/login");
        return;
      }

      await api.post("/api/cart/add", { productId, quantity: 1 });

      // Update cart count
      setStats((prev) => ({ ...prev, cartItems: prev.cartItems + 1 }));
      toast.success("Item added to cart");
    } catch (err) {
      console.error("Failed to add to cart:", err);
      toast.error(err.response?.data?.error || "Failed to add to cart");
    }
  };

  const toggleFavorite = async (productId) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("Please login to manage favorites");
        navigate("/login");
        return;
      }

      // Check if product is already favorited
      const isFav = await api.get(`/api/favorites/check/${productId}`);

      if (isFav.data.isFavorite) {
        await api.delete(`/api/favorites/${productId}`);
        setStats((prev) => ({ ...prev, favorites: prev.favorites - 1 }));
        toast.success("Removed from favorites");
      } else {
        await api.post(`/api/favorites/${productId}`);
        setStats((prev) => ({ ...prev, favorites: prev.favorites + 1 }));
        toast.success("Added to favorites");
      }
    } catch (err) {
      console.error("Favorite error:", err);
      toast.error(err.response?.data?.error || "Failed to update favorites");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Header with Search */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Welcome Back!
              </h1>
              <p className="text-gray-600">
                Here's what's happening with your account today
              </p>
            </div>

            <form onSubmit={handleSearch} className="w-full md:w-96">
              <div className="relative">
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products, farms, categories..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 bg-primary text-white px-3 py-1 rounded-md text-sm hover:bg-opacity-90 transition-all"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Cart Items Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 cursor-pointer"
            onClick={() => navigate("/buyer-dashboard/carts")}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Cart Items</p>
                <h3 className="text-2xl font-bold mt-2">{stats.cartItems}</h3>
              </div>
              <div className="p-3 bg-blue-50 rounded-full">
                <FiShoppingCart className="text-blue-500 text-xl" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              View and manage your cart
            </p>
          </motion.div>

          {/* Favorites Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 cursor-pointer"
            onClick={() => navigate("/buyer-dashboard/favourites")}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Favorites</p>
                <h3 className="text-2xl font-bold mt-2">{stats.favorites}</h3>
              </div>
              <div className="p-3 bg-red-50 rounded-full">
                <FiHeart className="text-red-500 text-xl" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">View your saved items</p>
          </motion.div>

          {/* Recent Orders Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 cursor-pointer"
            onClick={() => navigate("/buyer-dashboard/orders")}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Recent Orders</p>
                <h3 className="text-2xl font-bold mt-2">
                  {stats.recentOrders}
                </h3>
              </div>
              <div className="p-3 bg-green-50 rounded-full">
                <FiPackage className="text-green-500 text-xl" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Track your recent purchases
            </p>
          </motion.div>

          {/* Total Spent Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Total Spent</p>
                <h3 className="text-2xl font-bold mt-2">
                  ₦{stats.totalSpent.toLocaleString()}
                </h3>
              </div>
              <div className="p-3 bg-purple-50 rounded-full">
                <FiTrendingUp className="text-purple-500 text-xl" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">Your total purchases</p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        {/* Recently Viewed Section */}
        {recentProducts.length > 0 && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Recently Viewed
              </h2>
              <button
                onClick={() => navigate("/buyer-dashboard/products")}
                className="text-primary hover:underline"
              >
                View All
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentProducts.map((product) => (
                <motion.div
                  key={product._id}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 cursor-pointer"
                  onClick={() =>
                    navigate(`/buyer-dashboard/products/${product._id}`)
                  }
                >
                  <div className="relative h-48">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      className="absolute top-2 right-2 bg-white/80 p-2 rounded-full hover:bg-white transition-all"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(product._id);
                      }}
                    >
                      <FiHeart className="text-gray-600 hover:text-red-500" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg truncate">
                      {product.name}
                    </h3>
                    <p className="text-primary font-bold mt-1">
                      ₦{product.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {product.farmName}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Featured Products Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              Featured Products
            </h2>
            <button
              onClick={() => navigate("/buyer-dashboard/products")}
              className="text-primary hover:underline"
            >
              View All
            </button>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <FiPackage className="mx-auto text-4xl text-gray-400 mb-4" />
              <p className="text-gray-600">
                No products found matching your search
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  navigate("/buyer-dashboard/products");
                }}
                className="mt-4 bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-all"
              >
                Browse All Products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product._id}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
                >
                  <div
                    className="relative h-48 cursor-pointer"
                    onClick={() =>
                      navigate(`/buyer-dashboard/products/${product._id}`)
                    }
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {product.isNew && (
                      <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                        New
                      </span>
                    )}
                    <button
                      className="absolute top-2 right-2 bg-white/80 p-2 rounded-full hover:bg-white transition-all"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(product._id);
                      }}
                    >
                      <FiHeart className="text-gray-600 hover:text-red-500" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3
                      className="font-semibold text-lg truncate cursor-pointer hover:text-primary"
                      onClick={() =>
                        navigate(`/buyer-dashboard/products/${product._id}`)
                      }
                    >
                      {product.name}
                    </h3>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-primary font-bold">
                        ₦{product.price.toLocaleString()}
                      </span>
                      {product.rating && (
                        <span className="flex items-center text-sm text-gray-600">
                          <FiStar className="text-yellow-400 mr-1" />
                          {product.rating.toFixed(1)}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {product.farmName}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product._id);
                      }}
                      className="w-full mt-3 flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-opacity-90 transition-all"
                    >
                      <FiShoppingCart /> Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => navigate("/buyer-dashboard/products")}
            >
              <FiPackage className="text-2xl text-primary mb-2" />
              <span>Browse Products</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => navigate("/buyer-dashboard/cart")}
            >
              <FiShoppingCart className="text-2xl text-blue-500 mb-2" />
              <span>View Cart</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => navigate("/buyer-dashboard/favorites")}
            >
              <FiHeart className="text-2xl text-red-500 mb-2" />
              <span>Your Favorites</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => navigate("/buyer-dashboard/orders")}
            >
              <FiClock className="text-2xl text-green-500 mb-2" />
              <span>Order History</span>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
