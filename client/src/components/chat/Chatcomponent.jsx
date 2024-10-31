import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

function Chatcomponent({ currentUser, otherUser }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    // Login the current user
    socket.emit("login", currentUser._id);

    // Listen for incoming messages
    socket.on("receiveMessage", ({ from, message }) => {
      setMessages((prevMessages) => [...prevMessages, { from, message }]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [currentUser._id]);

  const sendMessage = () => {
    if (inputMessage.trim()) {
      socket.emit("sendMessage", {
        to: otherUser._id,
        from: currentUser._id,
        message: inputMessage,
      });
      setMessages((prevMessages) => [
        ...prevMessages,
        { from: currentUser._id, message: inputMessage },
      ]);
      setInputMessage("");
    }
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>
              {msg.from === currentUser._id ? "You" : otherUser.name}:
            </strong>{" "}
            {msg.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chatcomponent;
