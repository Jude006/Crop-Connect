import React, { useState } from "react";
import { FaLeaf, FaUpload, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    quantity: "",
    location: "",
    farmName: "",
  });
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages([...images, ...newImages]);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    URL.revokeObjectURL(newImages[index].preview);
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate at least one image
      if (images.length === 0) {
        throw new Error("Please upload at least one image");
      }

      const formData = new FormData();

      // Append images
      images.forEach((image) => {
        formData.append("images", image.file);
      });

      // Append product data as JSON
      formData.append(
        "product",
        JSON.stringify({
          name: product.name,
          price: product.price,
          description: product.description,
          category: product.category,
          quantity: product.quantity,
          location: product.location,
          farmName: product.farmName,
        })
      );

      const response = await axios.post(
        `${API_BASE_URL}/api/products`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (response.status === 201) {
        navigate("/farmer-dashboard/products");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || err.message || "Failed to create product";
      console.error("Submission error:", {
        error: err,
        response: err.response?.data,
      });
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 md:p-8"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800 font-clash">
            <FaLeaf className="inline mr-2 text-primary" />
            Add New Product
          </h1>
          <button
            onClick={() => navigate("/farmer-dashboard/products")}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Name */}
            <div className="col-span-2">
              <label
                className="block text-gray-700 font-satoshi mb-2"
                htmlFor="name"
              >
                Product Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={product.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label
                className="block text-gray-700 font-satoshi mb-2"
                htmlFor="farmName"
              >
                Farm Name *
              </label>
              <input
                type="text"
                id="farmName"
                name="farmName"
                value={product.farmName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
            {/* Price */}
            <div>
              <label
                className="block text-gray-700 font-satoshi mb-2"
                htmlFor="price"
              >
                Price (₦) *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={product.price}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            {/* Quantity */}
            <div>
              <label
                className="block text-gray-700 font-satoshi mb-2"
                htmlFor="quantity"
              >
                Available Quantity *
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={product.quantity}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label
                className="block text-gray-700 font-satoshi mb-2"
                htmlFor="category"
              >
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={product.category}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              >
                <option value="">Select category</option>
                <option value="vegetables">Vegetables</option>
                <option value="fruits">Fruits</option>
                <option value="grains">Grains</option>
                <option value="tubers">Tubers</option>
                <option value="livestock">Livestock</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label
                className="block text-gray-700 font-satoshi mb-2"
                htmlFor="location"
              >
                Location *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={product.location}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            {/* Description */}
            <div className="col-span-2">
              <label
                className="block text-gray-700 font-satoshi mb-2"
                htmlFor="description"
              >
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={product.description}
                onChange={handleChange}
                rows="4"
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              ></textarea>
            </div>

            {/* Image Upload */}
            <div className="col-span-2">
              <label className="block text-gray-700 font-satoshi mb-2">
                Product Images *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="image-upload"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center justify-center"
                >
                  <FaUpload className="text-3xl text-gray-400 mb-3" />
                  <p className="text-gray-500 font-satoshi mb-1">
                    Drag & drop images here or click to browse
                  </p>
                  <p className="text-sm text-gray-400">
                    (Maximum 5 images, 5MB each)
                  </p>
                </label>
              </div>

              {/* Preview Images */}
              {images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image.preview}
                        alt={`Preview ${index}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FaTimes className="text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="col-span-2 mt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-opacity-90 transition-all flex items-center justify-center"
              >
                {isLoading ? (
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
                  "Add Product"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default AddProduct;
