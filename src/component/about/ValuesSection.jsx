import React from 'react';
import { motion } from 'framer-motion';
import { FaHandshake, FaLeaf, FaChartLine, FaUsers } from 'react-icons/fa';

const ValuesSection = () => {
  const values = [
    {
      icon: <FaHandshake className="text-3xl" />,
      title: "Integrity",
      description: "We build trust through transparency in all transactions",
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
    {
      icon: <FaLeaf className="text-3xl" />,
      title: "Sustainability",
      description: "Promoting eco-friendly farming practices",
      color: "text-emerald-500",
      bg: "bg-emerald-50"
    },
    {
      icon: <FaChartLine className="text-3xl" />,
      title: "Growth",
      description: "Empowering farmers to scale their businesses",
      color: "text-amber-500",
      bg: "bg-amber-50"
    },
    {
      icon: <FaUsers className="text-3xl" />,
      title: "Community",
      description: "Strengthening agricultural communities",
      color: "text-purple-500",
      bg: "bg-purple-50"
    }
  ];

  return (
    <section className="relative bg-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative elements */}
      <motion.div 
        className="absolute -right-20 -bottom-20 text-emerald-50 text-[300px] opacity-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <FaLeaf />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-16"
        >
          <motion.span 
            className="text-emerald-500 font-medium tracking-widest text-xs sm:text-sm mb-3 block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            OUR VALUES
          </motion.span>
          
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-gray-900">What We </span>
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
              Stand For
            </motion.span>
          </motion.h2>
        </motion.div>

        {/* Values grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className={`h-full p-8 rounded-xl ${value.bg} transition-all hover:shadow-lg`}>
                <div className={`w-16 h-16 rounded-full ${value.bg} flex items-center justify-center mb-6 mx-auto`}>
                  <div className={value.color}>
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-center">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;