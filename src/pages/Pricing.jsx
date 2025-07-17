import React from "react";
import { motion } from "framer-motion";
import Button from "../../src/component/ui/Button";

const Pricing = () => {
  const plans = [
    {
      name: "Farmer Basic",
      price: "Free",
      fee: "3% per transaction",
      features: [
        "5 product listings",
        "Basic buyer matching",
        "Email support"
      ],
      cta: "Start Selling",
      bgColor: "bg-background"
    },
    {
      name: "Farmer Premium",
      price: "₦5,000/month",
      fee: "1% per transaction",
      features: [
        "Unlimited listings",
        "Featured placement",
        "Priority support",
        "Market analytics"
      ],
      cta: "Go Premium",
      bgColor: "bg-primary/10",
      popular: true
    },
    {
      name: "Wholesale Buyer",
      price: "₦3,000/month",
      fee: "No fees",
      features: [
        "Early harvest access",
        "Bulk pricing",
        "Dedicated account manager"
      ],
      cta: "Join as Buyer",
      bgColor: "bg-background"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
          Simple, Transparent Pricing
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Pay only for what you need. Grow your farm or business effortlessly.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            className={`${plan.bgColor} p-8 rounded-xl border border-gray-200 relative`}
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {plan.popular && (
              <span className="absolute top-0 right-6 bg-accent text-white px-3 py-1 rounded-b-lg text-sm">
                Most Popular
              </span>
            )}
            <h3 className="text-xl font-bold text-primary mb-2">{plan.name}</h3>
            <p className="text-2xl font-bold mb-4">{plan.price}</p>
            <p className="text-sm text-gray-500 mb-6">{plan.fee}</p>
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <Button
             padding="px-8"
            py="py-3"
              bgColor={plan.popular ? "bg-accent" : "bg-primary"}
              text={plan.cta}
              hover={plan.popular ? "hover:bg-accent/90" : "hover:bg-primary/90"}
              className="w-full"
            />
          </motion.div>
        ))}
      </div>

      {/* Enterprise/Contact CTA */}
      <div className="max-w-2xl mx-auto mt-16 bg-background p-8 rounded-xl text-center">
        <h3 className="text-xl font-bold text-primary mb-2">Need Custom Solutions?</h3>
        <p className="text-gray-600 mb-6">
          Contact us for cooperative or enterprise pricing.
        </p>
        <Button
         padding="px-8"
            py="py-3"
          bgColor="border-2 border-primary text-primary"
          text="Contact Sales"
          hover="hover:bg-primary hover:text-white"
          link="/contact"
        />
      </div>
    </section>
  );
};

export default Pricing;