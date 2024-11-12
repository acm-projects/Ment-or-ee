import React from "react";
import TaskComponent from "./taskComponent.jsx";
import { UseAuth } from "../../context/AuthContext";

const Task = () => {
  const { user } = UseAuth();

  return (
    <div className="flex flex-col">
      <TaskComponent user={user} />
    </div>
  );
};

export default Task;
