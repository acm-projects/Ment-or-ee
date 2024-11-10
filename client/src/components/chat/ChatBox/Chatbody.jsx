import React from "react";
import AutoProfile from "../../../assets/autoprofile.png";

const Chatbody = ({ messages, curUser }) => {
  return (
    <div className="px-4 flex-1 overflow-y-auto">
      <div className="py-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 ${
              msg.fromSelf
                ? "text-right flex items-start mb-2 gap-2.5"
                : "text-left flex items-start mb-2 gap-2.5"
            }`}
          >
            {/* <img
              src={msg.from === "You" ? AutoProfile : msg.profilePicture} // find a better looking auto profile
              alt={msg.from}
              className="w-[50px] h-[50px] object-cover"
            /> */}
            {/* <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-3 bg-[#1F2839] rounded-e-xl rounded-es-xl">
              <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                {msg.message}
              </p>
            </div> */}
            <div
              className={`inline-block p-2 rounded-lg ${
                msg.fromSelf
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <p className="text-sm font-normal py-2.5">{msg.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chatbody;
