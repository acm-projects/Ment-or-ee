import React, { useState } from "react";
import { UseAuth } from "../../context/AuthContext";
import { EmailPassForm } from "./emailpassform";
import { Questions } from "../questions/Questions";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const updateFormData = (data) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
  };

  const [error, setError] = useState("");

  const { login } = UseAuth();

  const handleSubmit = async () => {
    setError("");

    try {
      const response = await fetch(
        "http://localhost:5001/api/authenication/store-auth/signup",
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
        throw new Error(errorData.message || "Registration failed");
      } else {
        login(formData.username, formData.password);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="flex-grow flex">
        {step === 1 && (
          <EmailPassForm
            formData={formData}
            updateFormData={updateFormData}
            setStep={setStep}
          />
        )}
        {step === 2 && (
          <Questions
            formData={formData}
            updateFormData={updateFormData}
            handleSubmit={handleSubmit}
            setStep={setStep}
            step={step}
          />
        )}
      </div>
    </div>
  );
};

export default Signup;
