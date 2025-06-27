import React, { useState, useEffect } from "react";
import { FiHeart, FiShoppingCart, FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Favourites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await axios.get(`${API_BASE_URL}/api/favorites`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFavorites(res.data);
      } catch (err) {
        toast.error("Failed to load favorites");
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  const removeFavorite = async (productId) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`${API_BASE_URL}/api/favorites/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFavorites(favorites.filter(item => item._id !== productId));
      toast.success("Removed from favorites");
    } catch (err) {
      toast.error("Failed to remove favorite");
    }
  };

  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        `${API_BASE_URL}/api/cart/add`,
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Added to cart");
    } catch (err) {
      toast.error("Failed to add to cart");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Your Favorite Products</h1>
      
      {favorites.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <FiHeart className="mx-auto text-4xl text-gray-400 mb-4" />
          <p className="text-lg text-gray-500 mb-4">You haven't saved any favorites yet</p>
          <button
            onClick={() => navigate("/buyer-dashboard/products")}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-all"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((product) => (
            <motion.div
              key={product._id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
            >
              <div
                className="relative h-48 cursor-pointer"
                onClick={() => navigate(`/buyer-dashboard/products/${product._id}`)}
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFavorite(product._id);
                  }}
                  className="absolute top-2 right-2 bg-white/80 p-2 rounded-full hover:bg-white transition-all"
                >
                  <FiHeart className="text-red-500 fill-red-500" />
                </button>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3
                    className="font-semibold text-lg cursor-pointer hover:text-primary transition-colors"
                    onClick={() => navigate(`/buyer-dashboard/products/${product._id}`)}
                  >
                    {product.name}
                  </h3>
                  <span className="font-bold text-primary">
                    ₦{product.price.toLocaleString()}
                  </span>
                </div>
                
                <p className="text-sm text-gray-500 mb-1">{product.farmName}</p>
                <p className="text-sm text-gray-500 mb-3">{product.location}</p>
                
                <div className="flex justify-between items-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFavorite(product._id);
                    }}
                    className="text-red-500 hover:text-red-700 flex items-center gap-1 text-sm"
                  >
                    <FiTrash2 /> Remove
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product._id);
                    }}
                    className="flex items-center gap-1 bg-primary text-white px-3 py-1 rounded-lg text-sm hover:bg-opacity-90 transition-all"
                  >
                    <FiShoppingCart /> Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;