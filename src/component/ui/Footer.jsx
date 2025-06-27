import React from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-background text-text pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <FaLeaf className="text-accent text-2xl" />
              <span className="font-clash text-primary font-bold text-2xl">CropDirect</span>
            </div>
            <p className="font-satoshi ">
              Connecting Nigerian farmers directly with buyers for fairer prices and fresher produce.
            </p>
            <div className="flex gap-4 pt-2">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, index) => (
                <motion.a
                  key={index}
                  whileHover={{ y: -3, scale: 1.1 }}
                  href="#"
                  className="bg-gray-800 hover:bg-accent w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                >
                  <Icon className="text-white text-sm" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-clash font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3 font-satoshi ">
              {['About Us', 'How It Works', 'Pricing', 'Blog'].map((item, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-accent transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-clash font-bold text-lg mb-4">Products</h3>
            <ul className="space-y-3 font-satoshi ">
              {['Vegetables', 'Fruits', 'Grains', 'Livestock', 'Dairy'].map((item, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-accent transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="font-clash font-bold text-lg">Contact Us</h3>
            <div className="space-y-3 font-satoshi ">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-accent mt-1" />
                <p>1 Idownu Crescent Street, sango ota, Ogun, Nigeria</p>
              </div>
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-accent" />
                <a href="tel:+2348123456789" className="hover:text-accent transition-colors">+234 8068078495</a>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-accent" />
                <a href="mailto:hello@cropdirect.ng" className="hover:text-accent transition-colors">@cropdirect.ng</a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="font-satoshi text-gray-500 text-sm mb-4 md:mb-0"
          >
            © {new Date().getFullYear()} CropDirect. All rights reserved.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex gap-6"
          >
            <a href="#" className="font-satoshi text-gray-500 hover:text-accent text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="font-satoshi text-gray-500 hover:text-accent text-sm transition-colors">Terms of Service</a>
            <a href="#" className="font-satoshi text-gray-500 hover:text-accent text-sm transition-colors">FAQ</a>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 