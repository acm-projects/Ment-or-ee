const mongoose = require('mongoose');
const MentorModel = require('./models/mentorModel'); // Import Mentor model
const MenteeModel = require('./models/menteeModel'); // Import Mentee model

/**
 * Calculate match score between a mentor and mentee.
 * @param {Object} mentor - Mentor object.
 * @param {Object} mentee - Mentee object.
 * @return {Number} - Match score (0 to 100).
 */
function calculateMatchScore(mentor, mentee) {
  let matchScore = 0;

  // Calculate location match
  if (mentor.location.state === mentee.location.state) {
    matchScore += mentee.weights.location; // Add location weight if states match
  }

  // Calculate language match
  const commonLanguages = mentor.languages.filter(language => mentee.languages.includes(language));
  if (commonLanguages.length > 0) {
    matchScore += mentee.weights.languages; // Add language weight if there are common languages
  }

  // Calculate personality type match
  if (mentor.personalityType === mentee.personalityType) {
    matchScore += mentee.weights.personalityType; // Add personality type weight if types match
  }

  // Calculate university match
  if (mentor.university === mentee.university) {
    matchScore += mentee.weights.university; // Add university weight if they attended the same university
  }

  // Calculate fields of expertise match
  const commonFields = mentor.fields.filter(field => mentee.fields.includes(field));
  if (commonFields.length > 0) {
    matchScore += mentee.weights.fields; // Add fields weight if there are common fields of expertise
  }

  // Calculate industries match
  const commonIndustries = mentor.industries.filter(industry => mentee.industries.includes(industry));
  if (commonIndustries.length > 0) {
    matchScore += mentee.weights.industries; // Add industries weight if there are common industries
  }

  return matchScore;
}

/**
 * Find matching mentors for a given mentee.
 * @param {Object} mentee - Mentee object.
 * @return {Array} - List of matched mentors with their match scores.
 */
async function findMatchingMentors(mentee) {
  try {
    // Fetch all available mentors
    const availableMentors = await MentorModel.find({ availability: true });

    // Calculate match score for each mentor
    const mentorMatches = availableMentors.map(mentor => {
      const score = calculateMatchScore(mentor, mentee);
      return { mentor, score };
    });

    // Sort mentors by score (highest score first)
    mentorMatches.sort((a, b) => b.score - a.score);

    return mentorMatches;
  } catch (error) {
    console.error('Error finding matching mentors:', error);
    throw error;
  }
}

module.exports = {
  findMatchingMentors
};
