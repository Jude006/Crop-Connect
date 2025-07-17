import React from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import {
  FiMail,
  FiPhone,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
} from "react-icons/fi";

const ContactMethods = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.section
      className="py-16 px-4 sm:px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Contact Form */}
      <motion.div
        id="contact-form"
        className="bg-white p-8 rounded-xl shadow-lg"
        variants={itemVariants}
      >
        <h2 className="text-2xl font-bold text-primary mb-6 font-satoshi">
          Send Us a Message
        </h2>
        <form className="space-y-4">
          <motion.div variants={itemVariants}>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary transition-all"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary transition-all"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary transition-all">
              <option>I am a...</option>
              <option>Farmer</option>
              <option>Buyer</option>
            </select>
          </motion.div>

          <motion.div variants={itemVariants}>
            <textarea
              placeholder="Your Message"
              rows="5"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary transition-all"
            ></textarea>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Button
              padding="px-6"
              py="py-2"
              bgColor="bg-primary text-white"
              text="Submit"
              hover="hover:bg-primary/90"
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            />
          </motion.div>
        </form>
      </motion.div>

      {/* Contact Info */}
      <motion.div className="space-y-8" variants={itemVariants}>
        <motion.div
          className="bg-white p-6 rounded-xl shadow-lg"
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3 className="text-xl font-bold text-primary mb-4 font-satoshi">
            Other Ways to Reach Us
          </h3>
          <div className="space-y-4">
            <motion.div
              className="flex items-center gap-4 p-3 hover:bg-primary/5 rounded-lg transition-colors"
              whileHover={{ x: 5 }}
            >
              <div className="bg-primary/10 p-3 rounded-full">
                <FiMail className="text-primary text-xl" />
              </div>
              <div>
                <p className="font-medium">Email Us</p>
                <a
                  href="mailto:help@cropconnect.com"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  help@cropconnect.com
                </a>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center gap-4 p-3 hover:bg-primary/5 rounded-lg transition-colors"
              whileHover={{ x: 5 }}
            >
              <div className="bg-primary/10 p-3 rounded-full">
                <FiPhone className="text-primary text-xl" />
              </div>
              <div>
                <p className="font-medium">Call Us</p>
                <a
                  href="tel:+1234567890"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-xl shadow-lg"
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3 className="text-xl font-bold text-primary mb-4 font-satoshi">
            Follow Us
          </h3>
          <div className="flex gap-4">
            {[
              { icon: <FiFacebook className="text-xl" />, name: "Facebook" },
              { icon: <FiTwitter className="text-xl" />, name: "Twitter" },
              { icon: <FiInstagram className="text-xl" />, name: "Instagram" },
              { icon: <FiLinkedin className="text-xl" />, name: "LinkedIn" },
            ].map((social, index) => (
              <motion.a
                key={index}
                href="#"
                className="bg-primary/10 p-3 rounded-full hover:bg-primary/20 text-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={social.name}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* FAQ Prompt */}
        <motion.div
          className="bg-background p-6 rounded-xl shadow-lg border border-gray-100"
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3 className="text-lg font-bold text-primary mb-2 font-satoshi">
            Need Help?
          </h3>
          <p className="text-gray-600 mb-4">
            Check our{" "}
            <a
              href="/faq"
              className="text-accent underline hover:text-accent/80 transition-colors"
            >
              FAQ page
            </a>{" "}
            for quick answers.
          </p>
          <Button
            bgColor="bg-accent/10 text-accent border border-accent"
            text="Visit FAQ"
            link="/faq"
            hover="hover:bg-accent/20"
            padding="px-4 py-2"
            size="text-sm"
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default ContactMethods;
