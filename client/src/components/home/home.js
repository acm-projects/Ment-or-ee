// components/HomePage.js
import React from "react";
import Navbar from "../../common/navbar";
import ProfileBox from "../../common/ProfileBox";
import MatchesBox from "../../common/MatchesBox";
import { UseAuth } from "../../context/AuthContext";
import CalendarBox from "../../common/CalendarBox";

const Home = () => {
  const { user } = UseAuth();

  // if (!user) {
  //   return <div>Please log in</div>;
  // }

  const events = [
    { title: "Meeting", date: "2024-11-08T10:00:00", duration: 2 },
    { title: "Lunch", date: "2024-11-08T12:00:00", duration: 1 },
    { title: "Project Review", date: "2024-11-09T14:00:00", duration: 3 },
  ];

  return (
    <div className="h-full p-6 flex flex-col space-y-20">
      <Navbar />
      <div className="grid md:grid-cols-4 gap-6 min-h-full">
        <div className="flex-grow md:col-span-1 bg-[#E3E0E0] shadow rounded-lg overflow-hidden">
          <ProfileBox user={user} />
        </div>

        <div className="md:col-span-2 bg-[#E3E0E0] overflow-hidden shadow rounded-lg">
          <CalendarBox user={user} events={events} />
        </div>

        <div className="md:col-span-1 bg-[#E3E0E0] shadow rounded-lg p-4">
          <MatchesBox user={user} />
        </div>
      </div>
    </div>
  );
};

export default Home;
