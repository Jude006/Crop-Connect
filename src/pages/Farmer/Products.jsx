import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import axios from "axios";
import { motion } from "framer-motion";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/api/products/my-products`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        // Ensure we always have an array
        setProducts(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Fetch error:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
  if (!window.confirm("Delete this product permanently?")) return;

  try {
    await axios.delete(`${API_BASE_URL}/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    setProducts((prev) => prev.filter((p) => p._id !== id));
    alert("Product deleted successfully");
  } catch (err) {
    console.error("Delete failed:", err);
    alert(err.response?.data?.error || "Failed to delete product");
  }
};




  if (loading) return <div className="text-center py-12">Loading...</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 md:p-8"
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 font-clash">
          My Products
        </h1>
        <Link
          to="/farmer-dashboard/products/add"
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FaPlus /> Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <p className="text-gray-500 mb-4">
            You haven't added any products yet
          </p>
          <Link
            to="/farmer-dashboard/products/add"
            className="bg-primary text-white px-4 py-2 rounded-lg inline-block"
          >
            Add Your First Product
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <motion.div
              key={product._id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {product.images?.[0] && (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-lg font-clash">
                    {product.name}
                  </h3>
                  <span className="font-bold text-primary">
                    ₦{product.price.toLocaleString()}
                  </span>
                </div>
                  <p className="text-gray-600 text-sm">Farm: {product.farmName}</p>
                <p className="text-gray-500 text-sm my-2">
                  {product.quantity} units available
                </p>
                <div className="flex justify-between mt-4">
                  <Link to={`/farmer-dashboard/products/edit/${product._id}`}>
                    <FaEdit /> Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-500 hover:underline flex items-center gap-1"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Products;
