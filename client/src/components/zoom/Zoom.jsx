import React, { useState, useEffect } from "react";

const Zoom = ({ zoomForm, setZoomForm, handleZoomSubmit }) => {
  const updateZoomForm = (data) => {
    setZoomForm((prevData) => ({ ...prevData, ...data }));
  };

  return (
    <div className="flex flex-col justify-center m-5">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleZoomSubmit();
        }}
      >
        <div className="mt-5">
          <label htmlFor="Title"></label>
          <input
            type="title"
            onChange={(e) => {
              setZoomForm({
                ...zoomForm,
                ...{ title: e.target.value },
              });
            }}
            id="title"
            className="w-full block border text-base px-3 py-2 focus:outline-none focus:ring-0 focus:border-gray-600 rounded-full"
            placeholder="Title"
            required
          />
        </div>
        <div className="mt-4">
          <label htmlFor="date"></label>
          <input
            type="datetime-local"
            onChange={(e) => {
              updateZoomForm({ date: e.target.value });
            }}
            id="date"
            className="w-full block border text-base px-3 py-2 focus:outline-none focus:ring-0 focus:border-gray-600 rounded-full"
            placeholder="Date Time"
            required
          />
        </div>
        <div className="mt-4">
          <label htmlFor="duration"></label>
          <input
            type="duration"
            onChange={(e) => {
              updateZoomForm({ duration: e.target.value });
            }}
            id="duration"
            className="w-full block border text-base px-3 py-2 focus:outline-none focus:ring-0 focus:border-gray-600 rounded-full"
            placeholder="Duration (in minutes)"
            required
          />
        </div>
        <div className="mt-4">
          <label htmlFor="description"></label>
          <input
            type="description"
            onChange={(e) => {
              updateZoomForm({ description: e.target.value });
            }}
            id="description"
            className="w-full block border text-base px-3 py-2 focus:outline-none focus:ring-0 focus:border-gray-600 rounded-full"
            placeholder="Description"
            required
          />
        </div>
        <div className="mt-5">
          <button
            type="submit"
            className="border-2 border-[#1F3839] bg-[#1F3839] text-white py-1 px-5 rounded-md  font-semibold"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Zoom;
