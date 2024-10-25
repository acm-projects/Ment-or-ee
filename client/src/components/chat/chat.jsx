// components/HomePage.js
import React from "react";
import Navbar from "../../common/navbar";
import ChatBox from "./ChatBox";
import { UseAuth } from "../../context/AuthContext";
import ChatDMs from "./ChatDMs";

const Chat = () => {
  const { user } = UseAuth();

  // if (!user) {
  //   return <div>Please log in</div>;
  // }

  return (
    <div className="p-6 flex flex-col space-y-20">
      <Navbar />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:h-[450px] md:h-[550px]">
        <div className="lg:col-span-1 bg-[#E3E0E0] shadow rounded-lg overflow-hidden">
          <ChatDMs user={user} />
        </div>

        <div className="lg:col-span-3 bg-[#E3E0E0] overflow-hidden shadow rounded-lg">
          <ChatBox user={user} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
