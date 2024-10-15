import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../common/navbar';
import Home from './home';
// import UseAuth from '../../context/AuthContext';


const menteeProfile = (
  <ul className='list-disc pl-5'>
    <li>Bio</li>
    <li>Bio</li>
    <li>Bio</li>
  </ul>
);

const menteeCalendar = (
  <div className="h-64 bg-gray-100 flex items-center justify-center">
    Calendar
  </div>
);

const menteeMatches = (
  <ul className="list-disc pl-5">
    <li>Match</li>
    <li>Match</li>
    <li>Match</li>
  </ul>
);


const menteeHome = () => {
  return (
    <div>
      <div className="flex flex-col space-y-20">
        <Navbar />
        <Home
          profile={menteeProfile}
          calendar={menteeCalendar}
          matches={menteeMatches}
        />
      </div>
    </div>
  )
};

export default menteeHome;
