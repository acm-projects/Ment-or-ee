import React, { useEffect } from "react";
import { useMatches } from "../context/MatchesContext";
import { UseAuth } from "../context/AuthContext";

function MatchesBox() {
  const { matches, fetchMatches, error, loading } = useMatches();
  const { user } = UseAuth();

  useEffect(() => {
    if (user) {
      fetchMatches();
    }
  }, [user, fetchMatches]);

  if (!user) {
    return <div>Please log in to see matches.</div>;
  }

  if (loading) {
    return <div>Loading matches...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Matches for {user.name || user.ID}</h2>
      {matches.length > 0 ? (
        <ul>
          {matches.map((match) => (
            <li key={match.id}>{match.name}</li>
          ))}
        </ul>
      ) : (
        <p>No matches found.</p>
      )}
    </div>
  );
}

export default MatchesBox;
