import React from "react";
import ProfilePicture from "./ProfilePicture";
import { useNavigate } from "react-router-dom";
import { UseAuth } from "../context/AuthContext";

const MenteeCard = ({ mentee, compact, selfView }) => {
  const { user } = UseAuth();
  const navigate = useNavigate();

  return (
    <div className="flex rounded-3xl shadow-lg bg-[#E3E0E0] w-full mb-6">
      <div className="bg-[#B89C75] w-1/4 rounded-l-3xl flex items-center justify-center">
        <ProfilePicture
          imgUrl={mentee.imgUrl}
          altText={mentee.name}
          size="w-25 h-25"
        />
      </div>

      <div className="w-3/4 h-70 flex flex-col justify-between pl-4 py-6">
        <h2 className="text-3xl font-bold">{mentee.name}</h2>

        {compact ? (
          <div>
            <p className="text-gray-600">
              <span className="font-bold">Role:</span> Mentee
            </p>{" "}
            <p className="text-gray-600">{mentee.headline}</p>
          </div>
        ) : (
          <div>
            <div className="flex justify-between">
              <div className="w-1/2">
                <p>
                  <span className="font-bold">Headline:</span> {mentee.headline}
                </p>
                <p>
                  <span className="font-bold">Role:</span>{" "}
                  {mentee.mentorId ? "Mentor" : "Mentee"}
                </p>
                <p>
                  <span className="font-bold">Career Field:</span>{" "}
                  {mentee.fields.join(", ")}
                </p>
                <p>
                  <span className="font-bold">Industry:</span>{" "}
                  {mentee.industries}
                </p>
              </div>
              <div className="w-1/2">
                <p>
                  <span className="font-bold">
                    Prefers a Mentor that is an:
                  </span>{" "}
                  {mentee.personalityType}
                </p>
                <p>
                  <span className="font-bold">Location:</span>{" "}
                  {mentee.location.city}, {mentee.location.state}
                </p>
                <p>
                  <span className="font-bold">College:</span>{" "}
                  {mentee.university}
                </p>
                <p>
                  <span className="font-bold">Language:</span>{" "}
                  {mentee.languages.join(", ")}
                </p>
              </div>
            </div>
            <div className="text-right">
              <button
                onClick={() =>
                  navigate("/ViewingProfile", { state: { user: mentee } })
                }
                className="text-blue-600 flex items-center hover:underline"
              >
                View more <span className="ml-1"></span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenteeCard;
