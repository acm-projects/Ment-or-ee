import React from "react";
import AutoProfile from "../../../assets/autoprofile.png";
import useConversation from "../../../store/useConversation";

const Conversation = ({ conversation, lastIdx, match }) => {
  // const { selectedConversation, setSelectedConversation } = useConversation();

  // const isSelected = selectedConversation?._id === conversation._id;
  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-[#D7CFC5] rounded p-2 py-1 cursor-pointer`}
      >
        {/* <div
        className={`flex gap-2 items-center hover:bg-[#D7CFC5] rounded p-2 py-1 cursor-pointer
        ${isSelected ? "bg-[#D7CFC5]" : ""}`}
        onClick={() => setSelectedConversation(conversation)}
      ></div> */}
        <div datatest-id="profile pic" className="">
          <div className="w-12 rounded-full">
            {/* <img
              src={conversation.photo_id}
              alt="profile pic"
              className="w-[50px] h-[50px] object-cover"
            /> */}
            <img
              src={AutoProfile} //find a better looking auto profile pic
              alt="Auto Profile"
              className="w-[50px] h-[50px] object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            {/* <p className="font-semibold text-black">{conversation.name}</p> */}
            <p className="font-semibold text-black">{match.name}</p>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default Conversation;
