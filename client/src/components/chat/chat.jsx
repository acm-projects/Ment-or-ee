// import React from "react";
// import { useLocation } from "react-router-dom";
// import Chatcomponent from "./Chatcomponent.jsx";

// const tempCur = {
//   _id: "67180e66157b3c18a7d2023e",
//   name: "John Doe",
// };

// const tempOther = {
//   _id: "67180e6f157b3c18a7d20240",
// };

// function Chat({ currentUser }) {
//   const location = useLocation();
//   // const { otherUser } = location.state;

//   return (
//     <div style={{ display: "flex", justifyContent: "space-around" }}>
//       <div>
//         <h2>User A's View</h2>
//         <Chat currentUser={tempCur} otherUser={tempOther} />
//       </div>
//       <div>
//         <h2>User B's View</h2>
//         <Chat currentUser={tempOther} otherUser={tempCur} />
//       </div>
//     </div>
//   );
// }

// export default Chat;

// components/HomePage.js
import React from "react";
import Navbar from "../../common/navbar";
import ChatBox from "./ChatBox/ChatBox";
import { UseAuth } from "../../context/AuthContext";
import ChatDMs from "./ChatDMs/ChatDMs";

const Chat = () => {
  const { user } = UseAuth();

  // if (!user) {
  //   return <div>Please log in</div>;
  // }

  return (
    <div className="p-6 flex flex-col space-y-20">
      <Navbar />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:h-[450px] md:h-[600px]">
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
