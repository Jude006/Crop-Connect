import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaHome, FaLeaf } from 'react-icons/fa' 

const NotFound = () => {
  const navigate = useNavigate()

  React.useEffect(() => {
    const timer = setTimeout(() => navigate('/'), 3000)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center bg-background text-text p-4"
    >
      {/* Animated 404 Text */}
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="text-center mb-8"
      >
        <motion.h1 
          className="text-9xl font-clash font-bold text-primary"
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          404
        </motion.h1>
        <p className="text-2xl font-satoshi mt-4">Oops! Farm not found</p>
      </motion.div>

      {/* Animated Leaf Illustration */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 3,
          ease: "easeInOut"
        }}
        className="mb-8"
      >
        <FaLeaf className="text-6xl text-accent" />
      </motion.div>

      {/* Manual Navigation Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/')}
        className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-satoshi"
      >
        <FaHome /> Return to Home
      </motion.button>

      {/* Redirect Countdown */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="font-satoshi mt-4 text-gray-500"
      >
        Redirecting in 3 seconds...
      </motion.p>
    </motion.div>
  )
}

export default NotFound