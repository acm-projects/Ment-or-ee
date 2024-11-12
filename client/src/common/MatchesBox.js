import React, { useEffect } from "react";
import { useMatches } from "../context/MatchesContext";
import { UseAuth } from "../context/AuthContext";
import ProfilePicture from "./ProfilePicture";
import { useNavigate } from "react-router-dom";

// const matches = []; //testing
// const matches = [
//   {
//     name: "Lerich",
//     id: "67180e89157b3c18a7d20248",
//     imgUrl: "https://example.com/profile.jpg",
//     headline: "Passionate Engineer | Driving Innovation and Growth in Law",
//     role: "Mentor",
//     fields: ["Computer Science"],
//     industries: ["Law"],
//     location: "Dallas, TX",
//     university: "The University of Texas at Dallas",
//     personalityType: "Introvert",
//     languages: ["English"],
//     bio: "I really look forward to being a mentor and having a positive impact on the community!",
//     links: [],
//   },
//   {
//     name: "Abis",
//     imgUrl: "https://example.com/profile.jpg",
//     headline: "Strategic Thinker | Specializing in Data Analysis slay",
//     role: "Mentor",
//     fields: ["Computer Science"],
//     industries: ["Health"],
//     location: "Houston, TX",
//     university: "The University of Texas at Dallas",
//     jobTitle: "Software Engineer",
//     company: "Texas Instruments",
//     personalityType: "Extrovert",
//     languages: ["English"],
//     bio: "I really look forward to being a mentor and having a positive impact on the community!",
//     links: [],
//   },
//   {
//     name: "Jeshna",
//     imgUrl: "https://example.com/profile.jpg",
//     headline: "Creative Problem Solver | Front-End Developer",
//     role: "Mentor",
//     fields: ["Computer Science"],
//     industries: ["Education"],
//     location: "San Francisco, California",
//     university: "Stanford University",
//     personalityType: "Extrovert",
//     languages: ["English"],
//     bio: "I really look forward to being a mentor and having a positive impact on the community!",
//     links: [],
//   },
// ];

function MatchesBox() {
  const { user } = UseAuth();
  const navigate = useNavigate();

  if (!user) {
    return <div>Please log in to see matches.</div>;
  }

  const MentorMatches = () => {
    const { mentees, fetchMentees, error, loading } = useMatches();

    useEffect(() => {
      if (user) {
        fetchMentees();
      }
    }, [fetchMentees]);

    if (loading) {
      return <div>Loading mentees...</div>;
    }

    if (error) {
      return (
        <div>
          <h1 className=" pt-2 text-2xl text-black font-semibold mb-2 text-center">
            Match Requests
          </h1>
          <p className="p-2 text-lg">
            No match requests currently found. Please visit another time!
          </p>
        </div>
      );
    }

    console.log("Mentees:", mentees); //testing
    return (
      <div>
        <h1 className=" pt-2 text-2xl text-black font-semibold mb-2 text-center">
          Match Requests
        </h1>
        <div className="m-2 items-center">
          here
          {/* {mentees.length > 0 ? (
            <div>
              {mentees.map((mentee) => (
                <div key={mentee.id} className="flex rounded-3xl w-full mb-1">
                  <div className="w-1/4 flex items-center justify-center">
                    <ProfilePicture
                      imgUrl={mentee.imgUrl}
                      altText={mentee.name}
                      size="w-25 h-25"
                    />
                  </div>
                  <div className="w-3/4 h-70 flex flex-col justify-between pl-4 py-6">
                    <h2 className="text-2xl font-bold">{mentee.name}</h2>
                    <p>
                      <span className="font-bold">Headline:</span>{" "}
                      {mentee.headline}
                    </p>
                  </div>
                </div>
              ))}
              <button
                onClick={() => navigate("/matches")}
                className="px-4 py-2 text-lg text-black bg-[#B89C75] rounded-full flex items-center hover:bg-[#B89C75] focus:outline-none focus:ring-2 focus:ring-[#1F2839]"
              >
                Discover More Requests
              </button>
            </div>
          ) : (
            <p className="p-2 text-lg">
              No match requests currently found. Please visit another time!
            </p>
          )} */}
        </div>
      </div>
    );
  };

  const MenteeMatches = () => {
    const { matches, fetchMatches, error, loading } = useMatches();

    useEffect(() => {
      if (user) {
        fetchMatches();
      }
    }, [fetchMatches]);

    if (loading) {
      return <div>Loading matches...</div>;
    }

    if (error) {
      return (
        <div>
          <h1 className=" pt-2 text-2xl text-black font-semibold mb-2 text-center">
            Matches
          </h1>
          <p className="p-2 text-lg">
            No matches currently found. Please visit another time!
          </p>
        </div>
      );
    }

    return (
      <div>
        <h1 className=" pt-2 text-2xl text-black font-semibold mb-2 text-center">
          Matches
        </h1>
        <div className="m-2 items-center">
          {matches.length > 0 ? (
            <div>
              {matches.map((match) => (
                <div key={match.id} className="flex rounded-3xl w-full mb-1">
                  <div className="w-1/4 flex items-center justify-center">
                    <ProfilePicture
                      imgUrl={match.imgUrl}
                      altText={match.name}
                      size="w-25 h-25"
                    />
                  </div>
                  <div className="w-3/4 h-70 flex flex-col justify-between pl-4 py-6">
                    <h2 className="text-2xl font-bold">{match.name}</h2>
                    <p>
                      <span className="font-bold">Headline:</span>{" "}
                      {match.headline}
                    </p>
                  </div>
                </div>
              ))}
              <button
                onClick={() => navigate("/matches")}
                className="px-4 py-2 text-lg text-black bg-[#B89C75] rounded-full flex items-center hover:bg-[#B89C75] focus:outline-none focus:ring-2 focus:ring-[#1F2839]"
              >
                Discover More Matches
              </button>
            </div>
          ) : (
            <p className="p-2 text-lg">
              No matches currently found. Please visit another time!
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>{user.role === "Mentor" ? <MentorMatches /> : <MenteeMatches />}</div>
  );
}

export default MatchesBox;
