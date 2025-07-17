import React from 'react'

const Map = () => {
  return (
    <section className="bg-background py-12 px-4">
  <div className="max-w-6xl mx-auto text-center mb-8">
    <h2 className="text-2xl md:text-3xl font-bold text-primary font-clash">Our Reach</h2>
    <p className="text-gray-600 mt-2">Connecting farms and buyers across Nigeria</p>
  </div>
  <div className="h-96 w-full bg-gray-200 rounded-xl overflow-hidden">
    <iframe 
      src="https://www.google.com/maps/embed?pb=..."
      className="w-full h-full border-none"
      allowFullScreen
    ></iframe>
  </div>
</section>
  )
}

export default Map
