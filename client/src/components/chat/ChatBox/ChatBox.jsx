import React, { useEffect, useState } from "react";
import Chatbody from "./Chatbody";
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function ChatBox({ user, match }) {
  const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   socket.emit("joinRoom", { mentorId: match.id, menteeId: user.id });

  //   return () => {
  //     socket.off("receiveMessage");
  //   };
  // }, [match.id, user.id]);

  //check here
  useEffect(() => {
    if (!user || !user.id || !match || !match.id) {
      console.error("User or match is not defined");
      return;
    }

    socket.emit("joinRoom", { mentorId: match.id, menteeId: user.id });

    socket.on("message", ({ sender, message }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { from: sender, message },
      ]);
    });

    return () => {
      socket.off("message");
    };
  }, [user, match]);

  const sendMessage = (inputMessage) => {
    if (!user || !user.id || !match || !match.id) {
      console.error("User or match is not defined");
      return;
    }
    if (inputMessage.trim()) {
      const roomId = `${match.id}_${user.id}`;
      socket.emit("message", { roomId, message: inputMessage });
    }
  };
  //until here

  return (
    <div className="md:min-w-[450px] flex flex-col h-[600px]">
      {match ? (
        <>
          <div
            data-testid={"header"}
            className="bg-[#B89C75] w-full p-1 pt-4 px-4 mb-2"
          >
            <span className="label-text text-xl">To:</span>{" "}
            <span className="p-2 pl-4 pt-4 text-2xl mb-2 text-gray-900 font-semibold">
              {match.name}
            </span>
          </div>
          <Chatbody messages={messages} />
          <MessageInput onSend={sendMessage} />
        </>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <div className="px-4 text-center sm:text-lg md:text-xl text-black font-semibold flex flex-col items-center gap-2">
            <p>Welcome {user.name}</p>
            <p>Select a chat to start messaging</p>
            <TiMessages className="text-3xl md:text-6xl text-center" />
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBox;
