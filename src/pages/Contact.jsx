import React from 'react'
import Banner from '../component/contact/Banner'
import ContactMethods from '../component/contact/ContactMethods'
import Map from '../component/contact/Map'
import ContactCTA from '../component/contact/ContactCTA'

const Contact = () => {
  return (
    <div>
     <Banner />
     <ContactMethods />
     <Map />
     <ContactCTA />
    </div>
  )
}

export default Contact
