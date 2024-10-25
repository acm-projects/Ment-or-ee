import React, { useState, useEffect } from "react";

function MatchList({ id = "67180e75157b3c18a7d20242" }) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMatches(id);
  }, [id]);

  const fetchMatches = async (userId) => {
    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:5000/api/matchMentorToMentee/${userId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMatches(data);
    } catch (e) {
      setError(`Failed to fetch matches: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading matches...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Matches for User ID: {id}</h2>
      <ul>
        {matches.map((match) => (
          <li key={match.id}>{match.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default MatchList;
