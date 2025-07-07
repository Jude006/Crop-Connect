import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FiShoppingCart,
  FiTruck,
  FiCreditCard,
  FiCheckCircle,
  FiArrowLeft,
  FiImage,
} from "react-icons/fi";
import PaystackPop from "@paystack/inline-js";

const Checkout = () => {
  const [cart, setCart] = useState({
    items: [],
    total: 0,
    discountAmount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [cartLoadingError, setCartLoadingError] = useState(null);
  const [step, setStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    phone: "",
    country: "Nigeria",
  });
  const [paymentMethod, setPaymentMethod] = useState("paystack");
  const [orderProcessing, setOrderProcessing] = useState(false);

  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchCart = async () => {
    try {
      setLoading(true);
      setCartLoadingError(null);
      const response = await axios.get(`${API_BASE_URL}/api/cart`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCartLoadingError(
        error.response?.data?.error || "Failed to load your cart"
      );
      toast.error("Failed to load your cart");
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      console.log("Clearing cart...");
      const response = await axios.delete(`${API_BASE_URL}/api/cart/clear`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (response.data.success) {
        console.log("Cart cleared successfully");
        setCart({ items: [], total: 0, discountAmount: 0 });
      } else {
        throw new Error("Failed to clear cart");
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart - please try again");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    if (
      !shippingInfo.address ||
      !shippingInfo.city ||
      !shippingInfo.state ||
      !shippingInfo.phone
    ) {
      toast.error("Please fill all shipping information");
      return;
    }

    if (cart.items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setOrderProcessing(true);

    try {
      const orderData = {
        shippingInfo,
        paymentMethod,
        items: cart.items.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.product.price,
        })),
        totalPrice: cart.total || calculateTotal(),
        discountAmount: cart.discountAmount || 0,
      };

      const response = await axios.post(
        `${API_BASE_URL}/api/orders`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      const orderId = response.data.order._id;
      const userData = JSON.parse(localStorage.getItem("user")); // Add this line

      // In handlePlaceOrder function
      if (paymentMethod === "paystack") {
        const handler = PaystackPop.setup({
          key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
          email: userData.email,
          amount: Math.round(response.data.order.totalPrice * 100),
          currency: "NGN",
          ref: `order_${orderId}`,
          metadata: {
            orderId: orderId, // Crucial: Send orderId in metadata
            userId: userData._id,
          },
          callback: function (response) {
            window.location.href = `${window.location.origin}/buyer-dashboard/order-confirm/${orderId}?payment_success=true&reference=${response.reference}`;
          },
          onClose: function () {
            if (!window.location.href.includes("order-confirm")) {
              toast.info(
                "Payment window closed - you can complete payment later"
              );
              setOrderProcessing(false);
            }
          },
        });
        handler.openIframe();
      } else {
        // Handle other payment methods
        await clearCart();
        navigate(`/buyer-dashboard/order-confirm/${orderId}`, {
          state: { order: response.data.order, paymentSuccess: true },
          replace: true,
        });
      }
    } catch (error) {
      console.error("Order error:", error);
      toast.error(error.response?.data?.error || "Failed to place order");
      setOrderProcessing(false);
    }
  };

  const verifyPayment = async (reference, orderId) => {
    try {
      console.log("Verifying payment with reference:", reference);

      const verification = await axios.get(
        `${API_BASE_URL}/api/orders/verify-payment/${reference}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (verification.data.success && verification.data.order) {
        try {
          await clearCart();
        } catch (error) {
          console.error("Error clearing cart:", error);
        }

        navigate(`/buyer-dashboard/order-confirm/${orderId}`, {
          state: {
            order: verification.data.order,
            paymentSuccess: true,
          },
          replace: true,
        });
      } else {
        navigate(`/buyer-dashboard/order-confirm/${orderId}`, {
          state: {
            paymentError:
              verification.data?.message || "Payment verification failed",
          },
        });
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      navigate(`/buyer-dashboard/order-confirm/${orderId}`, {
        state: {
          paymentError:
            error.response?.data?.message || "Payment processing error",
        },
      });
    }
  };

  const calculateTotal = () => {
    return (
      cart.items.reduce(
        (total, item) => total + (item.product?.price || 0) * item.quantity,
        0
      ) - (cart.discountAmount || 0)
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (cartLoadingError) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <FiShoppingCart className="mx-auto text-4xl text-gray-400 mb-4" />
          <p className="text-lg text-gray-500 mb-4">{cartLoadingError}</p>
          <button
            onClick={fetchCart}
            className="mt-4 bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-all"
          >
            Retry
          </button>
          <button
            onClick={() => navigate("/buyer-dashboard/products")}
            className="mt-4 ml-4 bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-opacity-90 transition-all"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
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
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Checkout</h1>
        <div className="ml-auto bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
          {cart.items.length} {cart.items.length === 1 ? "item" : "items"}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="flex border-b">
              <button
                onClick={() => setStep(1)}
                className={`flex-1 py-4 font-medium ${
                  step === 1
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500"
                }`}
              >
                Shipping
              </button>
              <button
                onClick={() => step > 1 && setStep(2)}
                className={`flex-1 py-4 font-medium ${
                  step === 2
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500"
                }`}
                disabled={step < 2}
              >
                Payment
              </button>
            </div>

            <div className="p-6">
              {step === 1 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <FiTruck className="mr-2" /> Shipping Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={shippingInfo.address}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Street address"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={shippingInfo.state}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={shippingInfo.phone}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      onClick={() => setStep(2)}
                      disabled={
                        !shippingInfo.address ||
                        !shippingInfo.city ||
                        !shippingInfo.state ||
                        !shippingInfo.phone
                      }
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold flex items-center">
                    <FiCreditCard className="mr-2" /> Payment Method
                  </h2>

                  <div className="space-y-4">
                    <div
                      className={`p-4 border rounded-lg cursor-pointer ${
                        paymentMethod === "paystack"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200"
                      }`}
                      onClick={() => setPaymentMethod("paystack")}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          checked={paymentMethod === "paystack"}
                          onChange={() => {}}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <label className="ml-3 block text-sm font-medium text-gray-700">
                          Pay with Paystack (Card, Bank Transfer)
                        </label>
                      </div>
                      {paymentMethod === "paystack" && (
                        <p className="mt-2 text-sm text-gray-500">
                          Secure payment with your card, bank account, or mobile
                          money
                        </p>
                      )}
                    </div>

                    <div
                      className={`p-4 border rounded-lg cursor-pointer ${
                        paymentMethod === "bank-transfer"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200"
                      }`}
                      onClick={() => setPaymentMethod("bank-transfer")}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          checked={paymentMethod === "bank-transfer"}
                          onChange={() => {}}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <label className="ml-3 block text-sm font-medium text-gray-700">
                          Bank Transfer
                        </label>
                      </div>
                      {paymentMethod === "bank-transfer" && (
                        <p className="mt-2 text-sm text-gray-500">
                          Make payment directly to our bank account
                        </p>
                      )}
                    </div>

                    <div
                      className={`p-4 border rounded-lg cursor-pointer ${
                        paymentMethod === "cash-on-delivery"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200"
                      }`}
                      onClick={() => setPaymentMethod("cash-on-delivery")}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          checked={paymentMethod === "cash-on-delivery"}
                          onChange={() => {}}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <label className="ml-3 block text-sm font-medium text-gray-700">
                          Cash on Delivery
                        </label>
                      </div>
                      {paymentMethod === "cash-on-delivery" && (
                        <p className="mt-2 text-sm text-gray-500">
                          Pay when your order is delivered
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      onClick={() => setStep(1)}
                      className="flex items-center text-gray-600 hover:text-gray-800"
                    >
                      <FiArrowLeft className="mr-1" /> Back
                    </button>

                    <button
                      onClick={handlePlaceOrder}
                      disabled={orderProcessing}
                      className={`px-6 py-2 rounded-lg flex items-center ${
                        orderProcessing
                          ? "bg-blue-300"
                          : "bg-blue-600 hover:bg-blue-700"
                      } text-white`}
                    >
                      {orderProcessing ? (
                        "Processing..."
                      ) : (
                        <>
                          Place Order for ₦
                          {(cart.total || calculateTotal()).toLocaleString()}
                          <FiCheckCircle className="ml-2" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6">
              {cart.items.map((item) => (
                <div key={item._id} className="flex justify-between text-sm">
                  <div className="flex items-center">
                    {item.product?.images?.[0] ? (
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-10 h-10 object-cover rounded mr-2"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-100 rounded mr-2 flex items-center justify-center">
                        <FiImage className="text-gray-400" />
                      </div>
                    )}
                    <span className="truncate max-w-[60%]">
                      {item.product?.name || "Product"} × {item.quantity}
                    </span>
                  </div>
                  <span className="font-medium whitespace-nowrap">
                    ₦
                    {(
                      (item.product?.price || 0) * item.quantity
                    ).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {cart.discountAmount > 0 && (
              <div className="flex justify-between py-2 border-t border-gray-200">
                <span>Discount</span>
                <span className="text-green-600">
                  -₦{cart.discountAmount.toLocaleString()}
                </span>
              </div>
            )}

            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>
                  ₦{(cart.total || calculateTotal()).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="text-sm text-gray-500">
              By placing your order, you agree to our Terms of Service and
              Privacy Policy
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
