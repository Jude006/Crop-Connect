import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { RiPlantLine, RiLeafLine } from "react-icons/ri";
import Button from "../ui/Button";

const Banner = () => {
  const { scrollYProgress } = useScroll();
  const yPos = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  return (
    <motion.section
      className="relative bg-[url('/farm-field.jpg')] bg-cover bg-center bg-no-repeat h-[70vh] min-h-[500px] max-h-[800px] flex items-center justify-center px-4 sm:px-6"
      style={{ y: yPos, opacity }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 15, 0],
            y: [0, -20, 0],
            rotate: [0, 3, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 left-1/4 text-white/10 text-[200px] md:text-[350px]"
        >
          <RiPlantLine />
        </motion.div>
        <motion.div
          animate={{
            x: [0, -15, 0],
            y: [0, 20, 0],
            rotate: [0, -2, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
          className="absolute bottom-1/4 right-1/4 text-white/10 text-[150px] md:text-[250px]"
        >
          <RiLeafLine />
        </motion.div>
      </div>

      {/* Color overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/90 to-primary/70"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center px-4 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <motion.span
            className="text-accent font-medium tracking-wider text-sm mb-3 block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            DIRECT FARM-TO-BUYER CONNECTIONS
          </motion.span>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5 leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.span
              className="inline-block"
              animate={{
                backgroundPosition: ["0%", "100%"],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
              }}
              style={{
                background: "linear-gradient(90deg, #ffffff, #FF7F50, #ffffff)",
                backgroundSize: "200% auto",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Connect With Us
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-white/90 text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Let's bridge the gap between farmers and buyers with transparent, efficient technology.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Button
            bgColor="bg-accent"
            text="Message Us"
            hover="hover:bg-accent/90 hover:shadow-lg"
            padding="px-8"
            py="py-3"
            onClick={() => document.getElementById("contact-form").scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          />
          <Button
            bgColor="bg-white/10 backdrop-blur-sm border border-white/20"
            text="Learn More"
            hover="hover:bg-white/20"
            padding="px-8"
            py="py-3"
            link="/about"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          />
        </motion.div>
      </div>

      {/* Stats ribbon */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-100 py-4"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, type: 'spring' }}
      >
        <div className="max-w-5xl mx-auto grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-4 px-4">
          {[
            { value: "24/7", label: "Support" },
            { value: "100%", label: "Verified" },
            { value: "500+", label: "Farms" },
            { value: "98%", label: "Satisfaction", hideOnMobile: true },
            { value: "1hr", label: "Response", hideOnMobile: true },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className={`flex flex-col items-center ${stat.hideOnMobile ? 'hidden sm:flex' : ''}`}
              whileHover={{ y: -3 }}
            >
              <span className="text-xl sm:text-2xl font-bold text-primary">{stat.value}</span>
              <span className="text-xs sm:text-sm text-gray-600">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Banner;