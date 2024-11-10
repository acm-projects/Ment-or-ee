import React, { useState } from "react";
import { UseAuth } from "../../context/AuthContext";
import { EmailPassForm } from "./emailpassform";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [signupData, setSignupData] = useState({});
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const { login } = UseAuth();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError("");
  //   console.log("attempting signup submit"); //testing
  //   console.log(signupData);
  //   // navigate("/questions");

  //   try {
  //     const response = await fetch(
  //       "http://localhost:5000/api/authenication/store-auth/signup-basic",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(signupData),
  //       }
  //     );
  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(errorData.message || "Registration failed");
  //     } else {
  //       // login(signupData.username, signupData.password);
  //       navigate("/questions");
  //     }
  //   } catch (error) {
  //     setError(error.message);
  //     console.log(error);
  //   }
  // };

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="flex-grow flex">
        <EmailPassForm
          signupData={signupData}
          setSignupData={setSignupData}
          handleSubmit={() =>
            navigate("/questions", {
              state: { prevSignupData: signupData },
            })
          }
        />
      </div>
    </div>
  );
};

export default Signup;
