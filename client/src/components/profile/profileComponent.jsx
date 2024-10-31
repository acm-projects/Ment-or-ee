import React, { useState } from "react";
import Navbar from "../../common/navbar";
import MatchCard from "../../common/MatchCard";
import Slider from "../../common/Slider";

const ProfileComponent = ({ user }) => {
  // const matchData = {
  //   imgUrl: "https://example.com/profile.jpg",
  //   name: "John Doe",
  //   role: "Mentee",
  //   headline: "CS @ UT Dallas",
  //   careerField: "Software Engineering",
  //   location: "New York, NY",
  //   college: "University of Example",
  //   personality: "Extrovert",
  //   language: "English, Spanish",
  // };

  const [bio, setBio] = useState(user.bio);
  const [industries, setIndustries] = useState(user.industries.join(", "));
  // const [growthAreas, setGrowthAreas] = useState(
  //   "Resume building, Interview prep"
  // );

  const sliderFields = [
    { id: "college", label: "College", value: user.university },
    { id: "careerField", label: "Career Field", value: user.fields },
    { id: "location", label: "Location", value: user.location },
    { id: "personality", label: "Personality", value: user.personalityType },
    { id: "language", label: "Language", value: user.languages },
    { id: "industry", label: "Industry", value: industries },
  ];

  const handleWeightageChange = (newWeightages) => {
    console.log("New Weightages:", newWeightages);
  };

  const ProfileCard = () => {
    return (
      <div>
        <div className="flex w-full px-4 py-2 space-x-8 mt-4">
          <div className="w-1/2 px-2 py-2 bg-white rounded">
            <h2 className="text-3xl mb-2">About Me</h2>
            <h2 className="text-xl text-[#B89C75] mb-2">Bio</h2>
            <p>{bio}</p>

            <h2 className="text-xl text-[#B89C75] mt-4 mb-2">Languages</h2>
            <p>{user.languages.join(", ")}</p>

            {user.role === "Mentee" ? (
              <h2 className="text-xl text-[#B89C75] mt-4 mb-2">
                Prefers a Mentor that is an:
              </h2>
            ) : (
              <h2 className="text-xl text-[#B89C75] mt-4 mb-2">Personality:</h2>
            )}
            <p>{user.personalityType}</p>
          </div>

          {user.role === "Mentee" ? (
            <div className="w-1/2 pl-4 bg-white rounded">
              <h2 className="text-3xl mb-2">Academic Interests</h2>
              <h2 className="text-xl text-[#B89C75] mb-2">
                Currently Attending:
              </h2>
              <p>
                {user.university} as a {user.collegeYear} student studying{" "}
                {user.major}
              </p>

              <h2 className="text-xl text-[#B89C75] mt-4 mb-2">
                Interested in Working With:
              </h2>
              <p>{user.fields.join(", ")}</p>

              <h2 className="text-xl text-[#B89C75] mt-4 mb-2">
                Interested in Working In:
              </h2>
              <p>{industries}</p>

              <h2 className="text-xl text-[#B89C75] mt-4 mb-2">Links:</h2>
              {user.links.length > 0 ? (
                <ul>
                  {user.links.map((link, index) => (
                    <li key={index}>{link}</li>
                  ))}
                </ul>
              ) : (
                <p>No links available</p>
              )}

              {/* <h2 className="text-xl text-[#B89C75] mt-4 mb-2">Wants help on:</h2>
            <p>{user.growthAreas}</p> */}
            </div>
          ) : (
            <div className="w-1/2 pl-4 bg-white rounded">
              <h2 className="text-3xl mb-2">Academic Interests</h2>
              <h2 className="text-xl text-[#B89C75] mb-2">
                Currently working at:
              </h2>
              <p>
                {user.company} as a {user.jobTitle} in {industries}
              </p>

              <h2 className="text-xl text-[#B89C75] mt-4 mb-2">
                Graduated from:
              </h2>
              <p>{user.university}</p>

              <h2 className="text-xl text-[#B89C75] mt-4 mb-2">
                Interested in teaching:
              </h2>
              <p>{user.fields.join(", ")}</p>

              <h2 className="text-xl text-[#B89C75] mt-4 mb-2">Links:</h2>
              {user.links.length > 0 ? (
                <ul>
                  {user.links.map((link, index) => (
                    <li key={index}>{link}</li>
                  ))}
                </ul>
              ) : (
                <p>No links available</p>
              )}

              {/* <h2 className="text-xl text-[#B89C75] mt-4 mb-2">Wants help on:</h2>
          <p>{user.growthAreas}</p> */}
            </div>
          )}
        </div>

        <Slider
          fields={sliderFields}
          onWeightageChange={handleWeightageChange}
        />
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      <Navbar />

      <div className="bg-[#D3C7B3] w-1/2 h-72 p-10 flex items-center justify-center mt-20">
        <div className="w-full h-full flex justify-center items-center">
          <MatchCard match={user} compact={true} selfView={true} />
        </div>
      </div>

      <ProfileCard />
    </div>
  );
};

export default ProfileComponent;
