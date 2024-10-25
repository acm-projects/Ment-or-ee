import React from "react";
import SearchInput from "./SearchInput";

function ChatDMs() {
  return (
    <div className="items-center">
      <div data-testid={"header"} className="bg-[#B89C75] w-full ">
        <h1 className=" pt-4 text-2xl text-black font-semibold mb-2 text-center">
          Chats
        </h1>
      </div>
      <SearchInput />
      <div className="divider px-3"></div>
      <div data-testid={"conversations"}>{/* <Conversations /> */}</div>
    </div>
  );
}

export default ChatDMs;
