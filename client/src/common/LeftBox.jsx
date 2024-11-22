import React from "react";
import robertProfile from "../assets/robertsmith.png";
import autoprofile from "../assets/autoprofile.png";

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
          {(() => {
            switch (name) {
              case "Robert Smith":
                return (
                  <img
                    src={robertProfile}
                    alt="Profile"
                    className="w-[135px] h-[135px] object-cover rounded-full"
                  />
                );
              default:
                return (
                  <img
                    src={autoprofile}
                    alt="Profile"
                    className="w-[135px] h-[135px] object-cover rounded-full"
                  />
                );
            }
          })()}
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
