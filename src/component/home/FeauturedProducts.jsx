import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaStar, FaShoppingCart, FaLeaf, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/products/public`);
        setProducts(response.data.slice(0, 6)); // Show first 6 products
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4">
            <span className="text-primary font-clash">Featured</span> Farm Produce
          </h2>
          <p className="text-gray-600 font-satoshi max-w-2xl mx-auto">
            Handpicked selection of the freshest products from our partner farms
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
            >
              <Link to={`/buyer-dashboard/products/${product._id}`} className="block">
                {/* Product Image */}
                <div className="relative h-64 overflow-hidden">
                  <motion.img
                    src={product.images?.[0] || "/images/produce.avif"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    whileHover={{ scale: 1.05 }}
                  />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {product.organic && (
                      <span className="bg-green-100 text-success px-3 py-1 rounded-full text-xs font-satoshi flex items-center gap-1">
                        <FaLeaf className="text-xs" /> Organic
                      </span>
                    )}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-clash font-bold text-xl text-gray-900 mb-1">
                        {product.name}
                      </h3>
                      <div className="flex items-center text-gray-500 font-satoshi text-sm">
                        <FaMapMarkerAlt className="mr-1 text-xs" />
                        {product.location}
                      </div>
                    </div>
                    <div className="flex items-center bg-success/5 px-3 py-1 rounded-full">
                      <FaStar className="text-yellow-500 mr-1 text-sm" />
                      <span className="font-satoshi font-bold text-gray-900">
                        4.8
                      </span>
                      <span className="text-gray-400 text-xs ml-1">(24)</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-6">
                    <div>
                      <p className="text-gray-500 font-satoshi text-sm">
                        Starting at
                      </p>
                      <p className="font-clash font-bold text-primary text-2xl">
                        ₦{product.price?.toLocaleString()}
                      </p>
                      <p className="text-gray-400 font-satoshi text-xs">
                        {product.quantity} {product.unit || 'units'} available
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-accent hover:bg-opacity-90 text-white p-3 rounded-full shadow-md"
                      onClick={(e) => {
                        e.preventDefault();
                        // Add to cart logic
                      }}
                    >
                      <FaShoppingCart />
                    </motion.button>
                  </div>
                </div>

                {/* Farmer Tag */}
                {product.farmer && (
                  <div className="absolute bottom-24 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full shadow-sm flex items-center border border-gray-100">
                    <div className="w-6 h-6 rounded-full bg-gray-200 mr-2 overflow-hidden">
                      <img
                        src={product.farmer.profileImage || "/farmer-avatar.jpg"}
                        alt={product.farmer.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="font-satoshi text-sm text-gray-700">
                      {product.farmer.farmName || product.farmer.name}
                    </span>
                  </div>
                )}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link to='/buyer-dashboard/products'>
            <button className="inline-flex items-center border-2 border-accent text-black hover:bg-accent font-bold hover:text-white px-8 py-3 rounded-full font-satoshi transition-colors duration-300 group">
              Browse All Products
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;