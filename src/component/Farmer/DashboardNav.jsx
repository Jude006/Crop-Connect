import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DashboardNav = ({ setShowSideBar }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setShowSideBar((prev) => !prev);
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    setShowDropdown(false);
   const confirmLogout = window.confirm('are you sure you want to logout')
    if(!confirmLogout){
      return;
    }
    toast.success("Logging out Successfully ", {
  className: "font-clash text-sm text-green-700 bg-green-100",
});
    setTimeout(() => {
      logout(localStorage.removeItem("authToken"));
      navigate("/auth/login");
    }, 3000);
  };

  const goToProfile = () => {
    setShowDropdown(false);
    navigate("/farmer-dashboard/settings");
  };

  const getProfileImage = () => {
    if (!user?.profileImage) return "/default-profile.png";
    const img = user.profileImage;
    const API_BASE_URL =
      import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
    return img.startsWith("http") ? img : `${API_BASE_URL}${img}`;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <main className="border-b px-2 z-10 relative border-gray-500 flex justify-between py-1 items-center">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="px-3 py-3 border-r border-gray-500 cursor-pointer"
        >
          <h3 className="border-2 border-gray-500 h-4 w-4 rounded">
            <p className="border-l-2 w-3 ml-1 h-full border-gray-500"></p>
          </h3>
        </button>
        <div className="flex items-center gap-2">
          <p className="font-clash">{user?.fullName || "User"}</p>
          <p className="font-clash">&gt;</p>
          <p className="font-clash">Dashboard</p>
        </div>
      </div>

      <div className="relative " ref={dropdownRef}>
        <img
          src={getProfileImage()}
          alt="Profile"
          className="h-10 w-10 border-2 border-primary rounded-full object-cover cursor-pointer"
          onClick={toggleDropdown}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/default.avif";
          }}
        />

        {/* Dropdown */}
        {showDropdown && (
          <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow-md z-30 w-36 text-sm">
            <button
              onClick={goToProfile}
              className="block w-full px-4 py-2 text-left hover:bg-gray-100"
            >
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="block w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default DashboardNav;
