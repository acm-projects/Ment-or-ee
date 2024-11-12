import React, { useEffect, useCallback, useState, useRef } from "react";
import Chatbody from "./Chatbody";
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti";
import { io } from "socket.io-client";
import { TbBrandZoom } from "react-icons/tb";
import Zoom from "../../zoom/Zoom.jsx"; //temp
import { IoMdAdd } from "react-icons/io";

const socket = io("http://localhost:5000");

function ChatBox({ sender, receiver }) {
  const [messages, setMessages] = useState([]);
  const [showZoom, setShowZoom] = useState(false);
  const [showZoomForm, setShowZoomForm] = useState(false);
  const [zoomForm, setZoomForm] = useState({});
  const [zooms, setZooms] = useState([]);

  const updateZoomForm = (data) => {
    setZoomForm((prevData) => ({ ...prevData, ...data }));
  };

  useEffect(() => {
    if (sender.role === "Mentee") {
      updateZoomForm({ menteeId: sender.id });
      updateZoomForm({ mentorId: receiver.id });
    } else {
      updateZoomForm({ mentorId: sender.id });
      updateZoomForm({ menteeId: receiver.id });
    }
  }, []);

  const handleZoomSubmit = async () => {
    console.log("attemping zoom submit"); //testing
    console.log("zoom form", zoomForm); //testing
    console.log("updated zoom", zooms);
    setShowZoomForm(!showZoomForm); //testing
    // setZooms([...zooms, zoomForm]); //testing
    // setZoomForm({}); //testing

    try {
      const response = await fetch(
        "http://localhost:5000/zoom", //get url
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ zoomForm }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Creating zoom failed");
      } else {
        // Creating zoom success
        setShowZoomForm(!showZoomForm);
        //     setZooms(zoomForm)  //testing
        // setZoomForm([]) //testing
      }
    } catch (error) {
      console.log(error);
    }
  };

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
            className="flex justify-between bg-[#B89C75] w-full p-1 pt-4 px-4"
          >
            <div className="text-left">
              <span className="label-text text-xl">To:</span>{" "}
              <span className="p-2 pl-4 pt-4 text-2xl mb-2 text-gray-900 font-semibold">
                {receiver.name}
              </span>
            </div>
            <button
              className="text-right"
              onClick={() => setShowZoom(!showZoom)}
            >
              <TbBrandZoom className="text-2xl" />
            </button>
          </div>
          {showZoom && (
            <div className="content-end bg-[#B89C75] rounded-bl-lg w-80 p-2">
              {showZoomForm ? (
                <Zoom
                  zoomForm={zoomForm}
                  setZoomForm={setZoomForm}
                  handleZoomSubmit={handleZoomSubmit}
                ></Zoom>
              ) : (
                <div>
                  <h1 className="text-2xl text-center font-medium">Zoom</h1>
                  <div>
                    {zooms.length > 0 ? (
                      <div>
                        {zooms.map((zoom) => (
                          <div
                            key={zoom.id}
                            className="flex rounded-3xl w-full mb-1"
                          >
                            <div className="w-3/4 h-70 flex flex-col justify-between pl-4 py-6">
                              <h2 className="text-2xl font-bold">
                                {zoom.title}
                              </h2>
                              <p>
                                <span className="font-bold">Headline:</span>{" "}
                                {zoom.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div>Nothing scheduled yet.</div>
                    )}
                  </div>
                  <button
                    className="items-right"
                    onClick={() => setShowZoomForm(!showZoomForm)}
                  >
                    <IoMdAdd />
                  </button>
                </div>
              )}
            </div>
          )}
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
