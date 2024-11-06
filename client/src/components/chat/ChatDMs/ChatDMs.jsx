import React from "react";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";

function ChatDMs({ match }) {
  return (
    <div>
      <div data-testid={"header"} className="bg-[#B89C75] w-full ">
        <h1 className="items-center p-1 pt-4 text-2xl text-black font-semibold mb-2 text-center">
          Chats
        </h1>
      </div>
      <div className="p-4 pt-2 flex flex-col">
        {/* <SearchInput /> */}
        <div className="divider px-3"></div>
        <div data-testid={"conversations"}>
          <Conversations match={match} />
        </div>
      </div>
    </div>
  );
}

export default ChatDMs;
