import React, { useState } from "react";
import { UseAuth } from "../../context/AuthContext";
import { Questions } from "../questions/Questions";
import { useNavigate } from "react-router-dom";

const QuestionsSubmit = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const updateFormData = (data) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
  };
  const [error, setError] = useState("");

  const { user } = UseAuth(); //use when user submits questionnaire

  const handleSubmit = async () => {
    console.log("handling question submission"); //testing
    console.log(formData); //testing
    setError("");

    try {
      const response = await fetch(
        "http://localhost:5001/api/authenication/store-auth/", //get uri for questionnaire
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Questionnaire submission failed");
      } else {
        //do somethign here is successful
        navigate("/home");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="flex-grow flex">
        <Questions
          formData={formData}
          updateFormData={updateFormData}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default QuestionsSubmit;
