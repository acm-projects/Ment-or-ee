// algorithm.js

const calculateMatchScore = (mentee, mentor, menteeWeights) => {
  let score = 0;

  // Location Match
  if (
      mentee.user.location.city === mentor.user.location.city &&
      mentee.user.location.state === mentor.user.location.state
  ) {
      score += menteeWeights.location;
  }

  // Language Match
  const languageMatch = mentee.user.languages.filter(lang =>
      mentor.user.languages.includes(lang)
  ).length;
  score += (languageMatch * menteeWeights.languages) / mentee.user.languages.length;

  // Field Match
  const fieldMatch = mentee.user.fields.filter(field =>
      mentor.user.fields.includes(field)
  ).length;
  score += (fieldMatch * menteeWeights.fields) / mentee.user.fields.length;

  // Industry Match
  const industryMatch = mentee.user.industries.filter(industry =>
      mentor.user.industries.includes(industry)
  ).length;
  score += (industryMatch * menteeWeights.industries) / mentee.user.industries.length;

  // University Match
  if (mentee.user.university === mentor.user.university) {
      score += menteeWeights.university;
  }

  // Personality Type Match
  if (mentee.user.personalityType === mentor.user.personalityType) {
      score += menteeWeights.personalityType;
  }

  return score;
};

const matchMenteeToMentors = async (mentee, mentors) => {
  const menteeWeights = mentee.weights;

  const mentorMatches = mentors.map(mentor => {
      const score = calculateMatchScore(mentee, mentor, menteeWeights);
      return { mentor, score };
  });

  // Sort mentors by match score in descending order
  mentorMatches.sort((a, b) => b.score - a.score);
  return mentorMatches;
};

module.exports = {
  calculateMatchScore,
  matchMenteeToMentors
};
