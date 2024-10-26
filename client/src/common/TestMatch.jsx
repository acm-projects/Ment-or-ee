import React, { useState } from "react";

function TestMatch() {
  const [result, setResult] = useState("");

  const matchMentorToMentee = async (event) => {
    event.preventDefault();
    console.log("got here11");
    // Mentee ID
    const menteeId = "67180e75157b3c18a7d20242";

    try {
      const response = await fetch(
        "http://localhost:5000/api/matchMentorToMentee",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ menteeId }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setResult("Matched Mentors: " + JSON.stringify(data.matchedMentors));
        console.log(data.matchedMentors);
      } else {
        setResult("Error: " + data.message);
        console.log(data.message);
      }
    } catch (error) {
      setResult("Request failed: " + error.message);
      console.log(error.message);
    }
  };

  return (
    <div>
      <h1>Match Mentor to Mentee</h1>
      <form onSubmit={matchMentorToMentee}>
        <button type="submit">Match Mentor to Mentee</button>
      </form>
      <p>{result}</p>
    </div>
  );
}

export default TestMatch;
