import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiSearch, FiFilter, FiShoppingCart, FiHeart } from "react-icons/fi";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    location: "",
  });
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
   const isFavorite = (productId) => {
    return favorites.some(fav => fav._id === productId);
  };


  useEffect(() => {
  const fetchData = async () => {
    try {
      // Fetch products
      const productsRes = await axios.get(`${API_BASE_URL}/api/products/public`);
      setProducts(productsRes.data);
      
      // Fetch favorites if user is authenticated
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const favoritesRes = await axios.get(`${API_BASE_URL}/api/favorites`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setFavorites(favoritesRes.data);
        } catch (favoritesError) {
          if (favoritesError.response?.status !== 401) { // Don't show error for unauthorized
            toast.error("Couldn't load favorites");
          }
        }
      }
      
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      toast.error("Failed to load products");
      setLoading(false);
    }
  };
  
  fetchData();
}, []);

  const filteredProducts = products.filter((product) => {
    // Search term filter
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.farmName.toLowerCase().includes(searchTerm.toLowerCase());

    // Category filter
    const matchesCategory =
      !filters.category || product.category === filters.category;

    // Price range filter
    const matchesPrice =
      (!filters.minPrice || product.price >= filters.minPrice) &&
      (!filters.maxPrice || product.price <= filters.maxPrice);

    // Location filter
    const matchesLocation =
      !filters.location ||
      product.location.toLowerCase().includes(filters.location.toLowerCase());

    return matchesSearch && matchesCategory && matchesPrice && matchesLocation;
  });

  const categories = [...new Set(products.map((p) => p.category))];

  const addToCart = async (productId) => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/cart/add`,
        { productId, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      console.log("Added to cart:", res.data);
      toast.success("Item added successfully");
    } catch (err) {
      console.error(
        "Failed to add to cart:",
        err.response?.data?.error || err.message
      );
    }
  };

const toggleFavorite = async (productId) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Please login to manage favorites");
      navigate('/login'); // Optional: redirect to login
      return;
    }

    if (isFavorite(productId)) {
      await axios.delete(`${API_BASE_URL}/api/favorites/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavorites(favorites.filter(fav => fav._id !== productId));
      toast.success("Removed from favorites");
    } else {
      const response = await axios.post(
        `${API_BASE_URL}/api/favorites/${productId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Use the product from the response if available
      const addedProduct = response.data?.product || 
                         products.find(p => p._id === productId);
      
      if (addedProduct) {
        setFavorites([...favorites, addedProduct]);
      }
      toast.success("Added to favorites");
    }
  } catch (err) {
    console.error("Favorite error:", err);
    toast.error(err.response?.data?.error || "Failed to update favorites");
  }
};


  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search and Filter Section */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search products or farms..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
            onClick={() => document.getElementById("filter-modal").showModal()}
          >
            <FiFilter /> Filters
          </button>
        </div>

        {/* Filter Modal */}
        <dialog id="filter-modal" className="modal">
          <div className="modal-box max-w-md">
            <h3 className="font-bold text-lg mb-4">Filter Products</h3>
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Category</label>
                <select
                  className="w-full p-2 border rounded"
                  value={filters.category}
                  onChange={(e) =>
                    setFilters({ ...filters, category: e.target.value })
                  }
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">Min Price (₦)</label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded"
                    value={filters.minPrice}
                    onChange={(e) =>
                      setFilters({ ...filters, minPrice: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block mb-2">Max Price (₦)</label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded"
                    value={filters.maxPrice}
                    onChange={(e) =>
                      setFilters({ ...filters, maxPrice: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2">Location</label>
                <input
                  type="text"
                  placeholder="City or State"
                  className="w-full p-2 border rounded"
                  value={filters.location}
                  onChange={(e) =>
                    setFilters({ ...filters, location: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="modal-action">
              <button
                className="btn"
                onClick={() => document.getElementById("filter-modal").close()}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </dialog>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-500">
            No products match your search criteria
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                <button
                  className="absolute top-2 right-2 bg-white/80 p-2 rounded-full hover:bg-white transition-all"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(product._id);
                  }}
                >
                  <FiHeart
                    className={
                      isFavorite(product._id)
                        ? "text-red-500 fill-red-500"
                        : "text-gray-600 hover:text-red-500"
                    }
                  />
                </button>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3
                    className="font-semibold text-lg cursor-pointer hover:text-primary transition-colors"
                    onClick={() => navigate(`/products/${product._id}`)}
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
                  <span className="text-sm text-gray-500">
                    {product.quantity} available
                  </span>
                  <button
                    className="flex items-center gap-1 bg-primary text-white px-3 py-1 rounded-lg text-sm hover:bg-opacity-90 transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product._id);
                    }}
                  >
                    <FiShoppingCart /> Add
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

export default Products;
