import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthProvider";

const Settings = () => {
  const { user: authUser, logout, updateUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("/default.avif");
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const farmType = watch("farmType");

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        logout();
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data?.success) {
        const userData = response.data.data;
        reset({
          fullName: userData.fullName || "",
          email: userData.email || "",
          phone: userData.phone || "",
          farmName: userData.farmName || "",
          farmType: userData.farmType || "crop",
          farmSize: userData.farmSize || "",
          yearsFarming: userData.yearsFarming || "",
          certification: userData.certification || "",
          farmingMethods: userData.farmingMethods || [],
          address: {
            street: userData.address?.street || "",
            city: userData.address?.city || "",
            state: userData.address?.state || "",
            country: userData.address?.country || "Nigeria",
          },
          bio: userData.bio || "",
        });
        setPreviewImage(userData.profileImage || "/default.avif");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        logout();
      } else {
        toast.error("Failed to load profile");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match("image.*")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB");
      return;
    }

    setProfileImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const onSubmitProfile = async (data) => {
    try {
      setSaving(true);
      const token = localStorage.getItem("authToken");
      if (!token) {
        logout();
        return;
      }

      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("farmName", data.farmName);
      formData.append("farmType", data.farmType);
      formData.append("farmSize", data.farmSize);
      formData.append("yearsFarming", data.yearsFarming);
      formData.append("certification", data.certification);
      formData.append("farmingMethods", JSON.stringify(data.farmingMethods));
      formData.append("bio", data.bio);
      formData.append("address", JSON.stringify(data.address));

      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      const response = await axios.put(
        `${API_BASE_URL}/api/users/profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Profile updated successfully!");
      if (response.data?.data) {
        updateUser(response.data.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Farmer Profile Settings</h1>
          <p className="mt-1 text-gray-600">Update your farming business information</p>
        </div>

        <form onSubmit={handleSubmit(onSubmitProfile)} className="p-6 space-y-6">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center">
            <div className="relative group mb-4">
              <img
                className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-md"
                src={previewImage}
                alt="Profile"
                onError={(e) => (e.target.src = "/default-profile.png")}
              />
              <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-100 transition-all duration-300">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-700"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
            </div>
            <p className="text-sm text-gray-500">
              Click to change your profile picture
            </p>
          </div>

          {/* Personal Information Section */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name*
                </label>
                <input
                  type="text"
                  {...register("fullName", { required: "Full name is required" })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address*
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                      message: "Invalid email format",
                    },
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number*
                </label>
                <input
                  type="tel"
                  placeholder="+234..."
                  {...register("phone", { required: "Phone number is required" })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  {...register("bio")}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  placeholder="Tell buyers about your farming experience and philosophy"
                />
              </div>
            </div>
          </div>

          {/* Farm Information Section */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Farm Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Farm Name*
                </label>
                <input
                  type="text"
                  {...register("farmName", { required: "Farm name is required" })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                />
                {errors.farmName && (
                  <p className="mt-1 text-sm text-red-600">{errors.farmName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Farm Type*
                </label>
                <select
                  {...register("farmType", { required: "Farm type is required" })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                >
                  <option value="crop">Crop Production</option>
                  <option value="livestock">Livestock</option>
                  <option value="poultry">Poultry</option>
                  <option value="aquaculture">Aquaculture</option>
                  <option value="mixed">Mixed Farming</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {farmType === 'crop' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Primary Crops
                  </label>
                  <input
                    type="text"
                    {...register("primaryCrops")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                    placeholder="e.g., Maize, Cassava, Tomatoes"
                  />
                </div>
              )}

              {farmType === 'livestock' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Livestock Type
                  </label>
                  <input
                    type="text"
                    {...register("livestockType")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                    placeholder="e.g., Cattle, Goats, Sheep"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Farm Size (acres)*
                </label>
                <input
                  type="number"
                  {...register("farmSize", { required: "Farm size is required" })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                />
                {errors.farmSize && (
                  <p className="mt-1 text-sm text-red-600">{errors.farmSize.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Years of Farming Experience*
                </label>
                <input
                  type="number"
                  {...register("yearsFarming", { required: "Years of experience is required" })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                />
                {errors.yearsFarming && (
                  <p className="mt-1 text-sm text-red-600">{errors.yearsFarming.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Certification
                </label>
                <select
                  {...register("certification")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                >
                  <option value="">None</option>
                  <option value="organic">Organic Certified</option>
                  <option value="fairtrade">Fairtrade</option>
                  <option value="globalgap">GlobalG.A.P.</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Farming Methods (Select all that apply)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {['Organic', 'Conventional', 'Hydroponic', 'Greenhouse', 'Irrigated', 'Rainfed', 'Permaculture', 'Other'].map((method) => (
                    <div key={method} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`method-${method}`}
                        value={method.toLowerCase()}
                        {...register("farmingMethods")}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`method-${method}`} className="ml-2 text-sm text-gray-700">
                        {method}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Farm Location Section */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Farm Location</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  {...register("address.street")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City*
                </label>
                <input
                  type="text"
                  {...register("address.city", { required: "City is required" })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                />
                {errors.address?.city && (
                  <p className="mt-1 text-sm text-red-600">{errors.address.city.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State*
                </label>
                <input
                  type="text"
                  {...register("address.state", { required: "State is required" })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                />
                {errors.address?.state && (
                  <p className="mt-1 text-sm text-red-600">{errors.address.state.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country*
                </label>
                <input
                  type="text"
                  {...register("address.country", { required: "Country is required" })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                />
                {errors.address?.country && (
                  <p className="mt-1 text-sm text-red-600">{errors.address.country.message}</p>
                )}
              </div>
            </div>
          </div>

                  {/* Save Button */}
          <div className="flex justify-between pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className={`px-6 py-2 bg-green-600 text-white font-medium rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors ${
                saving ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {saving ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline"
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
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>

    
    </div>
  );
};

export default Settings;