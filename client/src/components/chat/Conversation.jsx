import React from "react";
import AutoProfile from "../../assets/autoprofile.png";

const Conversation = () => {
  return (
    <>
      <div className="flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer">
        <div className="">
          <div className="w-12 rounded-full">
            <img
              src={AutoProfile}
              alt="Auto Profile"
              className="w-[100px] h-[100px] object-cover"
            />
          </div>
        </div>
      </div>

      <div></div>
    </>
  );
};

export default Conversation;
