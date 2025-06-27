// DashboardLayout.js
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import FarmerSideBar from './FarmerSideBar';
import DashboardNav from './DashboardNav';

const DashboardLayout = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      // On desktop, always show sidebar by default
      if (window.innerWidth >= 768) {
        setShowSideBar(true);
      }
    };

    // Initial check
    checkScreenSize();
    
    // Add resize listener
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const closeSideBar = () => {
    if (isMobile) {
      setShowSideBar(false);
    }
  };

  return (
    <section className='flex bg-background p-2'>
      {/* Desktop Sidebar (always visible) */}
      {!isMobile && showSideBar && (
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="hidden md:flex h-screen fixed"
        >
          <FarmerSideBar setShowSideBar={setShowSideBar} />
        </motion.div>
      )}

      {/* Mobile Sidebar (only when toggled) */}
      <AnimatePresence>
        {isMobile && showSideBar && (
          <motion.div

            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white"
            onClick={closeSideBar}
          >
            <motion.div
           
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <FarmerSideBar setShowSideBar={setShowSideBar} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className={`w-full bg-white rounded-xl min-h-screen  ${
        !isMobile && showSideBar ? 'md:ml-72' : 'md:ml-0'
      } transition-all duration-300`}>
        <DashboardNav setShowSideBar={setShowSideBar} showSideBar={showSideBar} />
        <Outlet />
      </main>
    </section>
  );
};

export default DashboardLayout;