import React from "react";
import Message from "./Message";

const Chatbody = () => {
  return (
    <div className="px-4 flex-1 overflow-y-auto">
      <div className="py-4">
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
      </div>
    </div>
  );
};

export default Chatbody;
