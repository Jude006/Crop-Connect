import React from 'react'
import {FaBell, FaCog, FaHeart, FaHome, FaShoppingBag, FaShoppingCart} from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'

const SideBar = ({setShowSideBar}) => {
  const location = useLocation()
  const isActive = (path)=> location.pathname == path;
  const closeBar = ()=>{
    if(window.innerWidth < 768){
      setShowSideBar(false)
    }
  }
  return (
    <aside className='w-72  h-screen max-h-screen fixed py-6 px-4 top-0 md:bg-background bg-white '>
     <Link to='/'>
      <h1 className='md:text-3xl text-2xl font-clash '>Crop <span className='text-primary font-clash'>Direct</span></h1>
     </Link>
     <div className='mt-10 flex flex-col gap-4 '>
      <Link onClick={closeBar} to='/buyer-dashboard/overview' className={`flex items-center gap-4 w-full py-2 px-3 ${isActive('/buyer-dashboard/overview') ? 'bg-green-100 rounded shadow-sm text-primary' : 'text-text'} `}>
        <FaHome className={`${isActive('/buyer-dashboard/overview') ? 'bg-green-200 p-1 rounded shadow-sm text-2xl' : 'p-1 rounded shadow-sm text-2xl bg-gray-200' }`} />
        <p className='font-clash'>Dashboard</p>
      </Link>
      <Link onClick={closeBar} to='/buyer-dashboard/products' className={`flex items-center gap-4 w-full py-2 px-3 ${isActive('/buyer-dashboard/products') ? 'bg-green-100 rounded shadow-sm text-primary' : 'text-text'} `}>
        <FaShoppingBag className={`${isActive('/buyer-dashboard/products') ? 'bg-green-200 p-1 rounded shadow-sm text-2xl' : 'p-1 rounded shadow-sm text-2xl bg-gray-200' }`} />
        <p className='font-clash'>Products</p>
      </Link>
      <Link onClick={closeBar} to='/buyer-dashboard/carts' className={`flex items-center gap-4 w-full py-2 px-3 ${isActive('/buyer-dashboard/carts') ? 'bg-green-100 rounded shadow-sm text-primary' : 'text-text'} `}>
        <FaShoppingCart className={`${isActive('/buyer-dashboard/carts') ? 'bg-green-200 p-1 rounded shadow-sm text-2xl' : 'p-1 rounded shadow-sm text-2xl bg-gray-200' }`} />
        <p className='font-clash'>My Cart</p>
      </Link>
      <Link onClick={closeBar} to='/buyer-dashboard/favourites' className={`flex items-center gap-4 w-full py-2 px-3 ${isActive('/buyer-dashboard/favourites') ? 'bg-green-100 rounded shadow-sm text-primary' : 'text-text'} `}>
        <FaHeart className={`${isActive('/buyer-dashboard/favourites') ? 'bg-green-200 p-1 rounded shadow-sm text-2xl' : 'p-1 rounded shadow-sm text-2xl bg-gray-200' }`} />
        <p className='font-clash'>Favourites</p>
      </Link>
      <Link onClick={closeBar} to='/buyer-dashboard/notifications' className={`flex items-center gap-4 w-full py-2 px-3 ${isActive('/buyer-dashboard/notifications') ? 'bg-green-100 rounded shadow-sm text-primary' : 'text-text'} `}>
        <FaBell className={`${isActive('/buyer-dashboard/notifications') ? 'bg-green-200 p-1 rounded shadow-sm text-2xl' : 'p-1 rounded shadow-sm text-2xl bg-gray-200' }`} />
        <p className='font-clash'>Notifications</p>
      </Link>
      <Link onClick={closeBar} to='/buyer-dashboard/settings' className={`flex items-center gap-4 w-full py-2 px-3 ${isActive('/buyer-dashboard/settings') ? 'bg-green-100 rounded shadow-sm text-primary' : 'text-text'} `}>
        <FaCog className={`${isActive('/buyer-dashboard/settings') ? 'bg-green-200 p-1 rounded shadow-sm text-2xl' : 'p-1 rounded shadow-sm text-2xl bg-gray-200' }`} />
        <p className='font-clash'>Settings</p>
      </Link>
     </div>
    </aside>
  )
}

export default SideBar
