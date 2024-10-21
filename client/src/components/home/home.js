// components/HomePage.js
import React from 'react';
import Navbar from '../../common/navbar';
import { useLocation } from 'react-router-dom';
import ProfileBox from '../../common/ProfileBox';

const Home = ({ profile, calendar, matches }) => {
  
  const location = useLocation();

  const sampleInfo = {
    name: 'Neeti',
    mentoree: 'Mentee',
    location: 'Dallas, TX',
    career: 'Computer Science',
    personality: 'ENFJ'
  }

  return (
    <div className="p-6 flex flex-col space-y-20">
      <Navbar />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 bg-[#E3E0E0] shadow rounded-lg p-4 overflow-hidden">
          <ProfileBox user={sampleInfo} />
          
        </div>
        
        <div className="lg:col-span-2 bg-[#E3E0E0] shadow rounded-lg p-4">
          <h2 className="flex-grow text-xl font-semibold mb-2 rounded-t-lg">Calendar</h2>
          {calendar}
        </div>

        <div className="lg:col-span-1 bg-[#E3E0E0] shadow rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Matches</h2>
          {matches}
        </div>
      </div>
    </div>
  );
};

export default Home