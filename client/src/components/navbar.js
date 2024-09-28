import React from 'react'
import { FaCheck } from "react-icons/fa";
import { CiChat1 } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoPeople } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const navigate = useNavigate();
    
      const handleMatchClick = () => {
        navigate('/matches');
      };

      const handleTaskClick = () => {
        navigate('/tasks');
      };

      const handleChatClick = () => {
        navigate('/chat');
      };

      const handleProfileClick = () => {
        navigate('/profile');
      };
  
  return (
    <div className="fixed flex items-center justify-between top-0 right-20 px-6 py-4">
      <div className="flex items-center h-20 justify-center space-x-4 bg-[#1F2839] rounded-lg">
        <button onClick={handleMatchClick} className="flex h-20 flex-col items-center px-6 py-3 text-lg font-semibold text-white rounded-lg hover:bg-[#1A202C] focus:outline-none focus:ring-2 focus:ring-[#1F2839]">
            <IoPeople 
              size={30}
              className="matchicon"
              style={{color:'#FFFFF'}}
            />
            Matches
        </button>
        <button onClick={handleTaskClick} className="flex h-20 flex-col items-center px-6 py-3 text-lg font-semibold text-white rounded-lg hover:bg-[#1A202C] focus:outline-none focus:ring-2 focus:ring-[#1F2839]">
            <FaCheck 
              size={30}
              className="tasksicon"
              style={{color:'#FFFFF'}}
            />
            Tasks

        </button>
        <button onClick={handleChatClick} className="flex h-20 flex-col items-center px-6 py-3 text-lg font-semibold text-white rounded-lg hover:bg-[#1A202C] focus:outline-none focus:ring-2 focus:ring-[#1F2839]">
            <CiChat1 
              size={40}
              className="chaticon"
              style={{color:'#FFFFF'}}
            />
            Chat
        </button>
        <button onClick={handleProfileClick} className="flex h-20 flex-col items-center px-6 py-3 text-lg font-semibold text-white rounded-lg hover:bg-[#1A202C] focus:outline-none focus:ring-2 focus:ring-[#1F2839]">
            <div className="w-10 h-10 rounded-full bg-blue-500"></div>
            <div className="flex items-center">
              Me
              <IoMdArrowDropdown 
                size={30}
                className="profileicon"
                style={{color:'#FFFFF'}}
              />
            </div>
        </button>
      </div>
    </div>
  )
}

export default Navbar
