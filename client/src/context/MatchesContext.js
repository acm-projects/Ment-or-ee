import React, { createContext, useContext, useState, useEffect } from "react";
import { UseAuth } from "./AuthContext";

const MatchesContext = createContext();

export const MatchesContextProvider = ({ children }) => {
  const menteeId = "67180e75157b3c18a7d20242";
  console.log("got here0"); //testing
  console.log(menteeId); //testing

  // const { user } = UseAuth();
  const [matches, setMatches] = useState([]);

  const fetchMatches = async () => {
    try {
      console.log("got here1"); //testing
      const response = await fetch(
        "http://localhost:5001/api/matchMentorToMentee",

        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ menteeID: menteeId }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.error(error);
        throw new Error(error.message);
      }
      const data = await response.json();
      setMatches(data);
      return true;
    } catch (error) {
      console.error("Error fetching matches", error);
      throw error;
    }
  };

  return (
    <MatchesContext.Provider value={{ matches, fetchMatches }}>
      {children}
    </MatchesContext.Provider>
  );
};

export const useMatches = () => useContext(MatchesContext);

export { MatchesContext };
