import React, { useState } from "react";
// import { format, startOfWeek, addDays, isSameDay } from "date-fns";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function CalendarBox({ user, events }) {
  const navigate = useNavigate();
  return (
    <div>
      <div data-testid={"header"} className="bg-[#B89C75] w-full">
        <h1 className="p-2 pl-4 pt-4 text-2xl text-black font-semibold mb-2">
          Schedule
        </h1>
      </div>
      <div className="p-2">
        <div className="text-2xl text-center">
          <button className="px-2 text-sm">
            <FaArrowLeft />
          </button>
          October 2024
          <button className="px-2 text-sm">
            <FaArrowRight />
          </button>
        </div>
        <div className="m-2">
          {events.length > 0 ? (
            <div>
              {events.map((events) => (
                <div
                  key={events.title}
                  className="flex w-full mb-1 bg-slate-100 rounded-lg"
                >
                  <div className="w-3/4 h-70 flex flex-col justify-between pl-4 py-6">
                    <button
                      onClick={() => navigate("/tasks")}
                      className="text-2xl font-bold"
                    >
                      {events.title}
                    </button>
                    <p>
                      <span className="font-bold">Date:</span>{" "}
                      {events.date.split("T")[0]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="p-2 text-lg">No events planned yet!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CalendarBox;
