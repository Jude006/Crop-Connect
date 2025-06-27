import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { validatePassword } from "../../utils/Validation";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validatePassword(password);
    if (!validation.isValid) {
      setError(validation.errors);
      return;
    }

    setError([]);

    setError("");
    setLoading(true);
    setError("");

    try {
      await login({ email, password });
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        {/* Header */}
        <div className="bg-primary p-6 text-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="font-clash text-2xl font-bold text-white">
              Welcome Back
            </h2>
            <p className="font-satoshi text-white/90 mt-1">
              Login to manage your account
            </p>
          </motion.div>
        </div>

        {/* Form */}
        <div className="p-6 md:p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
              {error}
            </div>
          )}

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {/* Email Field */}
            <div className="mb-6">
              <label className="font-satoshi block text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-8">
              <label className="font-satoshi block text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="••••••••"
                  required
                  minLength="8"
                />
              </div>
              <div className="text-right mt-2">
                <Link
                  to="/forgot-password"
                  className="font-satoshi text-sm text-accent hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className={`w-full bg-accent hover:bg-opacity-90 text-white py-3 px-6 rounded-lg font-satoshi font-medium flex items-center justify-center gap-2 transition-all ${
                loading ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  Login <FaArrowRight />
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Signup Link */}
          <div className="text-center font-satoshi text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link
              to="/auth/signup"
              className="text-accent font-medium hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginForm;
