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
        `http://localhost:5000/api/tasks/${user.id}`,
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

  return (
    <TasksContext.Provider value={{ tasks, fetchTasks, error, loading }}>
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

//add to tasks page
// const handleSubmit = async () => {
//     console.log("attemping tasks submit"); //testing
//     // console.log(formData); //testing

//     try {
//       const response = await fetch(
//         "http://localhost:5000/addTask",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ newTask }),
//         }
//       );
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Adding task failed");
//       } else {
//         // adding tasks success
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
