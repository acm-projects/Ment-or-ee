import React from "react";
import Conversation from "./Conversation";
// import useGetConversations from "../../../hooks/useGetConversations";

const Conversations = ({ match }) => {
  // const { loading, conversations } = useGetConversations();
  // console.log("Fetching conversations:", conversations);
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {match ? (
        <Conversation match={match} />
      ) : (
        <div className="p-2 text-lg">
          No chats found. Visit the matches page to start chatting with someone!
        </div>
      )}
    </div>
  );
};

export default Conversations;
