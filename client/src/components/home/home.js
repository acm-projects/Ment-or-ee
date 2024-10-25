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

  return (
    <div className="p-6 flex flex-col space-y-20">
      <Navbar />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 bg-[#E3E0E0] shadow rounded-lg overflow-hidden">
          <ProfileBox user={user} />
        </div>

        <div className="lg:col-span-2 bg-[#E3E0E0] overflow-hidden shadow rounded-lg">
          <CalendarBox user={user} />
        </div>

        <div className="lg:col-span-1 bg-[#E3E0E0] shadow rounded-lg p-4">
          <MatchesBox user={user} />
        </div>
      </div>
    </div>
  );
};

export default Home;
