import React from 'react';
//import logo from '../assets/logo.png'  
import {AiOutlineSearch} from 'react-icons/ai'

const Navbar = () => {
  return (
    <nav className="w-full h-[80px] bg-white border-b border-gray-300 shadow-sm">
      <div className="max-w-[1480px] mx-auto w-full h-full flex justify-between items-center px-4">
        {/* <img src={logo} className="h-[25px]" /> */}
        <div className='flex items-center'>
          <ul className="flex space-x-4">
            <li>Home</li>
            <li>Matches</li>
            <li>Tasks</li>
            <li>Chat</li>
            <li>Profile</li>
            <AiOutlineSearch 
                size={20}
                className="icon"
                style={{color:'#000'}}
            />
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;

