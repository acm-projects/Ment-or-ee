import React from "react";
import TaskComponent from "./taskComponent.jsx";
import { UseAuth } from "../../context/AuthContext";
import { useMatches } from "../../context/MatchesContext.js"; //testing

const Task = () => {
  const { user } = UseAuth();
  const { mentees, fetchMentees } = useMatches;

  // console.log(fetchMentees());

  return (
    <div className="flex flex-col">
      <TaskComponent user={user} />
    </div>
  );
};

export default Task;
