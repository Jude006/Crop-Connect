import React from 'react'
import LandingPage from '../component/home/LandingPage'
import ValueProps from '../component/home/ValueProps'
import FeaturedProducts from '../component/home/FeauturedProducts'
import Testimonials from '../component/home/Testimonials'
import CTA from '../component/home/CTA'

const Home = () => {
  return (
    <>
    <LandingPage />
    <ValueProps />
    <FeaturedProducts />
    <Testimonials />
    <CTA />
    </>
  )
}

export default Home
