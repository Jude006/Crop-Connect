import React from 'react';
import { motion } from 'framer-motion';
import { FaTruck, FaHandHoldingUsd, FaShieldAlt } from 'react-icons/fa';

const ValueProps = () => {
  const features = [
    {
      icon: <FaTruck className="text-3xl" />,
      title: "Fast Delivery",
      desc: "Get farm-fresh produce within 24 hours in major cities"
    },
    {
      icon: <FaHandHoldingUsd className="text-3xl" />,
      title: "Fair Prices",
      desc: "Farmers earn 30% more, buyers save 20% on average"
    },
    {
      icon: <FaShieldAlt className="text-3xl" />,
      title: "Verified Quality",
      desc: "Every product undergoes 3-step quality checks"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-clash font-bold text-primary mb-4">
            Why Choose <span className="text-accent">CropDirect</span>?
          </h2>
          <p className="text-gray-600 font-satoshi">
            We're revolutionizing Nigeria's agricultural supply chain with transparency and technology
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-background rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
            >
              <div className="text-accent mb-4">{feature.icon}</div>
              <h3 className="font-clash text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600 font-satoshi">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Animated Stats Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-10 bg-primary/5 rounded-2xl p-8 md:p-12 border border-primary/10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <StatItem number="500+" label="Farmers" delay={0} />
            <StatItem number="10,000+" label="Customers" delay={0.1} />
            <StatItem number="50+" label="Cities" delay={0.2} />
            <StatItem number="98%" label="Satisfaction" delay={0.3} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const StatItem = ({ number, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
  >
    <div className="text-3xl md:text-4xl font-clash font-bold text-primary">{number}</div>
    <div className="text-gray-600 font-satoshi mt-2">{label}</div>
  </motion.div>
);

export default ValueProps;