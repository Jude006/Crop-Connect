import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaUpload, FaTimes } from 'react-icons/fa';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    quantity: "",
    location: "",
    farmName:""
  });
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

 useEffect(() => {
  const fetchProduct = async () => {
    try {
      console.log(`Fetching product with ID: ${id}`); // Add this
      console.log(`API URL: ${API_BASE_URL}/api/products/${id}`); // Add this
      
      const res = await axios.get(`${API_BASE_URL}/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      
      console.log('Product data received:', res.data); // Add this
      
      setProduct({
        name: res.data.name,
        price: res.data.price,
        description: res.data.description,
        category: res.data.category,
        quantity: res.data.quantity,
        location: res.data.location,
        farmName:res.data.farmName
      });
      
      setExistingImages(res.data.images || []);
    } catch (err) {
      console.error('Error details:', { // Enhanced error logging
        message: err.message,
        response: err.response,
        stack: err.stack
      });
      alert(err.response?.data?.error || "Failed to load product");
      navigate("/products");
    } finally {
      setIsFetching(false);
    }
  };
  
  fetchProduct();
}, [id]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setImages([...images, ...newImages]);
  };

  const removeImage = (index) => {
    const updated = [...images];
    URL.revokeObjectURL(updated[index].preview);
    updated.splice(index, 1);
    setImages(updated);
  };

  const removeExistingImage = (index) => {
    const updated = [...existingImages];
    updated.splice(index, 1);
    setExistingImages(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const formData = new FormData();
      
      // Append new images
      images.forEach(img => {
        formData.append('images', img.file);
      });
      
      // Include product data and existing images
      const productData = {
        ...product,
        images: existingImages // Send the updated array of existing images
      };
      
      formData.append('product', JSON.stringify(productData));

      const res = await axios.put(`${API_BASE_URL}/api/products/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (res.status === 200) {
        alert('Product updated successfully');
        navigate('/farmer-dashboard/products');
      }
    } catch (err) {
      console.error('Update error:', err);
      alert(err.response?.data?.error || 'Failed to update product');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return <div className="text-center py-12">Loading product data...</div>;
  }

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-xl font-bold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          name="name" 
          value={product.name} 
          onChange={handleChange} 
          placeholder="Name" 
          required 
          className="w-full border p-2" 
        />
        <input 
          name="farmName" 
          value={product.farmName} 
          onChange={handleChange} 
          placeholder="FarmName" 
          required 
          className="w-full border p-2" 
        />
        <input 
          name="price" 
          type="number" 
          value={product.price} 
          onChange={handleChange} 
          placeholder="Price" 
          required 
          className="w-full border p-2" 
        />
        <input 
          name="quantity" 
          type="number" 
          value={product.quantity} 
          onChange={handleChange} 
          placeholder="Quantity" 
          required 
          className="w-full border p-2" 
        />
        <input 
          name="location" 
          value={product.location} 
          onChange={handleChange} 
          placeholder="Location" 
          required 
          className="w-full border p-2" 
        />
        <textarea 
          name="description" 
          value={product.description} 
          onChange={handleChange} 
          placeholder="Description" 
          className="w-full border p-2" 
        />
        <select 
          name="category" 
          value={product.category} 
          onChange={handleChange} 
          className="w-full border p-2"
        >
          <option value="">Select category</option>
          <option value="vegetables">Vegetables</option>
          <option value="fruits">Fruits</option>
          <option value="grains">Grains</option>
          <option value="tubers">Tubers</option>
          <option value="livestock">Livestock</option>
          <option value="other">Other</option>
        </select>

        <div>
          <label className="block mb-2">Upload New Images:</label>
          <input 
            type="file" 
            multiple 
            onChange={handleImageUpload} 
            className="mb-4"
          />
          
          {/* New Images Preview */}
          {images.length > 0 && (
            <div className="mb-6">
              <h4 className="font-medium mb-2">New Images to Upload:</h4>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {images.map((img, idx) => (
                  <div key={idx} className="relative">
                    <img 
                      src={img.preview} 
                      alt={`Preview ${idx}`}
                      className="w-full h-32 object-cover rounded" 
                    />
                    <button 
                      type="button" 
                      onClick={() => removeImage(idx)} 
                      className="absolute top-1 right-1 text-white bg-red-500 rounded-full p-1"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Existing Images with Remove Option */}
          {existingImages.length > 0 && (
            <div className="mb-6">
              <h4 className="font-medium mb-2">Current Product Images:</h4>
              <div className="grid grid-cols-3 gap-2">
                {existingImages.map((url, i) => (
                  <div key={i} className="relative">
                    <img 
                      src={url} 
                      alt={`Product ${i}`}
                      className="w-full h-32 object-cover rounded" 
                    />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(i)}
                      className="absolute top-1 right-1 text-white bg-red-500 rounded-full p-1"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button 
          type="submit" 
          disabled={isLoading} 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
        >
          {isLoading ? 'Saving...' : 'Update Product'}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;