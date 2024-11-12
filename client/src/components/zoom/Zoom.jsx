import React, { useState } from "react";
// import { UseAuth } from "../../context/AuthContext";

const Zoom = ({ user, matches }) => {
  //receive user and matches
  //put userid and matchesid into zoomForm
  //   const { user } = UseAuth();
  const [zoomForm, setZoomForm] = useState({});

  const handleSubmit = async () => {
    console.log("attemping zoom submit"); //testing
    // console.log(formData); //testing

    try {
      const response = await fetch(
        "http://localhost:5000/zoom", //get url
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ zoomForm }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Creating zoom failed");
      } else {
        // Creating zoom success
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#B89C75] rounded-lg w-80">
      <div className="flex flex-col justify-center m-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
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
                setZoomForm({
                  ...zoomForm,
                  ...{ date: e.target.value },
                });
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
                setZoomForm({
                  ...zoomForm,
                  ...{ duration: e.target.value },
                });
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
                setZoomForm({
                  ...zoomForm,
                  ...{ description: e.target.value },
                });
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
    </div>
  );
};

export default Zoom;
