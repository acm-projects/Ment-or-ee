import React, { useEffect, useCallback, useState, useRef } from "react";
import Chatbody from "./Chatbody";
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti";
import { io } from "socket.io-client";
import { TbBrandZoom } from "react-icons/tb";

const socket = io("http://localhost:5000");

function ChatBox({ sender, receiver }) {
  const [messages, setMessages] = useState([]);

  // const messagesEndRef = useRef(null);

  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // };

  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);

  const handleReceivedMessage = useCallback(
    (data) => {
      console.log("Received message:", data);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: data.message, fromSelf: data.sender === sender.id },
      ]);
    },
    [sender.id]
  );

  useEffect(() => {
    console.log("Messages updated:", messages);
  }, [messages]);

  //check here
  useEffect(() => {
    // console.log(messages);
    const roomId = `${sender.role === "Mentor" ? sender.id : receiver.id}_${
      sender.role === "Mentor" ? receiver.id : sender.id
    }`;
    console.log("Current roomId:", roomId);
    if (!sender || !sender.id || !receiver || !receiver.id) {
      console.error("Sender or receiver is not defined");
      return;
    }

    const handleConnect = () => {
      console.log("Socket connected, joining room:", roomId);
      socket.emit("joinRoom", {
        mentorId: sender.role === "Mentor" ? sender.id : receiver.id,
        menteeId: sender.role === "Mentor" ? receiver.id : sender.id,
      });

      socket.on("message", handleReceivedMessage);
    };

    socket.on("connect", handleConnect);

    if (socket.connected) {
      handleConnect();
    }

    return () => {
      console.log(`Leaving room: ${roomId}`);
      socket.off("connect", handleConnect);
      socket.off("message", handleReceivedMessage);
    };
  }, [sender, receiver, handleReceivedMessage]);

  const sendMessage = (inputMessage) => {
    const roomId = `${sender.role === "Mentor" ? sender.id : receiver.id}_${
      sender.role === "Mentor" ? receiver.id : sender.id
    }`;
    console.log("sendMessage function called with:", inputMessage); // Add this lo
    if (inputMessage.trim()) {
      console.log(`Sending message to room ${roomId}`);
      socket.emit("message", { roomId, message: inputMessage });

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: inputMessage, fromSelf: true },
      ]);
    }
    // console.log(messages);
  };
  //until here

  return (
    <div className="md:min-w-[450px] flex flex-col h-[600px]">
      {receiver ? (
        <>
          <div
            data-testid={"header"}
            className="flex justify-between bg-[#B89C75] w-full p-1 pt-4 px-4 mb-2"
          >
            <div className="text-left">
              <span className="label-text text-xl">To:</span>{" "}
              <span className="p-2 pl-4 pt-4 text-2xl mb-2 text-gray-900 font-semibold">
                {receiver.name}
              </span>
            </div>
            <button className="text-right">
              <TbBrandZoom className="text-2xl" />
            </button>
          </div>
          <Chatbody messages={messages} curUser={sender.id} />
          {/* <div ref={messagesEndRef} /> */}
          <MessageInput onSend={sendMessage} />
        </>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <div className="px-4 text-center sm:text-lg md:text-xl text-black font-semibold flex flex-col items-center gap-2">
            <p>Welcome {sender.name}</p>
            <p>Select a chat to start messaging</p>
            <TiMessages className="text-3xl md:text-6xl text-center" />
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBox;
