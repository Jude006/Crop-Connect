import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({bgColor, hover, opacity,link,text,padding,icon, py}) => {
  return (
    <button className=''>
            <Link to={link}><p className={`font-clash hover:${hover} ${bgColor} hover:${opacity} ${padding} ${py} flex items-center gap-2 rounded-full duration-300 ease-linear`}>{text} {icon}</p></Link>
        </button>
  )
}

export default Button
