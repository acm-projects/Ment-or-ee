// algorithm.js

const calculateMatchScore = (mentee, mentor, menteeWeights) => {
    let score = 0;
  
    // Location Match
    if (
        mentee.user.location.city === mentor.user.location.city &&
        mentee.user.location.state === mentor.user.location.state
    ) {
        score += menteeWeights.location || 0;  // Ensure weights are valid
    }
  
    // Language Match
    const languageMatch = mentee.user.languages.filter(lang =>
        mentor.user.languages.includes(lang)
    ).length;
    if (mentee.user.languages.length > 0) {
        score += (languageMatch * menteeWeights.languages) / mentee.user.languages.length;
    }
  
    // Field Match
    const fieldMatch = mentee.user.fields.filter(field =>
        mentor.user.fields.includes(field)
    ).length;
    if (mentee.user.fields.length > 0) {
        score += (fieldMatch * menteeWeights.fields) / mentee.user.fields.length;
    }
  
    // Industry Match
    const industryMatch = mentee.user.industries.filter(industry =>
        mentor.user.industries.includes(industry)
    ).length;
    if (mentee.user.industries.length > 0) {
        score += (industryMatch * menteeWeights.industries) / mentee.user.industries.length;
    }
  
    // University Match
    if (mentee.user.university === mentor.user.university) {
        score += menteeWeights.university || 0;
    }
  
    // Personality Type Match
    if (mentee.user.personalityType === mentor.user.personalityType) {
        score += menteeWeights.personalityType || 0;
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
  