import React from "react";
import AutoProfile from "../../../assets/autoprofile.png";

const Conversation = ({ conversation, lastIdx }) => {
  return (
    <>
      <div className="flex gap-2 items-center hover:bg-[#D7CFC5] rounded p-2 py-1 cursor-pointer">
        <div datatest-id="profile pic" className="">
          <div className="w-12 rounded-full">
            <img
              src={AutoProfile} //find a better looking profile pic
              alt="Auto Profile"
              className="w-[50px] h-[50px] object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-semibold text-black">John Doe</p>
          </div>
        </div>
      </div>

      <div className="divider my-0 py-0 h-1" />
    </>
  );
};

export default Conversation;
