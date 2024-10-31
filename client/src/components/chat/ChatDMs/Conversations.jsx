import React from "react";
import Conversation from "./Conversation";
import useGetConversations from "../../../hooks/useGetConversations";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  console.log("Fetching conversations:", conversations);
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          lastIdx={idx === conversations.length - 1}
        />
      ))}

      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}

      {/* testing */}
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
    </div>
  );
};

export default Conversations;
