import React, { createContext, useContext, useState, useCallback } from "react";
import { UseAuth } from "./AuthContext";

const MatchesContext = createContext();

export const MatchesContextProvider = ({ children }) => {
  const [matches, setMatches] = useState([]);
  const [mentees, setMentees] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user } = UseAuth();

  const fetchMatches = useCallback(async () => {
    if (!user) {
      setError("User not authenticated");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log("Fetching matches for user ID:", user.id);
      const response = await fetch(
        `http://localhost:5000/api/match/${user.id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch matches");
      }

      const data = await response.json();
      console.log("Received matches:", data);
      setMatches(data.matchedMentors);
    } catch (error) {
      console.error("Error fetching matches:", error);
      setError(error.message);
      setMatches([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const fetchMentees = useCallback(async () => {
    if (!user) {
      setError("User not authenticated");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log("Fetching matches for user ID:", user.id);
      const response = await fetch(`http://localhost:5000/mentees/${user.id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch matches");
      }

      const data = await response.json();
      console.log("Received matches:", data);
      setMentees(data.mentees);
    } catch (error) {
      console.error("Error fetching matches:", error);
      setError(error.message);
      setMentees([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  return (
    <MatchesContext.Provider
      value={{ matches, mentees, fetchMentees, fetchMatches, error, loading }}
    >
      {children}
    </MatchesContext.Provider>
  );
};

export const useMatches = () => {
  const context = useContext(MatchesContext);
  if (!context) {
    throw new Error("useMatches must be used within a MatchesContextProvider");
  }
  return context;
};

export { MatchesContext };
