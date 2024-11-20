import React, { useState } from "react";
import Navbar from "../../common/navbar";
import MatchCard from "../../common/MatchCard";
import Stepper from "../../common/Stepper";
import ReviewComponent from "./ReviewComponent";

// const ProfileComponent = ({ user, selfView }) => {
const ProfileComponent = ({ selfView }) => {
  const user = {
    //finishthis
    imgUrl: "https://example.com/profile.jpg",

    bio: "I have over five years of experience in analytics and project management, focusing on developing machine learning models and optimizing operational efficiency. I am passionate about education and mentorship, aiming to share my knowledge of data science and machine learning with aspiring professionals. My experience in a leading tech company equips me with valuable insights into industry trends, making me a supportive resource for those looking to grow in this dynamic field.",
    name: "Robert Smith",
    mentorId: "6732d20c74bfa2e4f82b0db7",
    role: "Mentor",
    headline: "Data Science Mentor",
    fields: ["Data Science", "Machine Learning"],
    location: { city: "San Franciso", state: "California" },
    industries: ["Tech"],
    college: "University of Example",
    personalityType: "Extrovert",
    university: "Stanford University",
    languages: ["English", "Spanish"],
    company: "Google",
    jobTitle: "Senior Data Scientist",
    degrees: ["Ph.D. in Data Science"],
    links: [
      "linkedin.com/in/robertsmith",
      "robertsmith.com",
      "github.com/robertsmith",
    ],
  };

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
    { id: "industry", label: "Industry", value: user.industries },
  ];

  const handleWeightageChange = (newWeightages) => {
    console.log("New Weightages:", newWeightages);
  };

  const ProfileCard = () => {
    return (
      <div>
        <div className="flex w-full px-10 py-2 space-x-8 m-6">
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
              {user.links > 0 ? (
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
                {user.company} as a {user.jobTitle} in the {industries} industry
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
              {user.links ? (
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

        {/* <Slider
          fields={sliderFields}
          onWeightageChange={handleWeightageChange}
        /> */}
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      <Navbar />

      <div className="bg-[#D3C7B3] h-72 p-10 flex items-center justify-center mt-20">
        <div className="w-3/4 h-full flex justify-center items-center">
          <MatchCard match={user} compact={true} selfView={selfView} />
        </div>
      </div>

      <ProfileCard />
      {user.mentorId && <ReviewComponent selfView={selfView} />}
    </div>
  );
};

export default ProfileComponent;
