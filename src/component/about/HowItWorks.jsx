import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaLeaf, FaSearch, FaShoppingCart, FaTruck, FaCheckCircle } from 'react-icons/fa';

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaLeaf />,
      title: "Farmers List Produce",
      description: "Upload fresh crops with photos, prices, and location details",
      color: "from-emerald-400 to-emerald-600",
      delay: 0.1
    },
    {
      icon: <FaSearch />,
      title: "Buyers Browse Marketplace",
      description: "Search and filter by location, price, and freshness",
      color: "from-blue-400 to-blue-600",
      delay: 0.2
    },
    {
      icon: <FaShoppingCart />,
      title: "Secure Checkout",
      description: "Add to cart and pay securely via Paystack",
      color: "from-accent to-primary",
      delay: 0.3
    },
    {
      icon: <FaTruck />,
      title: "Direct Delivery",
      description: "Farmers ship directly or through our partners",
      color: "from-purple-400 to-purple-600",
      delay: 0.4
    },
    {
      icon: <FaCheckCircle />,
      title: "Quality Confirmation",
      description: "Buyers confirm receipt, farmers get paid instantly",
      color: "from-green-400 to-green-600",
      delay: 0.5
    }
  ];

  return (
    <section className="relative bg-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="absolute left-10 top-1/4 text-emerald-50 text-[200px] md:text-[400px]"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <FaLeaf />
        </motion.div>
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <motion.span 
            className="text-emerald-500 font-medium tracking-widest text-xs sm:text-sm mb-4 block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            THE PROCESS
          </motion.span>
          
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-gray-900">How It </span>
            <motion.span 
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-700"
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
                backgroundSize: '200% auto',
              }}
            >
              Works
            </motion.span>
          </motion.h2>

          <motion.p
            className="text-gray-600 max-w-2xl mx-auto text-lg sm:text-xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            A transparent, efficient process benefiting both farmers and buyers
          </motion.p>
        </motion.div>

        {/* Process steps - Vertical Timeline */}
        <div className="relative">
          {/* Animated center line */}
          <motion.div 
            className="hidden lg:block absolute left-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-emerald-100 to-transparent"
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          />

          <div className="grid gap-16">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: step.delay,
                  ease: [0.16, 1, 0.3, 1]
                }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative"
              >
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
                  {/* Left side (desktop) */}
                  {index % 2 === 0 && (
                    <div className="hidden lg:block lg:w-1/2">
                      <motion.div 
                        className="h-full flex justify-end pr-16"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: step.delay + 0.1 }}
                      >
                        <div className="w-full max-w-md">
                          <div className={`aspect-video bg-gradient-to-br ${step.color} rounded-2xl shadow-xl flex items-center justify-center`}>
                            <div className="text-white text-4xl">
                              {step.icon}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  )}

                  {/* Center indicator */}
                  <div className="relative z-10 flex-shrink-0">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg border-4 border-white`}
                    >
                      <span className="text-white text-xl font-bold">{index + 1}</span>
                    </motion.div>
                  </div>

                  {/* Right side content */}
                  <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pl-16' : 'lg:pr-16'}`}>
                    <motion.div
                      className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
                      initial={{ opacity: 0, x: index % 2 === 0 ? 40 : -40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: step.delay + 0.2 }}
                    >
                      <div className={`mb-4 text-2xl ${step.color.replace('from-', 'text-').replace(' to-', '-')}`}>
                        {step.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </motion.div>
                  </div>

                  {/* Left side (mobile) */}
                  {index % 2 !== 0 && (
                    <div className="lg:hidden w-full mt-8">
                      <div className={`aspect-video bg-gradient-to-br ${step.color} rounded-2xl shadow-xl flex items-center justify-center`}>
                        <div className="text-white text-4xl">
                          {step.icon}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Connector arrow */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center pt-8">
                    <motion.div
                      animate={{ y: [0, 10, 0] }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="text-emerald-400"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14M19 12l-7 7-7-7"/>
                      </svg>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;