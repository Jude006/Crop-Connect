import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FiShoppingCart,
  FiTrash2,
  FiPlus,
  FiMinus,
  FiImage,
} from "react-icons/fi";
import { toast } from "react-toastify";

const MyCarts = () => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState({});
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/api/cart`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setCart(res.data);
    } catch (err) {
      console.error("Failed to load cart:", err);
      toast.error("Failed to load your cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    setUpdating((prev) => ({ ...prev, [itemId]: true }));

    try {
      // Optimistic update
      setCart((prev) => ({
        ...prev,
        items: prev.items.map((item) =>
          item._id === itemId ? { ...item, quantity: newQuantity } : item
        ),
      }));

      const res = await axios.put(
        `${API_BASE_URL}/api/cart/update/${itemId}`,
        { quantity: newQuantity },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      // Update with server data
      setCart(res.data);
      toast.success("Cart updated");
    } catch (err) {
      console.error("Failed to update quantity:", err);
      toast.error(err.response?.data?.error || "Failed to update quantity");
      // Re-fetch cart to ensure consistency
      fetchCart();
    } finally {
      setUpdating((prev) => ({ ...prev, [itemId]: false }));
    }
  };

  const removeItem = async (itemId) => {
    setUpdating((prev) => ({ ...prev, [itemId]: true }));
    try {
      // Optimistic removal
      setCart((prev) => ({
        ...prev,
        items: prev.items.filter((item) => item._id !== itemId),
      }));

      await axios.delete(`${API_BASE_URL}/api/cart/remove/${itemId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      toast.success("Item removed from cart");
    } catch (err) {
      console.error("Failed to remove item:", err);
      toast.error("Failed to remove item");
      // Re-fetch cart to ensure consistency
      fetchCart();
    } finally {
      setUpdating((prev) => ({ ...prev, [itemId]: false }));
    }
  };

  const calculateTotal = () => {
    return cart.items.reduce(
      (total, item) => total + (item.product?.price || 0) * item.quantity,
      0
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">My Shopping Cart</h1>

      {cart.items?.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <FiShoppingCart className="mx-auto text-4xl text-gray-400 mb-4" />
          <p className="text-lg text-gray-500 mb-4">Your cart is empty</p>
          <button
            onClick={() => navigate("/buyer-dashboard/products")}
            className="mt-4 bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-all"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {cart.items?.map((item) => (
                <div
                  key={item._id}
                  className="p-4 flex border-b border-gray-100 last:border-0"
                >
                  {/* Product Image */}
                  <div
                    className="relative w-20 h-20 flex-shrink-0 cursor-pointer"
                    onClick={() =>
                      navigate(`/buyer-dashboard/products/${item.product._id}`)
                    }
                  >
                    {item.product?.images?.[0] ? (
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover rounded cursor-pointer"
                        onClick={() =>
                          navigate(
                            `/buyer-dashboard/products/${item.product._id}`
                          )
                        }
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center">
                        <FiImage className="text-gray-400 text-xl" />
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="ml-4 flex-1 min-w-0">
                    <h3
                      className="font-medium text-lg truncate cursor-pointer hover:text-primary"
                      onClick={() =>
                        navigate(
                          `/buyer-dashboard/products/${item.product?._id}`
                        )
                      }
                    >
                      {item.product?.name || "Loading..."}
                    </h3>
                    <p className="text-gray-600 text-sm truncate">
                      {item.product?.farmName || "Loading..."}
                    </p>

                    {/* Quantity Controls */}
                    <div className="mt-3 flex items-center">
                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.quantity - 1)
                        }
                        disabled={updating[item._id]}
                        className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
                      >
                        <FiMinus />
                      </button>

                      <span className="mx-3 w-8 text-center">
                        {updating[item._id] ? "..." : item.quantity} 
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.quantity + 1)
                        }
                        disabled={updating[item._id]}
                        className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </div>

                  {/* Price and Remove */}
                  <div className="flex flex-col items-end ml-4">
                    <p className="font-bold text-primary whitespace-nowrap">
                      ₦
                      {(
                        (item.product?.price || 0) * item.quantity
                      ).toLocaleString()}
                    </p>
                    <button
                      onClick={() => removeItem(item._id)}
                      disabled={updating[item._id]}
                      className="mt-2 text-red-500 hover:text-red-700 disabled:opacity-50"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6">
                {cart.items?.map((item) => (
                  <div key={item._id} className="flex justify-between text-sm">
                    <span className="truncate max-w-[60%]">
                      {item.product?.name || "Unknown"} × {item.quantity}
                    </span>
                    <span className="font-medium whitespace-nowrap">
                      ₦
                      {(
                        (item.product?.price || 0) * item.quantity
                      ).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₦{calculateTotal().toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => navigate("/buyer-dashboard/checkout")}
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-opacity-90 transition-all"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCarts;
