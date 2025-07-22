import React, {useState} from 'react'
import { menuItems } from '../assets/assets'
import { Link } from 'react-router-dom'

const SideBar = () => {

    const [activeLink, setActiveLink] = useState(0)
    
    const handleClick = (index) => {
        setActiveLink(index)
    }
  return (
    <div className="fixed top-6 z-10 h-full px-2 bg-start w-12 md:w-52">
      <div className='mb-8'>
        <h1 className='hidden md:block text-2xl font-bold text-yellow-400 font-serif'>Excel<span className='text-gray-950 text-md'>Analytics.</span></h1>
        <h1 className='text-yellow-400 text-xl w-8 flex justify-center md:hidden'>E <span className='text-black'>A</span></h1>
      </div>
      {/* Navigation Links */}
      <ul className='mt-2 space-y-4'>
        <p className='hidden md:flex font-small text-gray-400 mt-6'>General</p>
        {menuItems.map((link, index) => (
            <li key={index} 
                className={`font-medium rounded-md py-2 px-5  hover:text-yellow-400 ${activeLink === index ? "text-yellow-400": ""}`}
                onClick={() => handleClick(index)}
            >
                <Link to={link.path} className='flex justify-center md:justify-start items-center md:space-x-5'>
                    <span>{link.icon}</span>
                    <span className="transition-all hidden text-sm  md:flex">
                        {link.name}
                    </span>
                </Link>
            </li>
        ))}
      </ul>
    </div>
  )
}

export default SideBar
