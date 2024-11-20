import React, { useEffect } from "react";
import { useMatches } from "../context/MatchesContext";
import { UseAuth } from "../context/AuthContext";
import ProfilePicture from "./ProfilePicture";
import { useNavigate } from "react-router-dom";
import lindaProfile from "../assets/lindagarcia.png";
import michaelProfile from "../assets/michaelbrown.png";
import robertProfile from "../assets/robertsmith.png";
import autoprofile from "../assets/autoprofile.png";

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
            Mentees
          </h1>
          <p className="p-2 text-lg">
            No mentees currently found. Please visit another time!
          </p>
        </div>
      );
    }

    console.log("Mentees:", mentees); //testing
    return (
      <div>
        <h1 className=" pt-2 text-2xl text-black font-semibold mb-2 text-center">
          Mentees
        </h1>
        <div className="m-2 items-center">
          {mentees.length > 0 ? (
            <div>
              {mentees.map((mentee) => (
                <div key={mentee.id} className="flex rounded-3xl w-full mb-1">
                  <div className="w-1/4 flex items-center justify-center">
                    {/* <ProfilePicture
                      imgUrl={mentee.imgUrl}
                      altText={mentee.name}
                      size="w-25 h-25"
                    /> */}
                    {(() => {
                      switch (mentee.name) {
                        case "Linda Garcia":
                          return (
                            <img
                              src={lindaProfile}
                              alt="Profile"
                              className="rounded-full object-cover bg-white"
                            />
                          );
                        case "Robert Smith":
                          return (
                            <img
                              src={robertProfile}
                              alt="Profile"
                              className="rounded-full object-cover bg-white"
                            />
                          );
                        case "Michael Brown":
                          return (
                            <img
                              src={michaelProfile}
                              alt="Profile"
                              className="rounded-full object-cover bg-white"
                            />
                          );
                        default:
                          return (
                            <img
                              src={autoprofile}
                              alt="Profile"
                              className="rounded-full object-cover bg-white"
                            />
                          );
                      }
                    })()}
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
            </div>
          ) : (
            <p className="p-2 text-lg">
              No mentees currently found. Please visit another time!
            </p>
          )}
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
                    {(() => {
                      switch (match.name) {
                        case "Linda Garcia":
                          return (
                            <img
                              src={lindaProfile}
                              alt="Profile"
                              className="rounded-full object-cover bg-white"
                            />
                          );
                        case "Robert Smith":
                          return (
                            <img
                              src={robertProfile}
                              alt="Profile"
                              className="rounded-full object-cover bg-white"
                            />
                          );
                        case "Michael Brown":
                          return (
                            <img
                              src={michaelProfile}
                              alt="Profile"
                              className="rounded-full object-cover bg-white"
                            />
                          );
                        default:
                          return (
                            <img
                              src={autoprofile}
                              alt="Profile"
                              className="rounded-full object-cover bg-white"
                            />
                          );
                      }
                    })()}
                  </div>
                  <div className="w-3/4 h-70 flex flex-col justify-between pl-4 py-6">
                    <h2 className="text-2xl font-bold">{match.name}</h2>
                    <p>
                      <span className="font-bold">Headline:</span>{" "}
                      {(() => {
                        switch (match.name) {
                          case "Linda Garcia":
                            return <div>Cybersecurity Expert</div>;
                          case "Robert Smith":
                            return <div>Data Science Mentor</div>;
                          case "Michael Brown":
                            return <div>Marketing and Strategy Mentor</div>;
                          default:
                            return <div>Mentor</div>;
                        }
                      })()}
                    </p>
                  </div>
                </div>
              ))}
              <div className="flex justify-center w-full mt-4">
                <button
                  onClick={() => navigate("/matches")}
                  className="px-4 py-2 text-lg text-black bg-[#B89C75] rounded-full flex items-center hover:bg-[#B89C75] focus:outline-none focus:ring-2 focus:ring-[#1F2839]"
                >
                  Discover More Matches
                </button>
              </div>
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
