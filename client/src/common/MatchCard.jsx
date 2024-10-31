import React from 'react';
import ProfilePicture from "./ProfilePicture";

const MatchCard = ({ imgUrl, name, headline, role, careerField, industry, location, college, personality, language, compact }) => {
    return (
        <div className='flex rounded-3xl shadow-lg bg-[#E3E0E0] w-full mb-4'>
            <div className='bg-[#B89C75] w-1/4 rounded-l-3xl flex items-center justify-center'>
                <ProfilePicture
                    imgUrl={imgUrl}
                    altText={name}
                    size="w-25 h-25"
                />
            </div>

            <div className='w-3/4 h-70 flex flex-col justify-between pl-4 py-6'>
                <h2 className='text-3xl font-bold'>{name}</h2>


                {compact ? (
                    <div>
                        <p className="text-gray-600"><span className="font-bold">Role:</span> {role}</p> {/* Role added here */}
                        <p className="text-gray-600">{headline}</p>
                    </div>
                ) : (
                    <div>
                        <div className='flex justify-between'>
                            <div className='w-1/2'>
                                <p><span className="font-bold">Headline:</span> {headline}</p>
                                <p><span className="font-bold">Role:</span> {role}</p>
                                <p><span className="font-bold">Career Field:</span> {careerField}</p>
                                <p><span className="font-bold">Industry:</span> {industry}</p>
                            </div>
                            <div className='w-1/2'>
                                <p><span className="font-bold">Personality:</span> {personality}</p>
                                <p><span className="font-bold">Location:</span> {location}</p>
                                <p><span className="font-bold">College:</span> {college}</p>
                                <p><span className="font-bold">Language:</span> {language}</p>
                            </div>
                        </div>
                    </div>
                )}

                <div className='text-right'>
                    <a
                        href="#"
                        className="text-blue-600 flex items-center hover:underline"
                    >
                        View more <span className="ml-1"></span>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default MatchCard;

