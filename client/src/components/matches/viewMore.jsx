import React from "react";
import ProfileComponent from "../profile/profileComponent";
import { useLocation } from "react-router-dom";

const ViewMore = () => {
  const location = useLocation();
  const user = location.state?.user;

  if (!user) {
    return <div>No user data available</div>;
  }

  return (
    <div className="flex flex-col">
      <ProfileComponent user={user} />
      {user.industries.join(", ")}
    </div>
  );
};

export default ViewMore;
