import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../src/component/ui/Button';

const PrivacyPolicy = () => {
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
            Privacy Policy
          </h1>
          <p className="text-gray-600">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg text-gray-700 max-w-none">
          <h2 className="text-xl font-bold text-primary mt-8 mb-4 font-satoshi">1. Information We Collect</h2>
          <p>
            When you use Crop Connect, we collect:
          </p>
          <ul>
            <li><strong>Account Data:</strong> Name, email, phone number, role (farmer/buyer).</li>
            <li><strong>Transaction Data:</strong> Crop listings, purchase history, payment details (processed via Paystack/Flutterwave).</li>
            <li><strong>Device Data:</strong> IP address, browser type for security monitoring.</li>
          </ul>

          <h2 className="text-xl font-bold text-primary mt-8 mb-4 font-satoshi">2. How We Use Your Data</h2>
          <p>
            We use your information to:
          </p>
          <ul>
            <li>Facilitate farmer-buyer transactions.</li>
            <li>Prevent fraud and comply with Nigerian financial regulations.</li>
            <li>Send service updates (no spam).</li>
          </ul>

          <h2 className="text-xl font-bold text-primary mt-8 mb-4 font-satoshi">3. Data Sharing</h2>
          <p>
            We <strong>never</strong> sell your data. Limited sharing occurs with:
          </p>
          <ul>
            <li>Payment processors (Paystack/Flutterwave) to complete transactions.</li>
            <li>Logistics partners for delivery coordination (only when you opt-in).</li>
          </ul>

          <h2 className="text-xl font-bold text-primary mt-8 mb-4 font-satoshi">4. Your Rights</h2>
          <p>
            You can:
          </p>
          <ul>
            <li>Request access to your data.</li>
            <li>Delete your account (except transaction records required by law).</li>
            <li>Opt-out of marketing emails.</li>
          </ul>

          <div className="mt-12 bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-bold text-primary mb-2">Contact Us</h3>
            <p className="mb-4">
              For privacy concerns, email <a href="mailto:privacy@cropconnect.com" className="text-accent">privacy@cropconnect.com</a>.
            </p>
            <Button
              bgColor="bg-primary"
              text="Contact Privacy Team"
              link="mailto:privacy@cropconnect.com"
              hover="hover:bg-primary/90"
              padding="px-4"
              py="py-2"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default PrivacyPolicy;