import React from "react";
import { motion } from "framer-motion";
import { FaLeaf, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
const CTA = () => {
  return (
    <section className="relative py-24 bg-primary overflow-hidden">
      {/* Floating Farm Elements */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-10 text-white/10 text-8xl"
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
          delay: 0.5,
        }}
        className="absolute bottom-10 right-20 text-white/10 text-9xl"
      >
        <FaLeaf />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-clash font-bold text-white mb-6">
            Ready to transform Nigeria's agricultural market?
          </h2>
          <p className="text-white/90 font-satoshi text-lg mb-8">
            Join over 500 farmers and 10,000 buyers creating a fairer food
            ecosystem.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to='/auth/signup'>
              <motion.button
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-full font-satoshi font-bold shadow-lg flex items-center gap-2"
              >
                Sign Up as Farmer <FaArrowRight />
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-full font-satoshi font-bold shadow-lg"
            >
              Browse Products
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
export default CTA;
