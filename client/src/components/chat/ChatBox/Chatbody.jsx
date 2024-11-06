import React from "react";
import AutoProfile from "../../../assets/autoprofile.png";

const Chatbody = ({ messages }) => {
  return (
    <div className="px-4 flex-1 overflow-y-auto">
      <div className="py-4">
        {messages.map((msg, index) => (
          <div key={index} className="flex items-start mb-2 gap-2.5">
            <img
              src={msg.from === "You" ? AutoProfile : msg.profilePicture} // find a better looking auto profile
              alt={msg.from}
              className="w-[50px] h-[50px] object-cover"
            />
            <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-3 bg-[#1F2839] rounded-e-xl rounded-es-xl">
              <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                {msg.message}
              </p>
              {/* <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  11:46
                </span>
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chatbody;
