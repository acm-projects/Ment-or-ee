import React, { useEffect } from "react";
import { useMatches } from "../context/MatchesContext";
import { UseAuth } from "../context/AuthContext";
import ProfilePicture from "./ProfilePicture";
import { useNavigate } from "react-router-dom";

// const matches = []; //testing
const matches = [
  {
    name: "Lerich",
    id: "67180e89157b3c18a7d20248",
    imgUrl: "https://example.com/profile.jpg",
    headline: "yuh",
    role: "Mentor",
    fields: ["Computer Science"],
    industries: ["Law"],
    location: "Dallas, TX",
    university: "The University of Texas at Dallas",
    personalityType: "Introvert",
    languages: ["English"],
    bio: "I really look forward to being a mentor and having a positive impact on the community!",
    links: [],
  },
  {
    name: "Abis",
    imgUrl: "https://example.com/profile.jpg",
    headline: "slay",
    role: "Mentor",
    fields: ["Computer Science"],
    industries: ["Health"],
    location: "Houston, TX",
    university: "The University of Texas at Dallas",
    jobTitle: "Software Engineer",
    company: "Texas Instruments",
    personalityType: "Extrovert",
    languages: ["English"],
    bio: "I really look forward to being a mentor and having a positive impact on the community!",
    links: [],
  },
  {
    name: "Jeshna",
    imgUrl: "https://example.com/profile.jpg",
    headline: "yay",
    role: "Mentor",
    fields: ["Computer Science"],
    industries: ["Education"],
    location: "San Francisco, California",
    university: "Stanford University",
    personalityType: "Extrovert",
    languages: ["English"],
    bio: "I really look forward to being a mentor and having a positive impact on the community!",
    links: [],
  },
];

function MatchesBox() {
  // const { matches, fetchMatches, error, loading } = useMatches();
  const { user } = UseAuth();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (user) {
  //     fetchMatches();
  //   }
  // }, [user, fetchMatches]);

  if (!user) {
    return <div>Please log in to see matches.</div>;
  }

  // if (loading) {
  //   return <div>Loading matches...</div>;
  // }

  // if (error) {
  //   return (
  //     <div>
  //       <h1 className=" pt-2 text-2xl text-black font-semibold mb-2 text-center">
  //         Matches
  //       </h1>
  //       <p className="p-2 text-lg">
  //         No matches currently found. Please visit another time!
  //       </p>
  //     </div>
  //   );
  // }

  return (
    <div>
      <h1 className=" pt-2 text-2xl text-black font-semibold mb-2 text-center">
        Matches
      </h1>
      <div className="m-2 items-center">
        {matches.length > 0 ? (
          <div>
            {matches.map((match) => (
              <div key={match.id} className="flex rounded-3xl w-full mb-4">
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
}

export default MatchesBox;
