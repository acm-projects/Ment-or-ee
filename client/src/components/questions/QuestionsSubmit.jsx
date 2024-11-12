import React, { useState, useEffect } from "react";
import { UseAuth } from "../../context/AuthContext";
import { Questions } from "./Questions";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const QuestionsSubmit = () => {
  const { login } = UseAuth();
  const location = useLocation();
  const prevSignupData = location.state?.prevSignupData;

  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const updateFormData = (data) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
  };

  useEffect(() => {
    if (prevSignupData) {
      updateFormData(prevSignupData);
    }
  }, []);

  const [error, setError] = useState("");

  const { user } = UseAuth(); //use when user submits questionnaire

  const handleSubmit = async () => {
    console.log("attemping signup submit"); //testing
    console.log(formData); //testing
    setError("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/authenication/store-auth/signup", //get api for questionnaire
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
        throw new Error(errorData.message || "Signup failed");
      } else {
        login(formData.username, formData.password);
        navigate("/home");
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
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
