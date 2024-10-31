import React from "react";
import Chatbody from "./Chatbody";
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti";

function ChatBox({ user }) {
  const noChatSelected = false;
  return (
    <div className="md:min-w-[450px] flex flex-col h-[600px]">
      {noChatSelected ? (
        <NoChatSelect />
      ) : (
        <>
          <div
            data-testid={"header"}
            className="bg-[#B89C75] w-full p-1 pt-4 px-4 mb-2"
          >
            <span className="label-text text-xl">To:</span>{" "}
            <span className="p-2 pl-4 pt-4 text-2xl mb-2 text-gray-900 font-semibold">
              John Doe
            </span>
          </div>
          <Chatbody />
          <MessageInput />
        </>
      )}
    </div>
  );
}

export default ChatBox;

const NoChatSelect = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-black font-semibold flex flex-col items-center gap-2">
        <p>Welcome John Doe</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
