import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaLeaf, FaPercentage, FaExchangeAlt } from "react-icons/fa";
import { GiFarmer } from "react-icons/gi";
import { RiPlantLine } from "react-icons/ri";
import Button from "../ui/Button";

const LandingPage = () => {
  const { scrollYProgress } = useScroll();
  const yPos = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.03]);

  return (
    <div className="bg-[#fafdf5] overflow-hidden">
      {/* Main Hero Section */}
      <motion.div
        style={{ y: yPos, scale }}
        className="relative h-screen min-h-[600px] max-h-[1000px] flex items-center justify-center px-4 sm:px-6"
      >
        {/* Background Elements - Hidden on mobile */}
        <div className="absolute inset-0 overflow-hidden hidden sm:block">
          <motion.div
            animate={{
              x: [0, 25, 0],
              y: [0, -40, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/4 left-1/4 text-emerald-100 text-[150px] md:text-[300px]"
          >
            <RiPlantLine />
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 sm:mb-12"
          >
            <motion.span
              className="text-emerald-500 font-medium tracking-widest text-xs sm:text-sm mb-2 sm:mb-4 block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              THE FUTURE OF AGRICULTURE
            </motion.span>

            <motion.h1
              className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 leading-snug sm:leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <span className="text-gray-900">Reimagining</span>{" "}
              <motion.span
                className="inline-block text-emerald-600"
                animate={{
                  backgroundPosition: ["0%", "100%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear",
                }}
                style={{
                  background:
                    "linear-gradient(90deg, #10b981, #047857, #10b981)",
                  backgroundSize: "200% auto",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Farm-to-Table
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Connecting producers directly with consumers through
              blockchain-backed transparency.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4 pt-4"
          >
            <Button
              bgColor="bg-accent"
              link="/contact"
              text="Contact Us"
              hover="text-white"
              opacity="bg-opacity-90"
              padding="px-4"
              py="py-2"
            />
            <Button
              bgColor="border-2 border-primary"
              link="/buyer-dashboard/overview"
              text="Explore Platform"
              hover="bg-primary hover:text-primary "
              opacity="bg-opacity-90"
              padding="px-4"
              py="py-2"
            />
          </motion.div>
        </div>

        {/* Animated Stats Bar - Modified for mobile */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-100 py-4 sm:py-8"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 px-4 sm:px-6">
            {[
              {
                value: "500+",
                label: "Verified Farms",
                icon: (
                  <GiFarmer className="text-xl sm:text-2xl md:text-3xl text-emerald-600" />
                ),
              },
              {
                value: "98%",
                label: "Freshness",
                icon: (
                  <FaLeaf className="text-xl sm:text-2xl md:text-3xl text-emerald-600" />
                ),
              },
              {
                value: "24h",
                label: "Avg. Delivery",
                icon: (
                  <FaExchangeAlt className="text-xl sm:text-2xl md:text-3xl text-emerald-600" />
                ),
                hideOnMobile: true,
              },
              {
                value: "40%",
                label: "Cost Savings",
                icon: (
                  <FaPercentage className="text-xl sm:text-2xl md:text-3xl text-emerald-600" />
                ),
                hideOnMobile: true,
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: stat.hideOnMobile ? 0 : -5 }}
                className={`flex items-center gap-2 sm:gap-4 ${
                  stat.hideOnMobile ? "hidden sm:flex" : ""
                }`}
              >
                <div className="p-2 sm:p-3 rounded-full bg-emerald-50">
                  {stat.icon}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                    {stat.value}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
