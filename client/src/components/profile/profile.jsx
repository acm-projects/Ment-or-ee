import React from "react";
import ProfileComponent from "./profileComponent";
import { UseAuth } from "../../context/AuthContext";

const Profile = () => {
  const { user } = UseAuth();

  return (
    <div className="flex flex-col">
      <ProfileComponent user={user} selfView={true} />
    </div>
  );
};

export default Profile;
