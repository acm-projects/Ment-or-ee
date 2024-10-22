import React, { useEffect } from "react";
import AutoProfile from "../assets/autoprofile.png";
import { useNavigate } from "react-router-dom";
import { useMatches } from "../context/MatchesContext";

function MatchesBox() {
  const { matches, fetchMatches } = useMatches();

  useEffect(() => {
    fetchMatches();
  }, []);

  console.log(matches); //testing

  const navigate = useNavigate();

  return (
    <div data-testid={"profile"} className="flex flex-col items-center">
      <div data-testid={"header"} className="px-4 py-2 w-full ">
        {/* bg-[#B89C75]  */}
        <h1 className="text-2xl text-black font-semibold mb-2 text-center">
          Matches
        </h1>
        {/* <TiEdit /> */}
      </div>
      <div
        data-testid={"matches"}
        className="w-full p-2 flex flex-col justify-center"
      >
        <div
          data-testid={"Match1"}
          className="grid grid-cols-2 py-3 flex justify-center items-center"
        >
          <img
            src={AutoProfile}
            alt="Auto Profile"
            className="w-[100px] h-[100px] object-cover"
          />
          <h1 className="text-2xl text-black font-semibold mb-2 text-center">
            Match 1 (populate)
          </h1>
        </div>
        <div
          data-testid={"Match2"}
          className="grid grid-cols-2 py-3 flex justify-center items-center"
        >
          <img
            src={AutoProfile}
            alt="Auto Profile"
            className="w-[100px] h-[100px] object-cover"
          />
          <h1 className="text-2xl text-black font-semibold mb-2 text-center">
            Match 2
          </h1>
        </div>
        <div
          data-testid={"Match3"}
          className="grid grid-cols-2 py-3 flex justify-center items-center"
        >
          <img
            src={AutoProfile}
            alt="Auto Profile"
            className="w-[100px] h-[100px] object-cover"
          />
          <h1 className="text-2xl text-black font-semibold mb-2 text-center">
            Match 3
          </h1>
        </div>
      </div>

      <div class="mt-5">
        <button
          type="submit"
          className="border-2 border-[#B89C75] bg-[#B89C75] text-black py-1 px-5 rounded-md hover:bg-transparent hover:text-[#1F3839] font-semibold"
          onClick={() => navigate("/matches")}
        >
          Discover more matches
        </button>
      </div>
    </div>
  );
}

export default MatchesBox;
