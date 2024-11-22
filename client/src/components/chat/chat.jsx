import React from "react";
import Navbar from "../../common/navbar";
import ChatBox from "./ChatBox/ChatBox";
import { UseAuth } from "../../context/AuthContext";
import ChatDMs from "./ChatDMs/ChatDMs";
import { useLocation } from "react-router-dom";

const Chat = () => {
  const { user } = UseAuth();
  const location = useLocation();
  const match = location.state?.match;

  return (
    <div className="p-6 flex flex-col space-y-20">
      <Navbar />
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 sm:h-[450px] md:h-[600px]">
        <div className="lg:col-span-1 bg-[#E3E0E0] shadow rounded-lg overflow-hidden">
          <ChatDMs receiver={match} />
        </div>

        <div className="sm:col-span-3 bg-[#E3E0E0] overflow-hidden shadow rounded-lg lfex flex-col h-full">
          {user.role === "Mentor" ? (
            <ChatBox
              sender={user}
              receiver={match}
              // roomId={`${user.id}_${match.id}`}
            />
          ) : (
            <ChatBox
              sender={user}
              receiver={match}
              // roomId={`${match.id}_${user.id}`}
            />
          )}
          {/* <ChatBox user={user} match={match} /> */}
        </div>
      </div>
    </div>
  );
};

export default Chat;
