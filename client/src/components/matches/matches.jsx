import React from 'react';
import Navbar from '../../common/navbar';
import lerich_pfp from '../../assets/lerich_pfp.svg'
import abis_pfp from '../../assets/abis_pfp.svg'
import jeshna_pfp from '../../assets/jeshna_pfp.svg'

const profiles = [
  { name: 'Lerich', career: 'Computer Science', language: 'English', imgSrc: lerich_pfp },
  { name: 'Abis', career: 'Computer Science', language: 'English', imgSrc: abis_pfp },
  { name: 'Jeshna', career: 'Computer Science', language: 'English', imgSrc: jeshna_pfp },
  { name: 'Anonymous', career: 'Gaming', language: 'English', imgSrc: ""}
];

const Matches = () => {
  return (

    
    <div className="flex flex-col">
      <Navbar />
      
      <div className="mt-24 flex mx-auto max-w-7xl">
        <div className="w-1/4"></div> 

        <div className="w-1/2 px-6"> 
          <h1 className="text-2xl font-bold mb-6 mt-8">Matches</h1> 

          <div className="space-y-4"> 
  {profiles.map((profile, index) => (
    <div key={index} className="flex items-stretch bg-[#E3E0E0] p-2 rounded-3xl shadow-md w-[800px] h-[200px]" data-testid="jeshna_help_2">
      
      {/* Left Profile Section */}
      <div className="bg-[#B89C75] w-1/4 flex justify-center items-center rounded-l-3xl" data-testid={"jeshna help"}>
        {profile.imgSrc ? (
          <img src={profile.imgSrc} alt={`${profile.name} profile`} className=" rounded-full" />
        ) : (
          <div className="w-16 h-16 rounded-full bg-black"></div> // Placeholder for anonymous
        )}
      </div>
      
      {/* Right Details Section */}
      <div className="flex flex-col justify-center w-3/4 pl-4">
        <h2 className="text-2xl font-bold">{profile.name}</h2>
        <p className="text-lg">Career Field: {profile.career}</p>
        <p className="text-lg">Language: {profile.language}, ...</p>
      </div>

      {/* View More Button */}
      <div className="ml-auto pr-4 flex items-center">
        <button className="text-blue-600 text-lg flex items-center">
          View more <span className="ml-2">→</span>
        </button>
      </div>
    </div>
  ))}
</div>
        </div>
      </div>
    </div>
  );
}

export default Matches;