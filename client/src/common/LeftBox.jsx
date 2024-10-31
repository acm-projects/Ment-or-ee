import React from "react";
import AutoProfile from "../assets/autoprofile.png";

function LeftBox({ title, name, children, role }) {
  return (
    <div data-testid={"profile"} className="flex flex-col items-center w-full">
      <div data-testid={"header"} className="bg-[#B89C75] w-full ">
        <h1 className=" pt-4 text-2xl text-black font-semibold mb-2 text-center">
          {title}
        </h1>
      </div>
      <div
        data-testid={"personalinfo"}
        className="w-full px-4 flex flex-col justify-center"
      >
        <div
          data-testid={"profilepicture"}
          className="flex justify-center p-4 items-center"
        >
          <img
            src={AutoProfile}
            alt="Auto Profile"
            className="w-[135px] h-[135px] object-cover"
          />
        </div>
        <h1 className="text-2xl text-black font-semibold mb-2 text-center">
          Hi {name}!
        </h1>
        <h2 className="text-center text-xl py-2">{role}</h2>
        {children}
      </div>
    </div>
  );
}

export default LeftBox;
