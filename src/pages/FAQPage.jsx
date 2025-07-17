import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';
import Button from '../component/ui/Button';

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I sell my crops as a farmer?",
      answer: "Sign up as a farmer, list your products with photos/prices, and buyers will contact you. We handle payments securely and transfer earnings to your bank account minus a small platform fee.",
      category: "farmers"
    },
    {
      question: "What fees does Crop Connect charge?",
      answer: "Farmers pay 3% per transaction (5% for free accounts). Buyers pay nothing except subscription fees for premium features.",
      category: "payments"
    },
    {
      question: "How are deliveries handled?",
      answer: "Farmers and buyers arrange logistics directly. We recommend using verified transport partners listed in your dashboard for reliability.",
      category: "logistics"
    },
    {
      question: "Can I upgrade my account later?",
      answer: "Yes! Go to 'Subscription' in your dashboard anytime to access premium features.",
      category: "accounts"
    },
    {
      question: "Is my payment information secure?",
      answer: "Absolutely. We use Paystack/Flutterwave for PCI-compliant payments and never store your bank details.",
      category: "payments"
    }
  ];

  // Group FAQs by category for better organization
  const categories = {
    farmers: faqs.filter(item => item.category === "farmers"),
    buyers: faqs.filter(item => item.category === "buyers"),
    payments: faqs.filter(item => item.category === "payments"),
    logistics: faqs.filter(item => item.category === "logistics")
  };

  return (
    <section className="py-16 px-4 sm:px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-4 font-clash">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600">
            Quick answers to common questions. Can't find what you need? <a href="/contact" className="text-accent underline">Contact us</a>.
          </p>
        </motion.div>

        {/* FAQ Categories */}
        <div className="space-y-12">
          {Object.entries(categories).map(([category, items]) => (
            items.length > 0 && (
              <motion.div 
                key={category}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-xl font-bold text-primary mb-6 capitalize border-b border-primary/20 pb-2 font-satoshi">
                  {category === "farmers" ? "For Farmers" : 
                   category === "buyers" ? "For Buyers" : 
                   category.replace("-", " ")}
                </h2>
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <motion.div 
                      key={index}
                      whileHover={{ scale: 1.01 }}
                      className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100"
                    >
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full flex justify-between items-center p-4 sm:p-6 text-left"
                      >
                        <h3 className="font-medium text-gray-900 sm:text-lg">
                          {item.question}
                        </h3>
                        {activeIndex === index ? (
                          <RiArrowUpSFill className="text-primary text-xl" />
                        ) : (
                          <RiArrowDownSFill className="text-primary text-xl" />
                        )}
                      </button>
                      {activeIndex === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="px-4 sm:px-6 pb-4 sm:pb-6"
                        >
                          <p className="text-gray-600">{item.answer}</p>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 bg-primary/5 border border-primary/10 rounded-xl p-8 text-center"
        >
          <h3 className="text-xl font-bold text-primary mb-4">Still have questions?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our team is ready to help you get the most out of Crop Connect.
          </p>
          <Button
            bgColor="bg-accent"
            text="Contact Support"
            link="/contact"
            hover="hover:bg-accent/90"
            padding="px-6"
            py="py-3"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default FAQPage;