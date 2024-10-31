import React from "react";
import AutoProfile from "../assets/autoprofile.png";
import { TiEdit } from "react-icons/ti";
import LeftBox from "./LeftBox";

function profileBox({ user }) {
  console.log(user); //testing

  if (user.role === "Mentor") {
    return (
      <LeftBox title="Profile" name={user.name} role={user.role}>
        {/* add profile pic */}
        <h3 className="text-lg">
          Location: {user.location.city}, {user.location.state}
        </h3>
        <h3 className="text-lg py-2">Languages: {user.languages}</h3>
        <h3 className="text-lg py-2">Career Field:</h3>
        {/* populate career field later */}
        {/* <h3 className="text-lg">Skills: {user.skills}</h3>
          <h3 className="text-lg">University: {user.university}</h3> */}
        <h3 className="text-lg py-2">
          Personality Type: {user.personalityType}
        </h3>
        <div
          data-testid={"history"}
          className="w-full flex flex-col justify-center"
        >
          <h3 className="text-lg py-2">Current Mentees: </h3>
          <h3 className="text-lg py-2">Past Mentees: </h3>
        </div>
      </LeftBox>
    );
  } else {
    return (
      <LeftBox title="Profile" name={user.name} role={user.role}>
        {/* add profile pic */}
        <h3 className="text-lg">
          Location: {user.location.city}, {user.location.state}
        </h3>
        <h3 className="text-lg py-2">Languages: {user.languages}</h3>
        <h3 className="text-lg py-2">Career Field:</h3>
        {/* populate career field later */}
        {/* <h3 className="text-lg">Skills: {user.skills}</h3>
          <h3 className="text-lg">University: {user.university}</h3> */}
        <h3 className="text-lg py-2">
          Personality Type: {user.personalityType}
        </h3>
        <div
          data-testid={"history"}
          className="w-full flex flex-col justify-center"
        >
          <h3 className="text-lg py-2">Current Mentors: </h3>
          <h3 className="text-lg py-2">Past Mentors: </h3>
        </div>
      </LeftBox>
    );
  }
}

export default profileBox;
