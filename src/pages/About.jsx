import React from 'react'
import LandingPage from '../component/about/LandingPage'
import StorySection from '../component/about/StorySection'
import HowItWorks from '../component/about/HowItWorks'
import ValuesSection from '../component/about/ValuesSection'
import TeamSection from '../component/about/TeamSection'

const About = () => {
  return (
    <>
     <LandingPage />
     <StorySection />
     <HowItWorks />
     <TeamSection />
     <ValuesSection />
    </>
  )
}

export default About











// // AboutPage.js
// import React from 'react';
// import AboutBanner from '../components/AboutBanner';
// import StorySection from '../components/StorySection';
// import HowItWorks from '../components/HowItWorks';
// import TeamSection from '../components/TeamSection';
// import ValuesSection from '../components/ValuesSection';

// const AboutPage = () => {
//   return (
//     <div className="bg-background">
//       <AboutBanner />
//       <StorySection />
//       <HowItWorks />
//       <TeamSection />
//       <ValuesSection />
      
//       {/* CTA Section */}
//       <section className="bg-accent/10 py-16">
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-3xl font-bold text-primary mb-6">Join the Agricultural Revolution</h2>
//           <div className="flex justify-center gap-4">
//             <button className="bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-accent/90 transition">
//               Register as Farmer
//             </button>
//             <button className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition">
//               Shop Fresh Produce
//             </button>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default AboutPage;