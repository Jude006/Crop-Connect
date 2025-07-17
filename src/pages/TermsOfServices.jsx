import React from 'react';
import { motion } from 'framer-motion';

const TermsOfServices = () => {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-16 px-4 sm:px-6 bg-background"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-4 font-clash">
            Terms of Service
          </h1>
          <p className="text-gray-600">
            Effective Date: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg text-gray-700 max-w-none">
          <h2 className="text-xl font-bold text-primary mt-8 mb-4 font-satoshi">1. Platform Usage</h2>
          <p>
            By using Crop Connect, you agree:
          </p>
          <ul>
            <li>Farmers accurately represent crop quality/quantity.</li>
            <li>Buyers pay within 24 hours of order confirmation.</li>
            <li>No fraudulent transactions (will result in account termination).</li>
          </ul>

          <h2 className="text-xl font-bold text-primary mt-8 mb-4 font-satoshi">2. Fees & Payments</h2>
          <ul>
            <li>Farmers pay <strong>3-5% transaction fees</strong> (deducted automatically).</li>
            <li>Chargebacks may incur ₦5,000 penalty fee.</li>
            <li>All prices are in Naira (NGN).</li>
          </ul>

          <h2 className="text-xl font-bold text-primary mt-8 mb-4 font-satoshi">3. Disputes</h2>
          <p>
            Crop Connect is <strong>not liable</strong> for:
          </p>
          <ul>
            <li>Farmers failing to deliver crops as described.</li>
            <li>Buyers refusing to accept valid deliveries.</li>
            <li>Third-party logistics issues.</li>
          </ul>
          <p>
            Report disputes within <strong>7 days</strong> via the platform.
          </p>

          <h2 className="text-xl font-bold text-primary mt-8 mb-4 font-satoshi">4. Account Termination</h2>
          <p>
            We may suspend accounts for:
          </p>
          <ul>
            <li>Violating Nigerian agricultural trading laws.</li>
            <li>Multiple complaints from other users.</li>
            <li>Chargeback abuse.</li>
          </ul>

          <div className="mt-12 bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-bold text-primary mb-2">Acceptance Required</h3>
            <p className="mb-4">
              By signing up, you confirm acceptance of these terms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="/signup" 
                className="bg-primary text-white px-6 py-3 rounded-lg text-center hover:bg-primary/90 transition-colors"
              >
                I Accept - Continue to Sign Up
              </a>
              <a 
                href="/contact" 
                className="border border-primary text-primary px-6 py-3 rounded-lg text-center hover:bg-primary/10 transition-colors"
              >
                Ask Questions
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default TermsOfServices;