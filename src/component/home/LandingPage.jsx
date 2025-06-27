import React from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaArrowRight, FaSellcast } from 'react-icons/fa';
import farmerImage from '../../assets/images/farmer.jpg'; 
import produceImage from '../../assets/images/produce.avif'; 
import Button from '../ui/Button';

const LandingPage = () => {
  return (
    <section className="relative overflow-hidden md:h-[90vh] h-fit bg-gradient-to-r from-green-50 to-background">
      {/* Animated Background Elements */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-16 md:py-16 flex flex-col md:flex-row items-center gap-12"
      >
        {/* Text Content */}
        <div className="md:w-1/2 space-y-6 z-10">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-clash font-bold text-primary"
          >
            Fresh Produce, <br />
            <span className="text-accent">Direct from Farms</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-600 font-satoshi max-w-lg"
          >
            Connecting Nigerian farmers with buyers nationwide. No middlemen. Better prices for everyone.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
                  <Button bgColor='bg-accent' link='/dashboard/shop' text='Shop Now' icon={<FaArrowRight />} hover='text-white' opacity='bg-opacity-90' padding='px-4' py='py-2'  />
                  <Button bgColor='border-2 border-primary' link='/dashboard/shop' text='Sell Crops' icon={<FaSellcast />} hover='bg-primary hover:text-white ' opacity='bg-opacity-90' padding='px-4' py='py-2'  />

          </motion.div>
          
          {/* Trust Indicators */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-6 pt-8"
          >
            <div className="flex items-center gap-2">
              <FaLeaf className="text-success" />
              <span className="font-satoshi">500+ Verified Farmers</span>
            </div>
            <div className="flex items-center gap-2">
              <FaLeaf className="text-success" />
              <span className="font-satoshi">Next-Day Delivery</span>
            </div>
          </motion.div>
        </div>

<div className="md:w-1/2 relative">
  {/* Modern Image Composition */}
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
    className="relative flex justify-center"
  >
    
    <div className="relative w-full max-w-md">
      {/* Image with subtle tilt and shadow */}
      <motion.img 
        src={farmerImage}
        alt="Happy farmer"
        className="w-full  object-cover h-[400px] md:h-[500px]"
        
      />
      
      {/* Decorative accent shape behind image */}
      <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full rounded-xl bg-accent/20"></div>
      
      {/* Floating Product Badge */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6 }}
        className="absolute -top-8 -right-8  bg-white p-3 rounded-full shadow-lg border border-gray-100 flex flex-col items-center justify-center w-20 h-20"
      >
        <FaLeaf className="text-success text-xl mb-1" />
        <span className="font-satoshi font-bold text-xs text-primary">100% Organic</span>
      </motion.div>
      
      {/* Farmer Info Card */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute -bottom-8 left-6 right-0  bg-white  p-4 max-w-xs border border-gray-100"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <img 
              src={farmerImage} 
              alt="Farmer" 
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div className="absolute -bottom-1 -right-1 bg-success w-3 h-3 rounded-full border border-white"></div>
          </div>
          <div>
            <h4 className="font-satoshi font-bold text-gray-800">Oluwaseun</h4>
            <p className="text-xs text-gray-500">Tomato Farmer since 2015</p>
          </div>
        </div>
        <div className="mt-2 flex justify-between items-center">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <FaLeaf key={i} className="text-success text-xs" />
            ))}
          </div>
          <span className="text-xs bg-green-50 text-success px-2 py-1 rounded">Verified</span>
        </div>
      </motion.div>
    </div>
  </motion.div>
</div>      </motion.div>

      {/* Animated Floating Elements */}
      <motion.div 
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-10 text-success opacity-20 text-6xl"
      >
        <FaLeaf />
      </motion.div>
      <motion.div 
        animate={{
          y: [0, 20, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
        className="absolute bottom-10 right-20 text-accent opacity-20 text-8xl"
      >
        <FaLeaf />
      </motion.div>
    </section>
  );
};

export default LandingPage;