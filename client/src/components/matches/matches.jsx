import React, { useState } from "react";
import Navbar from "../../common/navbar";
import FilterBox from "../../common/FilterBoxes";
import MatchCard from "../../common/MatchCard";

const Matches = () => {
  const [careerFieldFilter, setCareerFieldFilter] = useState("");
  const [headlineFilter, setHeadlineFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [collegeFilter, setCollegeFilter] = useState("");
  const [personalityFilter, setPersonalityFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");

  const matches = [
    {
      name: "Lerich",
      id: "67180e89157b3c18a7d20248",
      imgUrl: "https://example.com/profile.jpg",
      headline: "Passionate Engineer | Driving Innovation and Growth in Law",
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
      headline: "Strategic Thinker | Specializing in Data Analysis slay",
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
      headline: "Creative Problem Solver | Front-End Developer",
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
        {/* Left side filter boxes */}
        <div className="w-1/4 pr-4">
          <FilterBox title="Career Field">
            <select
              className="w-full p-2 border"
              value={careerFieldFilter}
              onChange={(e) => setCareerFieldFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="Computer Science">Computer Science</option>
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
              <option value="Dallas, TX">Dallas, TX</option>
              <option value="Houston, TX">Houston, TX</option>
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
              <option value="Stanford University">Stanford University</option>
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
        <div className="w-3/4">
          {filteredMatches.map((match, index) => (
            <MatchCard key={index} match={match} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Matches;
