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
      updateZoomForm({ mentorId: "6732d21774bfa2e4f82b0dba" });
      updateZoomForm({ duration: 30 });
    } else {
      updateZoomForm({ mentorId: "6732d21774bfa2e4f82b0dba" });
      updateZoomForm({ menteeId: receiver.id });
      updateZoomForm({ duration: 30 });
    }
  }, []);

  const handleZoomSubmit = async () => {
    console.log("attemping zoom submit"); //testing
    console.log("zoom form", zoomForm); //testing
    console.log("updated zoom", zooms);
    // setShowZoomForm(!showZoomForm); //testing
    setZooms([...zooms, zoomForm]);
    setZoomForm({});
    setShowZoomForm(false);
    // setZooms([...zooms, zoomForm]); //testing
    // setZoomForm({}); //testing

    // try {
    //   const response = await fetch(
    //     "http://localhost:5000/api/meetings/create",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ zoomForm }),
    //     }
    //   );
    //   if (response.ok) {
    //     const newZoom = await response.json();
    //     console.log(newZoom);
    //     setZooms([...zooms, newZoom]);
    //     setZoomForm({});
    //     setShowZoomForm(false);
    //   } else {
    //     const message = await response.json();
    //     console.log("message", message);
    //     console.error("Failed to create Zoom meeting.");
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  // const messagesEndRef = useRef(null);

  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // };

  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);

  // const testMessages = [
  //   {
  //     text: "Hello, this is Linda! I saw your profile and would love for you to be my mentor.",
  //     fromSelf: false,
  //   },
  //   {
  //     text: "Hi Linda! I would love to mentor to you! Would you like to have a call in 2 days?",
  //     fromSelf: true,
  //   },
  //   { text: "That works for me!", fromSelf: false },
  //   { text: "I'll schedule a call in 2 days then!", fromSelf: true },
  // ];

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
    const roomId = `${
      sender.role === "Mentee" ? sender.id : receiver.mentorId
    }_${sender.role === "Mentee" ? receiver.mentorId : sender.id}`;
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
          <div className="relative flex flex-col h-full">
            <div className="flex-grow overflow-y-auto">
              <Chatbody messages={messages} curUser={sender.id} />
            </div>

            <MessageInput onSend={sendMessage} />

            {showZoom && (
              <div className="absolute top-0 right-0 z-10">
                <div className="content-end bg-[#B89C75] rounded-bl-lg w-80 p-2">
                  <div className="bg-white rounded-lg shadow-xl p-4">
                    {showZoomForm ? (
                      <div>
                        <Zoom
                          zoomForm={zoomForm}
                          setZoomForm={setZoomForm}
                          handleZoomSubmit={handleZoomSubmit}
                        />
                      </div>
                    ) : (
                      <div className="max-w-3xl mx-auto p-4">
                        <h1 className="text-2xl text-center font-medium mb-6">
                          Scheduled Zooms
                        </h1>
                        <div className="space-y-4 mb-6">
                          {zooms.length > 0 ? (
                            zooms.map((zoom) => (
                              <div
                                key={zoom.id}
                                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
                              >
                                <h2 className="text-xl font-bold mb-2">
                                  {zoom.title}
                                </h2>
                                {/* <p className="text-gray-600 mb-2">
                                  {zoom.description}
                                </p> */}
                                <div className="flex justify-between items-center">
                                  <p className="text-sm text-gray-500">
                                    {zoom.date.split("T")[0]} at{" "}
                                    {zoom.date.split("T")[1].slice(0, 5)}
                                  </p>
                                  <a
                                    href={zoom.zoomLink}
                                    className="text-blue-600 underline hover:text-blue-800"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    Join Meeting
                                  </a>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-center text-gray-500">
                              Nothing scheduled yet.
                            </div>
                          )}
                        </div>
                        <div className="flex justify-center mt-6">
                          <button
                            type="button"
                            className="bg-[#1F2839] text-white py-2 px-6 rounded-full hover:bg-[#2C3A4F] transition-colors duration-300"
                            onClick={() => setShowZoomForm(!showZoomForm)}
                          >
                            Create Zoom Meeting
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
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
