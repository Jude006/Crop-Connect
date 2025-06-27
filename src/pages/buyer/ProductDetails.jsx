import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiShoppingCart, FiHeart, FiArrowLeft } from "react-icons/fi";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/api/products/public/${id}`
        );
        console.log("Fetched product data:", res.data); 
        setProduct(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details");
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-primary text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Product not found</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-primary text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-primary"
      >
        <FiArrowLeft /> Back to Products
      </button>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Product Images */}
          <div className="md:w-1/2 p-4">
            <div className="h-96 overflow-hidden rounded-lg">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex mt-4 space-x-2">
              {product.images.slice(0, 4).map((img, index) => (
                <div
                  key={index}
                  className="w-20 h-20 overflow-hidden rounded border"
                >
                  <img
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="md:w-1/2 p-6">
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-4">Sold by: {product.farmName}</p>
            <p className="text-primary text-2xl font-bold mb-4">
              ₦{product.price.toLocaleString()}
            </p>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-gray-700">
                {product.description || "No description available"}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="font-semibold">Category</h3>
                <p className="text-gray-600">{product.category}</p>
              </div>
              <div>
                <h3 className="font-semibold">Location</h3>
                <p className="text-gray-600">{product.location}</p>
              </div>
              <div>
                <h3 className="font-semibold">Available Quantity</h3>
                <p className="text-gray-600">{product.quantity}</p>
              </div>
            </div>

            <div className="flex space-x-4">
              <button className="flex items-center justify-center bg-primary text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-all">
                <FiShoppingCart className="mr-2" />
                Add to Cart
              </button>
              <button className="flex items-center justify-center border border-primary text-primary px-6 py-3 rounded-lg hover:bg-gray-50 transition-all">
                <FiHeart className="mr-2" />
                Add to Favorites
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">About the Farmer</h2>

        {product.farmer ? (
          <div className="flex items-start gap-4">
            {/* Farmer Profile Image */}
            <div className="flex-shrink-0">
              <img
                src={product.farmer.profileImage || "/default.avif"}
                alt={product.farmer.name || "Farmer"}
                className="w-16 h-16 rounded-full object-cover border"
                onError={(e) => (e.target.src = "/default-profile.png")}
              />
            </div>

            {/* Farmer Info */}
            <div className="flex-1">
              <h3 className="font-semibold text-lg">
                {product.farmName ||
                  product.farmName ||
                  "Local Farmer"}
              </h3>

              {/* Farmer Bio */}
              <p className="text-gray-600 text-sm mb-2">
                {product.farmer.bio || "No bio available"}
              </p>

              {/* Additional Farmer Details */}
              <div className="grid grid-cols-2 gap-4 mt-3">
                {product.farmer.phone && (
                  <div>
                    <p className="text-sm font-medium text-gray-700">Phone</p>
                    <p className="text-sm text-gray-600">
                      {product.farmer.phone}
                    </p>
                  </div>
                )}

                {product.farmer.email && (
                  <div>
                    <p className="text-sm font-medium text-gray-700">Email</p>
                    <p className="text-sm text-gray-600">
                      {product.farmer.email}
                    </p>
                  </div>
                )}
              </div>

              {/* Contact Options */}
              <div className="flex flex-wrap gap-3 mt-4">
                {/* WhatsApp Button */}
                {product.farmer.phone && (
                  <a
                    href={`https://wa.me/${product.farmer.phone.replace(
                      /\D/g,
                      ""
                    )}?text=Hi%20${encodeURIComponent(
                      product.farmer.name || ""
                    )},%20I'm%20interested%20in%20your%20${encodeURIComponent(
                      product.name
                    )}%20product`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp
                  </a>
                )}

                {/* Email Button */}
                {product.farmer.email && (
                  <a
                    href={`mailto:${
                      product.farmer.email
                    }?subject=Inquiry about ${product.name}&body=Hello ${
                      product.farmer.name || ""
                    },%0D%0A%0D%0AI'm interested in your ${
                      product.name
                    } product.`}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                    Email
                  </a>
                )}

                {/* Phone Call Button */}
                {product.farmer.phone && (
                  <a
                    href={`tel:${product.farmer.phone}`}
                    className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
                    </svg>
                    Call
                  </a>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Farmer information not available</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
