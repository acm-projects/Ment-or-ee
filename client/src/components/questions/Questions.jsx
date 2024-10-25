import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import TextQuestion from "../../common/TextQuestion.js";
import ButtonQuestion from "../../common/ButtonQuestion.js";
import DropdownQuestion from "../../common/DropdownQuestion.jsx";

export function Questions({ formData, updateFormData, handleSubmit }) {
  const navigate = useNavigate();

  const questions = [
    {
      key: "role",
      type: "button",
      text: "Are you a Mentor or a Mentee?",
      option1: "Mentor",
      option2: "Mentee",
    },
    { key: "name", type: "text", text: "What is your full name?" },
    { key: "city", type: "text", text: "What city do you live in?" },
    {
      key: "state",
      type: "dropdown",
      text: "What state do you live in?",
      options: [
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming",
      ],
    },
    {
      key: "languages",
      type: "dropdown",
      text: "What languages do you speak?",
      options: [
        "English",
        "Spanish",
        "Chinese",
        "Tagalog",
        "Vietnamese",
        "Arabic",
        "French",
        "German",
        "Russian",
        "Italian",
        "Portuguese",
        "Japanese",
        "Korean",
        "Hindi",
        "Persian",
      ],
    }, //TODO: multiselect
    {
      key: "personalityType",
      type: "button",
      text: "Do you prefer an introverted or extroverted mentor?",
      option1: "Introvert",
      option2: "Extrovert",
      condition: () => formData.role === "Mentee",
    },
    {
      key: "personalityType",
      type: "button",
      text: "Are you an introvert or an extrovert?",
      option1: "Introvert",
      option2: "Extrovert",
      condition: () => formData.role === "Mentor",
    },
    {
      key: "university",
      type: "text",
      text: "What university are you currently attending?",
      condition: () => formData.role === "Mentee",
    },
    {
      key: "university",
      type: "text",
      text: "What university did you graduate from?",
      condition: () => formData.role === "Mentor",
    },
    // {
    //   key: "degrees",
    //   type: "text",
    //   text: "What degrees do you have?",
    //   condition: () => formData.role === "Mentor",
    // },
    // {
    //   key: "company",
    //   type: "text",
    //   text: "What company do you currently work for?",
    //   condition: () => formData.role === "Mentor",
    // },
    {
      key: "educationLevel",
      type: "dropdown",
      text: "What is your level of education",
      options: ["First Year", "Second Year", "Third Year", "Fourth Year"],
      condition: () => formData.role === "Mentee",
    },
    // { key: "major", type: "text", text: "What is your major?", condition: () => formData.role === "Mentee" },
    // { key: "degrees", type: "text", text: "What degrees do you have?", condition: () => formData.role === "Mentee" },
    // { key: "jobTitle", type: "text", text: "What is your job title?", condition: () => formData.role === "Mentor", },
    // {
    //   key: "fields",
    //   type: "text",
    //   text: "What career fields are you interested in?",
    //   condition: () => formData.role === "Mentee",
    // },
    // {
    //   key: "fields",
    //   type: "text",
    //   text: "What career fields are you interested in teaching?",
    //   condition: () => formData.role === "Mentor",
    // },
    // {
    //   key: "industry",
    //   type: "dropdown",
    //   text: "What industries are you interested in working in?",
    //   condition: () => formData.role === "Mentee",
    // },
    // {
    //   key: "industry",
    //   type: "dropdown",
    //   text: "What industry do you work in?",
    //   condition: () => formData.role === "Mentor",
    // },
    // {
    //   key: "growthAreas", //TODO: multi select
    //   type: "dropdown",
    //   text: "What are some growth areas you would like to focus on?",
    //   options: [
    //     "Resume",
    //     "Interviewing Skills",
    //     "Networking",
    //     "Job Search Strategies",
    //     "Cover Letter Writing",
    //     "Portfolio Development",
    //     "Job Offer Evaluation",
    //     "Soft Skills",
    //   ],
    //   condition: () => formData.role === "Mentee",
    // },
    // {
    //   key: "importantCategories", //TODO: slider for each of the categories
    //   type: "dropdown",
    //   text: "What categories do you find the most important?",
    //   options: [
    //     "Location",
    //     "Language",
    //     "University",
    //     "Career Field",
    //     "Introvert vs Extrovert",
    //   ],
    //   condition: () => formData.role === "Mentee",
    // },
  ];

  const [curQuestionIndex, setCurQuestionIndex] = useState(0);

  const curQuestion = questions[curQuestionIndex];

  const handleAnswer = (answer) => {
    updateFormData({ [curQuestion.key]: answer });
  };

  const getNextQuestionIndex = (curIndex) => {
    for (let i = curIndex + 1; i < questions.length; i++) {
      if (!questions[i].condition || questions[i].condition()) {
        return i;
      }
    }
    return -1;
  };

  //displaying next question, submitting if reached end
  const handleNext = () => {
    const nextIndex = getNextQuestionIndex(curQuestionIndex);
    if (nextIndex !== -1) {
      setCurQuestionIndex(nextIndex);
    } else {
      handleSubmit();
    }
  };

  if (!curQuestion) {
    return null;
  }

  //displaying questions
  const renderQuestion = () => {
    switch (curQuestion.type) {
      case "button":
        return (
          <ButtonQuestion
            question={curQuestion.text}
            option1={curQuestion.option1}
            option2={curQuestion.option2}
            onAnswer={handleAnswer}
            curAnswer={formData[curQuestion.key] || ""}
          />
        );
      case "text":
        return (
          <TextQuestion
            question={curQuestion.text}
            onAnswer={handleAnswer}
            curAnswer={formData[curQuestion.key] || ""}
          />
        );

      case "dropdown":
        return (
          <DropdownQuestion
            question={curQuestion.text}
            options={curQuestion.options}
            onAnswer={handleAnswer}
            curAnswer={formData[curQuestion.key] || ""}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      data-testid={"questions background"}
      className="w-full h-screen bg-[#1F3839]"
    >
      <div data-testid={"padding"} className="p-10">
        <div
          onClick={() => navigate("/")}
          className="flex items-center px-6 py-4"
        >
          <img src={logo} alt="mentor/ee logo" className="h-16 w-auto mr-2" />
          <div className="text-3xl font-bold text-white">mentor/ee</div>
        </div>
        <div
          data-testid={"Question container"}
          className="flex text-center items-center justify-center h-screen"
        >
          <div className="text-center">
            {renderQuestion()}

            <div className="mt-6 ">
              <button
                data-testid="next button"
                onClick={handleNext}
                className="flex justify-center border-2 border-[#B69D74] bg-[#B69D74] text-[#1F2839] py-2 px-5 rounded-full hover:bg-transparent hover:text-[#D9D9D9] font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B69D74]"
              >
                {getNextQuestionIndex(curQuestionIndex) === -1
                  ? "Sign Up"
                  : "Next"}
              </button>
            </div>
          </div>
        </div>
        <div data-testid={"progress bar"}>{/* finish later if time */}</div>
      </div>
    </div>
  );
}
