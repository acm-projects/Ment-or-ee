
import React, { useState } from 'react';
import Navbar from '../../common/navbar';
import MatchCard from '../../common/MatchCard';
import Slider from '../../common/Slider';

const Profile = () => {
    const matchData = {
        imgUrl: "https://example.com/profile.jpg",
        name: "John Doe",
        role: "Mentee",
        headline: "CS @ UT Dallas",
        careerField: "Software Engineering",
        location: "New York, NY",
        college: "University of Example",
        personality: "Extrovert",
        language: "English, Spanish",
    };

    const [bio, setBio] = useState("I am a passionate software engineer with a love for developing innovative programs. I enjoy working on challenging projects and collaborating with others.");
    const [industry, setIndustry] = useState("Finance, Education, Law");
    const [growthAreas, setGrowthAreas] = useState("Resume building, Interview prep");

    const sliderFields = [
        { id: 'college', label: 'College', value: matchData.college },
        { id: 'careerField', label: 'Career Field', value: matchData.careerField },
        { id: 'location', label: 'Location', value: matchData.location },
        { id: 'personality', label: 'Personality', value: matchData.personality },
        { id: 'language', label: 'Language', value: matchData.language },
        { id: 'industry', label: 'Industry', value: industry }
    ];

    const handleWeightageChange = (newWeightages) => {
        console.log('New Weightages:', newWeightages);
    };

    return (
        <div className="flex flex-col">
            <Navbar />

            <div className="bg-[#D3C7B3] w-1/2 h-72 p-10 flex items-center justify-center mt-20">
                <div className="w-full h-full flex justify-center items-center">
                    <MatchCard 
                        imgUrl={matchData.imgUrl}
                        name={matchData.name}
                        role={matchData.role}
                        headline={matchData.headline}
                        compact={true} 
                    />
                </div>
            </div>

            <div className="flex w-full px-4 py-2 space-x-8 mt-4">
                <div className="w-1/2 px-2 py-2 bg-white rounded">
                    <h2 className="text-3xl mb-2">About Me</h2>
                    <h2 className="text-xl text-[#B89C75] mb-2">Bio</h2>
                    <p>{bio}</p>

                    <h2 className="text-xl text-[#B89C75] mt-4 mb-2">Languages</h2>
                    <p>{matchData.language}</p>

                    <h2 className="text-xl text-[#B89C75] mt-4 mb-2">Personality:</h2>
                    <p>{matchData.personality}</p>
                </div>

                <div className="w-1/2 pl-4 bg-white rounded">
                    <h2 className="text-3xl mb-2">Academic Interests</h2>
                    <h2 className="text-xl text-[#B89C75] mb-2">Currently Attending:</h2>
                    <p>{matchData.college}</p>

                    <h2 className="text-xl text-[#B89C75] mt-4 mb-2">Interested in Working With:</h2>
                    <p>{matchData.careerField}</p>

                    <h2 className="text-xl text-[#B89C75] mt-4 mb-2">Interested in Working In:</h2>
                    <p>{industry}</p>

                    <h2 className="text-xl text-[#B89C75] mt-4 mb-2">Wants help on:</h2>
                    <p>{growthAreas}</p>
                </div>
            </div>

            <Slider fields={sliderFields} onWeightageChange={handleWeightageChange} />
        </div>
    );
}

export default Profile;

