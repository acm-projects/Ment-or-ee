import React, { createContext, useContext, useState, useCallback } from "react";
import { UseAuth } from "./AuthContext";

const TasksContext = createContext();

export const TasksContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user } = UseAuth();

  const fetchTasks = useCallback(async () => {
    if (!user) {
      setError("User not authenticated");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log("Fetching tasks for user ID:", user.id);
      const response = await fetch(
        `http://localhost:5000/api/tasks/assigned/${user.id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch tasks");
      }

      const data = await response.json();
      console.log("Received tasks:", data);
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError(error.message);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const assignTask = async (task) => {
    console.log("attemping tasks submit"); //testing
    console.log(task); //testing
    try {
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Adding task failed");
      }
      return true;
    } catch (error) {
      console.error("assign task failed", error);
      throw error;
    }
  };

  return (
    <TasksContext.Provider
      value={{ tasks, assignTask, fetchTasks, error, loading }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksContextProvider");
  }
  return context;
};

export { TasksContext };
