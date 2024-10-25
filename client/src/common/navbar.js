import React from "react";
import logo from "../assets/logo.svg";
import { FaCheck } from "react-icons/fa";
import { CiChat1 } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoPeople } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

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
    <div className="fixed flex justify-start top-0 left-0 w-full px-6 py-4">
      <div className="w-1/2">
        <button
          onClick={() => navigate("/menteehome")} //change this to /home
          className="flex items-center px-6 py-4"
        >
          <img src={logo} alt="mentor/ee logo" className="h-16 w-auto mr-2" />
          <span className="text-3xl font-bold text-gray-800">mentor/ee</span>
        </button>
      </div>

      <div className="flex absolute top-4 right-4 items-center px-6 py-4 h-16 justify-center space-x-4 bg-[#1F2839] rounded-lg">
        <button
          onClick={handleMatchClick}
          className="flex h-16 flex-col items-center py-2 px-6 text-base font-semibold text-white rounded-lg hover:bg-[#1A202C] focus:outline-none focus:ring-2 focus:ring-[#1F2839]"
        >
          <IoPeople
            size={25}
            className="matchicon"
            style={{ color: "#FFFFF" }}
          />
          Matches
        </button>
        <button
          onClick={handleTaskClick}
          className="flex h-16 flex-col items-center py-2 px-6 text-base font-semibold text-white rounded-lg hover:bg-[#1A202C] focus:outline-none focus:ring-2 focus:ring-[#1F2839]"
        >
          <FaCheck
            size={25}
            className="tasksicon"
            style={{ color: "#FFFFF" }}
          />
          Tasks
        </button>
        <button
          onClick={handleChatClick}
          className="flex h-16 flex-col items-center py-2 px-6  text-base font-semibold text-white rounded-lg hover:bg-[#1A202C] focus:outline-none focus:ring-2 focus:ring-[#1F2839]"
        >
          <CiChat1 size={25} className="chaticon" style={{ color: "#FFFFF" }} />
          Chat
        </button>
        <button
          onClick={handleProfileClick}
          className="flex h-16 flex-col items-center py-2 px-6 text-base font-semibold text-white rounded-lg hover:bg-[#1A202C] focus:outline-none focus:ring-2 focus:ring-[#1F2839]"
        >
          <div className="w-7 h-7 rounded-full bg-blue-500"></div>
          <div className="flex items-center">
            Me
            <IoMdArrowDropdown
              size={25}
              className="profileicon"
              style={{ color: "#FFFFF" }}
            />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
