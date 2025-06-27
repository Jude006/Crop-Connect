import React from 'react';
import { FaHome, FaLeaf, FaClipboardList, FaChartLine, FaBell, FaCog } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const FarmerSideBar = ({ setShowSideBar }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  
  const closeBar = () => {
    if (window.innerWidth < 768) setShowSideBar(false);
  };

  return (
    <aside className='w-72 h-screen max-h-screen fixed py-6 px-4 top-0 '>
      <Link to='/'>
        <h1 className='text-2xl font-clash'>Crop <span className='text-primary font-clash'>Direct</span></h1>
      </Link>
      
      <div className='mt-10 flex flex-col gap-4'>
        {/* Dashboard */}
        <Link 
          to='/farmer-dashboard/overview' 
          onClick={closeBar}
          className={`flex items-center gap-4 py-2 px-3 ${isActive('/farmer-dashboard/overview') ? 'bg-green-100 text-primary' : 'text-gray-700'}`}
        >
          <FaHome className={`p-1 rounded text-2xl ${isActive('/farmer-dashboard/overview') ? 'bg-green-200' : 'bg-gray-200'}`} />
          <p className='font-clash'>Dashboard</p>
        </Link>

        {/* My Products */}
        <Link 
          to='/farmer-dashboard/products' 
          onClick={closeBar}
          className={`flex items-center gap-4 py-2 px-3 ${isActive('/farmer-dashboard/products') ? 'bg-green-100 text-primary' : 'text-gray-700'}`}
        >
          <FaLeaf className={`p-1 rounded text-2xl ${isActive('/farmer-dashboard/products') ? 'bg-green-200' : 'bg-gray-200'}`} />
          <p className='font-clash'>My Products</p>
        </Link>

        {/* Orders */}
        <Link 
          to='/farmer-dashboard/orders' 
          onClick={closeBar}
          className={`flex items-center gap-4 py-2 px-3 ${isActive('/farmer-dashboard/orders') ? 'bg-green-100 text-primary' : 'text-gray-700'}`}
        >
          <FaClipboardList className={`p-1 rounded text-2xl ${isActive('/farmer-dashboard/orders') ? 'bg-green-200' : 'bg-gray-200'}`} />
          <p className='font-clash'>Orders</p>
        </Link>

        {/* Sales & Earnings */}
        <Link 
          to='/farmer-dashboard/earnings' 
          onClick={closeBar}
          className={`flex items-center gap-4 py-2 px-3 ${isActive('/farmer-dashboard/earnings') ? 'bg-green-100 text-primary' : 'text-gray-700'}`}
        >
          <FaChartLine className={`p-1 rounded text-2xl ${isActive('/farmer-dashboard/earnings') ? 'bg-green-200' : 'bg-gray-200'}`} />
          <p className='font-clash'>Earnings</p>
        </Link>

        {/* Notifications */}
        <Link 
          to='/farmer-dashboard/notifications' 
          onClick={closeBar}
          className={`flex items-center gap-4 py-2 px-3 ${isActive('/farmer-dashboard/notifications') ? 'bg-green-100 text-primary' : 'text-gray-700'}`}
        >
          <FaBell className={`p-1 rounded text-2xl ${isActive('/farmer-dashboard/notifications') ? 'bg-green-200' : 'bg-gray-200'}`} />
          <p className='font-clash'>Notifications</p>
        </Link>

        {/* Settings */}
        <Link 
          to='/farmer-dashboard/settings' 
          onClick={closeBar}
          className={`flex items-center gap-4 py-2 px-3 ${isActive('/farmer-dashboard/settings') ? 'bg-green-100 text-primary' : 'text-gray-700'}`}
        >
          <FaCog className={`p-1 rounded text-2xl ${isActive('/farmer-dashboard/settings') ? 'bg-green-200' : 'bg-gray-200'}`} />
          <p className='font-clash'>Settings</p>
        </Link>
      </div>
    </aside>
  );
};

export default FarmerSideBar;