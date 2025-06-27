import React from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaLinkedin, FaTwitter } from 'react-icons/fa';
import team1 from '../../assets/images/farmer.jpg';
import team2 from '../../assets/images/farmer.jpg';
import team3 from '../../assets/images/farmer.jpg';
import team4 from '../../assets/images/farmer.jpg';

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Adebayo Johnson",
      role: "Founder & CEO",
      image: team1,
      social: { linkedin: "#", twitter: "#" }
    },
    {
      name: "Chioma Eze",
      role: "Head of Operations",
      image: team2,
      social: { linkedin: "#", twitter: "#" }
    },
    {
      name: "Emeka Okafor",
      role: "Tech Lead",
      image: team3,
      social: { linkedin: "#", twitter: "#" }
    },
    {
      name: "Folake Adebayo",
      role: "Farm Relations",
      image: team4,
      social: { linkedin: "#", twitter: "#" }
    }
  ];

  return (
    <section className="relative bg-gray-50 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative elements */}
      <motion.div 
        className="absolute -left-20 -top-20 text-emerald-50 text-[300px] opacity-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <FaLeaf />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-16"
        >
          <motion.span 
            className="text-emerald-500 font-medium tracking-widest text-xs sm:text-sm mb-3 block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            OUR TEAM
          </motion.span>
          
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-gray-900">Meet The </span>
            <motion.span 
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-700"
              animate={{ 
                backgroundPosition: ['0%', '100%'],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }}
              style={{
                backgroundSize: '200% auto',
              }}
            >
              Visionaries
            </motion.span>
          </motion.h2>

          <motion.p
            className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            The passionate team revolutionizing agriculture in Nigeria
          </motion.p>
        </motion.div>

        {/* Team grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative group"
            >
              <div className="overflow-hidden rounded-xl shadow-md bg-white">
                {/* Image with hover effect */}
                <motion.div 
                  className="h-64 overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </motion.div>

                {/* Content */}
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-emerald-600 mb-4">{member.role}</p>
                  
                  {/* Social links */}
                  <div className="flex justify-center gap-3">
                    <motion.a
                      href={member.social.linkedin}
                      whileHover={{ y: -3 }}
                      className="text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      <FaLinkedin className="text-xl" />
                    </motion.a>
                    <motion.a
                      href={member.social.twitter}
                      whileHover={{ y: -3 }}
                      className="text-gray-500 hover:text-blue-400 transition-colors"
                    >
                      <FaTwitter className="text-xl" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;