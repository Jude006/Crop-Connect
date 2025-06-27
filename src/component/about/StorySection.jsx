import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaHandshake, FaLeaf, FaChartLine, FaTractor } from 'react-icons/fa';
import { GiFarmer, GiWheat } from 'react-icons/gi';
import farmImage from '../../assets/images/produce.avif';

const StorySection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#f8faf5] to-[#e8f5e9] py-28 px-4 sm:px-8">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 120,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -left-40 -top-40 text-emerald-50 text-[400px]"
        >
          <GiWheat />
        </motion.div>
        
        <motion.div 
          animate={{
            y: [0, 40, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -right-20 bottom-1/4 text-emerald-100 text-[300px]"
        >
          <GiWheat />
        </motion.div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <motion.span 
            className="text-emerald-500 font-medium font-clash tracking-widest text-sm mb-4 block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            OUR JOURNEY
          </motion.span>
          
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-gray-90 font-clash">Cultivating</span>{' '}
            <motion.span 
              className="inline-block text-emerald-600 font-clash"
              animate={{ 
                backgroundPosition: ['0%', '100%'],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }}
              style={{
                background: 'linear-gradient(90deg, #10b981, #065f46, #10b981)',
                backgroundSize: '200% auto',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Connections
            </motion.span>
          </motion.h2>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            <motion.p
              className="text-lg sm:text-xl text-gray-700 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              FarmConnect emerged from a simple yet powerful vision — to <span className="font-semibold text-emerald-600">revolutionize Nigeria's agricultural supply chain</span>. We saw hardworking farmers struggling with market access while consumers faced rising food prices and quality concerns.
            </motion.p>
            
            <motion.p
              className="text-lg sm:text-xl text-gray-700 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Our platform <span className="font-semibold text-emerald-600">eliminates middlemen</span>, using technology to connect producers directly with buyers. The results? Farmers earn <span className="font-semibold">40% more</span> on average, while buyers save <span className="font-semibold">25%</span> on fresh, traceable produce.
            </motion.p>

            {/* Impact Stats */}
            <motion.div 
              className="grid md:grid-cols-2 grid-cols-1 gap-6 pt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {[
                { value: "500+", label: "Farmers Empowered", icon: <GiFarmer className="text-2xl text-emerald-600" /> },
                { value: "10K+", label: "Transactions", icon: <FaHandshake className="text-2xl text-emerald-600" /> },
                { value: "98%", label: "Freshness Guarantee", icon: <FaLeaf className="text-2xl text-emerald-600" /> },
                { value: "40%", label: "Income Increase", icon: <FaChartLine className="text-2xl text-emerald-600" /> }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4"
                >
                  <div className="p-3 rounded-full bg-emerald-50">
                    {stat.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{stat.value}</h3>
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image Composition */}
          <motion.div 
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative h-full min-h-[400px]"
          >
            <motion.div 
              className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring" }}
            >
              <img 
                src={farmImage} 
                alt="Farm produce" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            {/* Floating Testimonial Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute -bottom-10 -right-10 bg-white p-6 rounded-xl shadow-lg border border-gray-100 max-w-xs"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <FaTractor className="text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Oluwaseun K.</h4>
                  <p className="text-xs text-gray-500">Tomato Farmer, Oyo State</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm italic">
                "FarmConnect doubled my income by connecting me directly to Lagos markets. No more exploitative middlemen!"
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;