import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('right');

  const testimonials = [
    {
      id: 1,
      quote: "Since joining CropDirect, my farm revenue increased by 40% while reaching customers I never could before.",
      name: "Oluwaseun K.",
      role: "Tomato Farmer, Oyo",
      rating: 5,
      image: "/images/farmer.jpg"
    },
    {
      id: 2,
      quote: "The quality and freshness surpasses anything I've found in local markets. My restaurant customers can taste the difference.",
      name: "Amina Bello",
      role: "Chef, Lagos",
      rating: 5,
      image: "/chef-1.jpg"
    },
    {
      id: 3,
      quote: "As a grocery chain, we now source 60% of our produce through CropDirect. The verification system eliminates quality surprises.",
      name: "Chukwuemeka O.",
      role: "Grocer, Abuja",
      rating: 4,
      image: "/buyer-1.jpg"
    }
  ];

  const nextTestimonial = () => {
    setDirection('right');
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection('left');
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-clash font-bold text-primary mb-4">
            Voices from Our <span className="text-accent">Community</span>
          </h2>
          <p className="text-gray-600 font-satoshi max-w-2xl mx-auto">
            Trusted by farmers and buyers across Nigeria
          </p>
        </motion.div>

        {/* Animated Testimonial Carousel */}
        <div className="relative h-[400px] md:h-[350px] flex items-center justify-center">
          {/* Navigation Arrows */}
          <button 
            onClick={prevTestimonial}
            className="absolute left-0 md:-left-10 z-20 bg-white p-3 rounded-full shadow-md border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <FaChevronLeft className="text-gray-700" />
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="absolute right-0 md:-right-10 z-20 bg-white p-3 rounded-full shadow-md border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <FaChevronRight className="text-gray-700" />
          </button>

          {/* Flipping Testimonial Card */}
          <div className="relative w-full max-w-2xl h-full perspective-1000">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                initial={{ rotateY: direction === 'right' ? 90 : -90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: direction === 'right' ? -90 : 90, opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 bg-white rounded-md shadow-sm p-8 md:p-10 border border-gray-100 backface-hidden"
              >
                <div className="h-full flex flex-col">
                  <FaQuoteLeft className="text-accent/30 text-4xl mb-6" />
                  <p className="text-gray-700 font-satoshi text-lg md:text-xl flex-grow">
                    {testimonials[currentIndex].quote}
                  </p>
                  
                  <div className="flex items-center gap-4 mt-8">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md">
                      <img 
                        src={testimonials[currentIndex].image} 
                        alt={testimonials[currentIndex].name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-clash font-bold text-gray-900">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-gray-500 font-satoshi text-sm">
                        {testimonials[currentIndex].role}
                      </p>
                      <div className="flex gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar 
                            key={i} 
                            className={i < testimonials[currentIndex].rating ? "text-yellow-500" : "text-gray-300"} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 'right' : 'left');
                setCurrentIndex(index);
              }}
              className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'bg-accent w-6' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;