import React from "react";
import AutoProfile from "../../../assets/autoprofile.png";

const Message = () => {
  return (
    <div class="flex items-start mb-2 gap-2.5">
      <img
        src={AutoProfile} //find a better looking profile pic
        alt="Auto Profile"
        className="w-[50px] h-[50px] object-cover"
      />
      <div class="flex flex-col w-full max-w-[320px] leading-1.5 p-3 bg-[#1F2839] rounded-e-xl rounded-es-xl">
        <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
          That's awesome. I think our users will really appreciate the
          improvements.
        </p>
        <div class="flex items-center space-x-2 rtl:space-x-reverse">
          <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
            11:46
          </span>
        </div>
      </div>
    </div>
  );
};

export default Message;
