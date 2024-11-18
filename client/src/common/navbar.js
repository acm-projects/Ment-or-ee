import React from "react";
import logo from "../assets/logo.svg";
import { FaCheck } from "react-icons/fa";
import { CiChat1 } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoPeople } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import AutoProfile from "../assets/autoprofile.png";
import LindaProfile from "../assets/lindagarcia.png";

const Navbar = () => {
  const navigate = useNavigate();

  const handleMatchClick = () => {
    navigate("/matches");
  };

  const handleTaskClick = () => {
    navigate("/tasks");
  };

  const handleChatClick = () => {
    navigate("/chat");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-[#1F2839] shadow-md z-50">
      {/* Navbar Container */}
      <div className="flex justify-between items-center w-full px-6 py-2">
        {/* Logo and Name inside the same navbar box */}
        <div className="flex items-center">
          <button
            onClick={() => navigate("/home")}
            className="flex items-center"
          >
            <img src={logo} alt="mentor/ee logo" className="h-16 w-auto mr-2" />
            <span className="text-3xl font-bold text-white">mentor/ee</span>
          </button>
        </div>

        {/* Navbar Buttons */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handleMatchClick}
            className="flex flex-col items-center py-2 px-6 text-base font-semibold text-white rounded-lg hover:bg-[#1A202C] focus:outline-none focus:ring-2 focus:ring-[#1F2839]"
          >
            <IoPeople size={25} />
            Matches
          </button>

          <button
            onClick={handleTaskClick}
            className="flex flex-col items-center py-2 px-6 text-base font-semibold text-white rounded-lg hover:bg-[#1A202C] focus:outline-none focus:ring-2 focus:ring-[#1F2839]"
          >
            <FaCheck size={25} />
            Tasks
          </button>

          <button
            onClick={handleChatClick}
            className="flex flex-col items-center py-2 px-6 text-base font-semibold text-white rounded-lg hover:bg-[#1A202C] focus:outline-none focus:ring-2 focus:ring-[#1F2839]"
          >
            <CiChat1 size={25} />
            Chat
          </button>

          <button
            onClick={handleProfileClick}
            className="flex flex-col items-center py-2 px-6 text-base font-semibold text-white rounded-lg hover:bg-[#1A202C] focus:outline-none focus:ring-2 focus:ring-[#1F2839]"
          >
            <img
              src={AutoProfile}
              alt="Profile"
              className="w-7 h-7 rounded-full object-cover bg-white"
            />
            <div className="flex items-center">Profile</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
