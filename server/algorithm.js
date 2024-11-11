const calculateMatchScore = (mentee, mentor, menteeWeights) => {
    let score = 0;

    // Ensure mentee.user and mentor.user exist before accessing properties
    if (mentee?.user?.location && mentor?.user?.location) {
        // Location Match
        if (
            mentee.user.location.city === mentor.user.location.city &&
            mentee.user.location.state === mentor.user.location.state
        ) {
            score += menteeWeights.location || 0;
        }
    }

    // Language Match
    if (mentee?.user?.languages && mentor?.user?.languages) {
        const languageMatch = mentee.user.languages.filter(lang =>
            mentor.user.languages.includes(lang)
        ).length;
        if (mentee.user.languages.length > 0) {
            score += (languageMatch * menteeWeights.languages) / mentee.user.languages.length;
        }
    }

    // Field Match
    if (mentee?.user?.fields && mentor?.user?.fields) {
        const fieldMatch = mentee.user.fields.filter(field =>
            mentor.user.fields.includes(field)
        ).length;
        if (mentee.user.fields.length > 0) {
            score += (fieldMatch * menteeWeights.fields) / mentee.user.fields.length;
        }
    }

    // Industry Match
    if (mentee?.user?.industries && mentor?.user?.industries) {
        const industryMatch = mentee.user.industries.filter(industry =>
            mentor.user.industries.includes(industry)
        ).length;
        if (mentee.user.industries.length > 0) {
            score += (industryMatch * menteeWeights.industries) / mentee.user.industries.length;
        }
    }

    // University Match
    if (mentee?.user?.university && mentor?.user?.university && mentee.user.university === mentor.user.university) {
        score += menteeWeights.university || 0;
    }

    // Personality Type Match
    if (mentee?.user?.personalityType && mentor?.user?.personalityType && mentee.user.personalityType === mentor.user.personalityType) {
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
