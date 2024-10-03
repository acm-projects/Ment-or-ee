// components/HomePage.js
import React from 'react';
import Navbar from '../navbar';

const home = ({ profile, calendar, matches }) => {
  return (
    <div>
        {/* <Navbar /> */}
    <div className="p-6">
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 bg-[#E3E0E0] shadow rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Profile</h2>
          {profile}
        </div>

        <div className="lg:col-span-2 bg-[#E3E0E0] shadow rounded-lg p-4">
          <h2 className="flex-grow text-xl font-semibold mb-2 rounded-t-lg">Calendar</h2>
          {/* <h2 className="flex-grow text-xl font-semibold mb-2 bg-[#B89C75] rounded-t-lg">Calendar</h2> */}
          {calendar}
        </div>

        <div className="lg:col-span-1 bg-[#E3E0E0] shadow rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Matches</h2>
          {matches}
        </div>
      </div>
    </div>
    </div>
  );
};

export default home