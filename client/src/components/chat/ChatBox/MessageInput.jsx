import React, { useState } from "react";
import { BsSend } from "react-icons/bs";

const MessageInput = ({ onSend }) => {
  const [inputMessage, setInputMessage] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      console.log(inputMessage); //testing
      onSend(inputMessage);
      setInputMessage("");
    }
  };

  return (
    <form onSubmit={handleSend} className="px-4 my-3">
      <div className="w-full relative">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="border text-sm rounded-lg block w-full p-2.5 bg-[#D7CFC5] border-black text-black"
          placeholder="Send a message"
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          <BsSend />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
