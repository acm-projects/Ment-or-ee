import React, { createContext, useContext, useState, useCallback } from "react";
import { UseAuth } from "./AuthContext";

const TasksContext = createContext();

export const TasksContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // const { user } = UseAuth();

  const fetchTasks = async (id) => {
    setLoading(true);
    setError(null);

    try {
      console.log("Fetching tasks for user ID:", id);
      const response = await fetch(
        // `http://localhost:5000/api/tasks/assigned/${id}`,
        `http://localhost:5000/api/tasks/assigned/6732d1e474bfa2e4f82b0db0`,

        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const text = await response.text();
      console.log("Full response:", text);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = JSON.parse(text);
      console.log("Received tasks:", data);
      setTasks(data);
      return data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError(error.message);
      setTasks([]);
      return [];
    } finally {
      setLoading(false);
    }
  };

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
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("assign task failed", error);
      throw error;
    }
  };

  return (
    <TasksContext.Provider
      value={{ tasks, setTasks, assignTask, fetchTasks, error, loading }}
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
