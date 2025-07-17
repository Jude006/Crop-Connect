import React from "react";
import Button from "../ui/Button";

const ContactCTA = () => {
  return (
    <section className="bg-primary text-white py-24 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-clash">
          Ready to Grow Your Farm's Reach?
        </h2>
        <p className="text-white/90 mb-8 text-lg">
          Join Crop Connect today and start trading effortlessly.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            padding="px-6"
            py="py-2"
            bgColor="bg-accent"
            text="Sign Up as Farmer"
            link="/farmer-dashboard/overview"
            hover="hover:bg-accent/90"
          />
          <Button
            padding="px-6"
            py="py-2"
            bgColor="bg-white text-primary"
            text="Browse as Buyer"
             link="/buyer-dashboard/overview"
            hover="hover:bg-gray-100"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
