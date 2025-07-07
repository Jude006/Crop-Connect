import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FiCheckCircle,
  FiTruck,
  FiCreditCard,
  FiUser,
  FiHome,
  FiPhone,
  FiPackage,
  FiClock,
  FiDollarSign,
  FiShoppingBag,
} from "react-icons/fi";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [isTestPayment, setIsTestPayment] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const verifyAndFetchOrder = async () => {
  const token = localStorage.getItem("authToken");
  
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const reference = urlParams.get("reference");
    const paymentSuccess = urlParams.get("payment_success");

    if (reference && paymentSuccess === "true") {
      try {
        // Verify payment using the reference
        const verification = await axios.get(
          `${API_BASE_URL}/api/orders/verify-payment/${reference}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (verification.data.order) {
          setOrder(verification.data.order);
          return;
        }
      } catch (verifyError) {
        console.error("Payment verification failed:", verifyError);
        toast.warning(
          verifyError.response?.data?.error || 
          "Payment verification failed, showing order details"
        );
      }
    }

    // Regular order fetch
    const res = await axios.get(`${API_BASE_URL}/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setOrder(res.data);
  } catch (err) {
    console.error("Order fetch error:", err);
    setError(err.response?.data?.error || "Failed to load order details");
    toast.error(err.response?.data?.error || "Failed to load order details");
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    console.log("Current auth token:", localStorage.getItem("authToken"));

    // Check if we have order data in state first
    if (location.state?.order) {
      setOrder(location.state.order);
      setLoading(false);
      return;
    }

    // Check for payment error in state
    if (location.state?.paymentError) {
      setPaymentError(location.state.paymentError);
    }

    // Otherwise fetch from API
    if (orderId) {
      verifyAndFetchOrder();
    } else {
      setError("No order specified");
      setLoading(false);
    }
  }, [orderId, location.state]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Order Error</h1>
        <p className="text-red-500 mb-6">{error || "Order not found"}</p>
        <button
          onClick={() => navigate("/buyer-dashboard/products")}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  // Safely access shippingInfo with fallbacks
  const shippingInfo = order.shippingInfo || {
    address: "Not provided",
    city: "",
    state: "",
    phone: "",
  };

  const getStatusIcon = () => {
    switch (order.status) {
      case "pending":
        return <FiClock className="text-yellow-500" />;
      case "processing":
        return <FiPackage className="text-blue-500" />;
      case "shipped":
        return <FiTruck className="text-purple-500" />;
      case "delivered":
        return <FiCheckCircle className="text-green-500" />;
      case "cancelled":
        return <FiCheckCircle className="text-red-500" />;
      default:
        return <FiShoppingBag className="text-gray-500" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {isTestPayment && (
        <div className="bg-yellow-50 text-yellow-800 p-4 rounded-lg mb-6">
          <h3 className="font-bold">TEST PAYMENT</h3>
          <p>
            This was a test transaction using Paystack's sandbox environment.
          </p>
        </div>
      )}

      {paymentError && (
        <div className="bg-red-50 text-red-800 p-4 rounded-lg mb-6">
          <h3 className="font-bold">PAYMENT ISSUE</h3>
          <p>{paymentError}</p>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col items-center text-center mb-6">
          <FiCheckCircle className="text-5xl text-green-500 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">Thank you for your purchase</p>
          <p className="text-sm text-gray-500 mt-2">
            Order #{order._id.slice(-6).toUpperCase()}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Delivery Information */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-3 flex items-center">
              <FiTruck className="mr-2" /> Delivery Information
            </h2>
            <div className="space-y-2">
              <p className="flex items-center">
                <FiUser className="mr-2 text-gray-500" />
                <span>{order.buyer?.name || "Customer"}</span>
              </p>
              <p className="flex items-center">
                <FiHome className="mr-2 text-gray-500" />
                <span>
                  {shippingInfo.address}, {shippingInfo.city},{" "}
                  {shippingInfo.state}
                </span>
              </p>
              <p className="flex items-center">
                <FiPhone className="mr-2 text-gray-500" />
                <span>{shippingInfo.phone}</span>
              </p>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-3 flex items-center">
              <FiCreditCard className="mr-2" /> Payment Information
            </h2>
            <div className="space-y-2">
              <p>
                <span className="text-gray-500">Method:</span>{" "}
                {order.paymentMethod === "paystack"
                  ? "Paystack"
                  : order.paymentMethod === "bank-transfer"
                  ? "Bank Transfer"
                  : "Cash on Delivery"}
              </p>
              <p>
                <span className="text-gray-500">Status:</span>
                <span
                  className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    order.paymentStatus === "completed"
                      ? "bg-green-100 text-green-800"
                      : order.paymentStatus === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </p>
              <p>
                <span className="text-gray-500">Total:</span> ₦
                {order.totalPrice.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold mb-4">Order Items</h2>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div
                key={item._id || item.product?._id || Math.random()}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  {item.product?.images?.[0] && (
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name || "Product image"}
                      className="w-16 h-16 object-cover rounded mr-4"
                    />
                  )}
                  <div>
                    <p className="font-medium">
                      {item.product?.name || "Product"}
                    </p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    ₦
                    {(
                      (item.priceAtPurchase || 0) * item.quantity
                    ).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    ₦{(item.priceAtPurchase || 0).toLocaleString()} each
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Status and Total */}
        <div className="border-t border-gray-200 pt-6 mt-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {getStatusIcon()}
              <div className="ml-3">
                <h3 className="font-medium">Order Status</h3>
                <p
                  className={`text-sm ${
                    order.status === "pending"
                      ? "text-yellow-600"
                      : order.status === "processing"
                      ? "text-blue-600"
                      : order.status === "shipped"
                      ? "text-purple-600"
                      : order.status === "delivered"
                      ? "text-green-600"
                      : "text-gray-600"
                  }`}
                >
                  {order.status?.charAt(0).toUpperCase() +
                    order.status?.slice(1)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <h3 className="font-medium">Order Total</h3>
              <p className="text-xl font-bold">
                ₦{order.totalPrice.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={() => navigate("/buyer-dashboard/products")}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => navigate("/buyer-dashboard/orders")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            View All Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
