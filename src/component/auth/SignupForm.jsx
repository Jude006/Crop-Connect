import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaLeaf } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { validatePassword } from "../../utils/Validation";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    userType: "buyer",
  });
  const { register, loading, error } = useContext(AuthContext);
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordErrors, setPasswordErrors] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (passwordErrors.length > 0) {
      setPasswordErrors([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validatePassword(formData.password); 
    if (!validation.isValid) {
      setPasswordErrors(validation.errors);
      return;
    }

    setPasswordErrors([]);
    try {
      const response = await register({
        fullName: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.userType,
        ...(formData.userType === "farmer" && { farmName: "Default Farm" }),
        ...(formData.userType === "buyer" && { preferences: [] }),
      });

      setSuccessMessage("Registration successful!");
    } catch (error) {
      console.log("Error signing up", error);
      setSuccessMessage("");
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
        <div className="bg-primary py-4 px-6 text-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="font-clash text-2xl font-bold text-white">
              Create Account
            </h2>
            <p className="font-satoshi text-white/90 mt-1">
              Join CropDirect today
            </p>
          </motion.div>
        </div>

        {/* Form */}
        <div className="p-6 md:p-4">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {successMessage && (
              <p className="text-center text-green-600 font-bold font-clash">
                {successMessage}
              </p>
            )}
            {error && (
              <div className="error-message text-error font-bold">
                {error.message}
              </div>
            )}
            {passwordErrors.length > 0 && (
              <div className="mt-2 text-sm text-red-600">
                {passwordErrors.map((error, index) => (
                  <p key={index}>• {error}</p>
                ))}
              </div>
            )}
            {/* Name Field */}
            <div className="mb-3">
              <label className="font-satoshi block text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="mb-3">
              <label className="font-satoshi block text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label className="font-satoshi block text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
              <p className="font-satoshi text-xs text-gray-500 mt-2">
                Minimum 8 characters with at least one number
              </p>
            </div>

            {/* User Type Selector */}
            <div className="mb-6">
              <label className="font-satoshi block text-gray-700 mb-3">
                I am a:
              </label>
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`py-3 px-4 rounded-lg border-2 flex items-center justify-center gap-2 transition-all ${
                    formData.userType === "buyer"
                      ? "border-accent bg-accent/10"
                      : "border-gray-200"
                  }`}
                  onClick={() =>
                    setFormData({ ...formData, userType: "buyer" })
                  }
                >
                  <FaUser
                    className={
                      formData.userType === "buyer"
                        ? "text-accent"
                        : "text-gray-400"
                    }
                  />
                  <span
                    className={
                      formData.userType === "buyer"
                        ? "font-medium text-accent"
                        : "text-gray-600"
                    }
                  >
                    Buyer
                  </span>
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`py-3 px-4 rounded-lg border-2 flex items-center justify-center gap-2 transition-all ${
                    formData.userType === "farmer"
                      ? "border-accent bg-accent/10"
                      : "border-gray-200"
                  }`}
                  onClick={() =>
                    setFormData({ ...formData, userType: "farmer" })
                  }
                >
                  <FaLeaf
                    className={
                      formData.userType === "farmer"
                        ? "text-accent"
                        : "text-gray-400"
                    }
                  />
                  <span
                    className={
                      formData.userType === "farmer"
                        ? "font-medium text-accent"
                        : "text-gray-600"
                    }
                  >
                    Farmer
                  </span>
                </motion.button>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              type="submit"
              className="w-full bg-accent hover:bg-opacity-90 text-white py-3 px-6 rounded-lg font-satoshi font-medium flex items-center justify-center gap-2 transition-all"
            >
              {loading ? "Loading..." : "Sign Up"}
            </motion.button>
          </motion.form>

          {/* Login Link */}
          <div className="text-center font-satoshi text-gray-600 mt-4">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-accent font-medium hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupForm;
