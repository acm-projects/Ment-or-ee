import React, { useState, useEffect } from "react";
import Navbar from "../../common/navbar";
import FilterBox from "../../common/FilterBoxes";
import MatchCard from "../../common/MatchCard";
import MenteeCard from "../../common/MenteeCard";
import { UseAuth } from "../../context/AuthContext";
import { useMatches } from "../../context/MatchesContext";

const Matches = () => {
  const { user } = UseAuth();
  const { matches, mentees } = useMatches();
  const [careerFieldFilter, setCareerFieldFilter] = useState("");
  const [headlineFilter, setHeadlineFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [collegeFilter, setCollegeFilter] = useState("");
  const [personalityFilter, setPersonalityFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");

  // useEffect(() => {
  //   if (user.role === "Mentee") {
  //     fetchMatches();
  //   }
  //   if (user.role === "Mentor") {
  //     fetchMentees();
  //   }
  // }, [user, fetchMatches, fetchMentees]);

  // const matches = [
  //   {
  //     name: "Shane",
  //     id: "672e3c25bd7073becceae3b4",
  //     imgUrl: "https://example.com/profile.jpg",
  //     headline: "Passionate Scientist | Driving Innovation and Growth in Law",
  //     role: "Mentor",
  //     fields: ["Biology"],
  //     industries: ["Law"],
  //     location: "Dallas, TX",
  //     university: "The University of Texas at Dallas",
  //     personalityType: "Introvert",
  //     languages: ["English"],
  //     bio: "I really look forward to being a mentor and having a positive impact on the community!",
  //     links: [],
  //   },
  //   {
  //     name: "Chris",
  //     id: "6719aabd4b36027a26a4560c",
  //     imgUrl: "https://example.com/profile.jpg",
  //     headline: "Passionate Engineer | Driving Innovation and Growth in Law",
  //     role: "Mentee",
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

  // Apply filters to the matches
  const filteredMatches = matches.filter((match) => {
    return (
      (careerFieldFilter === "" || match.careerField === careerFieldFilter) &&
      (headlineFilter === "" || match.headline === headlineFilter) &&
      (roleFilter === "" || match.role === roleFilter) &&
      (industryFilter === "" || match.industry === industryFilter) &&
      (locationFilter === "" || match.location === locationFilter) &&
      (collegeFilter === "" || match.college === collegeFilter) &&
      (personalityFilter === "" || match.personality === personalityFilter) &&
      (languageFilter === "" || match.language === languageFilter)
    );
  });

  return (
    <div className="flex flex-col space-y-20">
      <Navbar />

      <div className="w-full flex p-12">
        {user.role === "Mentee" ? (
          <div className="w-full flex">
            {/* Left side filter boxes */}
            <div className="w-1/3 pr-4">
              <h2 className="text-3xl py-2">Filters</h2>
              <FilterBox title="Career Field">
                <select
                  className="w-full p-2 border"
                  value={careerFieldFilter}
                  onChange={(e) => setCareerFieldFilter(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </FilterBox>
              <FilterBox title="Industry">
                <select
                  className="w-full p-2 border"
                  value={industryFilter}
                  onChange={(e) => setIndustryFilter(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="Law">Law</option>
                  <option value="Health">Health</option>
                  <option value="Education">Education</option>
                </select>
              </FilterBox>
              <FilterBox title="Location">
                <select
                  className="w-full p-2 border"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="Dallas, TX">Dallas, Texas</option>
                  <option value="Houston, TX">Houston, Texas</option>
                  <option value="Chicago, Illinois">Chicago, Illinois</option>
                  <option value="San Francisco, California">
                    San Francisco, California
                  </option>
                </select>
              </FilterBox>
              <FilterBox title="College">
                <select
                  className="w-full p-2 border"
                  value={collegeFilter}
                  onChange={(e) => setCollegeFilter(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="The University of Texas at Dallas">
                    The University of Texas at Dallas
                  </option>
                  <option value="The University of Texas at Austin">
                    The University of Texas at Austin
                  </option>
                  <option value="Stanford University">
                    Stanford University
                  </option>
                </select>
              </FilterBox>
              <FilterBox title="Personality">
                <select
                  className="w-full p-2 border"
                  value={personalityFilter}
                  onChange={(e) => setPersonalityFilter(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="Introvert">Introvert</option>
                  <option value="Extrovert">Extrovert</option>
                </select>
              </FilterBox>
              <FilterBox title="Language">
                <select
                  className="w-full p-2 border"
                  value={languageFilter}
                  onChange={(e) => setLanguageFilter(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="English">English</option>
                </select>
              </FilterBox>
            </div>

            {/* Right side match cards */}
            <div className="w-full">
              <h2 className="text-3xl py-2">{matches.length} Results</h2>

              {filteredMatches.map((match, index) => (
                <MatchCard key={index} match={match} />
              ))}
            </div>
          </div>
        ) : (
          <div className="w-2/3">
            <h2 className="text-3xl py-2">{mentees.length} Requests</h2>

            {mentees.map((mentee, index) => (
              <MenteeCard key={index} mentee={mentee} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Matches;
