import React, { useEffect } from "react";
import TaskComponent from "./taskComponent.jsx";
import { UseAuth } from "../../context/AuthContext";
import { useMatches } from "../../context/MatchesContext.js"; //testing
import { useTasks } from "../../context/TasksContext"; //testing

const Task = () => {
  const { user } = UseAuth();
  const { matches, mentees } = useMatches();
  // console.log("usertask", user);

  // console.log("task mentees", mentees);

  const { tasks, assignTask, fetchTasks } = useTasks(); //testing

  useEffect(() => {
    const fetchTasksForAllMentees = async () => {
      //testing
      try {
        const tasks = await fetchTasks(user.id);
        console.log(tasks); //testing
      } catch (error) {
        console.log("Failed to fetch tasks for mentees");
      } finally {
      }
    };

    fetchTasksForAllMentees();
  }, [fetchTasks]);

  return (
    <div className="flex flex-col">
      <TaskComponent user={user} ogMentees={mentees} />
    </div>
  );
};

export default Task;
