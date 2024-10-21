import React from 'react';
import ProfilePicture from "./ProfilePicture";

const MatchCard = ({imgUrl, name, careerField, location, college, personality, language}) => {
    return (
        <div className='flex p-4 rounded-lg shadow-lg bg-[#E3E0E0] w-full mb-4'>
            <div className='bg-[#B89C75] w-1/4 flex items-center justify-center'>
                <ProfilePicture
                    imgUrl = {imgUrl}
                    altText= {name}
                    size = "w-16 h-16"
                />
            </div>

            <div className='w-3/4 flex flex-col justify-between pl-4'>
                <div>
                    <h2 className='text-xl font-bold'>{name}</h2>
                    <p>Career Field: {careerField}</p>
                    <p>Location: {location}</p>
                    <p>College: {college}</p>
                    <p>Personality: {personality}</p>
                    <p>Language: {language}</p>
                </div>

                <div className='text-right'>
                    <a
                        href="#"
                        className= "text-blue-600 flex items-center hover:underline"
                    >
                        View more <span className="ml-1"></span>
                    </a>
                </div>

            </div>


        </div>
    )
}
export default MatchCard;

