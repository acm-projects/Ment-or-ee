import React from "react";

function ChatBox({ user }) {
  return (
    <div>
      <div data-testid={"header"} className="bg-[#B89C75] w-full">
        <h1 className="p-2 pl-4 pt-4 text-2xl text-black font-semibold mb-2">
          (profile pic)(person being dmed)
        </h1>
      </div>
      <div data-testid={"chat body"} className="p-4">
        here
      </div>
      <div data-testid={"type bar"} className="p-4">
        Start typing
      </div>
    </div>
  );
}

export default ChatBox;
