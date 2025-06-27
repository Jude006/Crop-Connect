import React from 'react'
import Navbar from '../component/ui/Navbar'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../component/ui/Footer'

const AppLayout = () => {
    const hideNavbar = ['/auth/login', '/auth/signup', '/buyer-dashboard/' , '/farmer-dashboard/']
  const location = useLocation()
  const shouldHideNavbar = hideNavbar.some(route => location.pathname.startsWith(route))
 
  return (
    <div>
    {!shouldHideNavbar &&  <Navbar />}
      <main className='flex-grow'>
        <Outlet />
      </main>
       {!shouldHideNavbar && <Footer />}
    </div>
  )
}

export default AppLayout
