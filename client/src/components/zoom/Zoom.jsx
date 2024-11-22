import React, { useState, useEffect } from "react";

const Zoom = ({ zoomForm, setZoomForm, handleZoomSubmit }) => {
  const updateZoomForm = (data) => {
    setZoomForm((prevData) => ({ ...prevData, ...data }));
  };

  return (
    <div className="rounded-lg p-3 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#1F2839]">
        Schedule Zoom Meeting
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleZoomSubmit();
        }}
        autocomplete="off"
        className="space-y-4"
      >
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            type="text"
            onChange={(e) =>
              setZoomForm({ ...zoomForm, title: e.target.value })
            }
            id="title"
            className="w-full block border border-gray-300 text-base px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F2839] focus:border-transparent"
            placeholder="Enter meeting title"
            required
          />
        </div>
        {/* <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <input
            type="text"
            onChange={(e) => updateZoomForm({ description: e.target.value })}
            id="description"
            className="w-full block border border-gray-300 text-base px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F2839] focus:border-transparent"
            placeholder="Enter meeting description"
            required
          />
        </div> */}
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Date and Time
          </label>
          <input
            type="datetime-local"
            onChange={(e) => updateZoomForm({ date: e.target.value })}
            id="date"
            className="w-full block border border-gray-300 text-base px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F2839] focus:border-transparent"
            required
          />
        </div>
        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            className="bg-[#1F2839] text-white py-2 px-6 rounded-md font-semibold hover:bg-[#2C3A4F] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1F2839]"
          >
            Schedule Meeting
          </button>
        </div>
      </form>
    </div>
  );
};

export default Zoom;
