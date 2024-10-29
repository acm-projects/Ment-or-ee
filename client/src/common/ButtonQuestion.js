import React, { useState } from "react";

function ButtonQuestion({ question, option1, option2, onAnswer, curAnswer }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onAnswer(option);
  };

  return (
    <div data-testid="button question">
      <h2 className="text-4xl font-semibold mb-6 text-[#B69D74]">{question}</h2>
      <div
        className="flex justify-center space-x-4"
        data-testid="options container"
      >
        <button
          onClick={() => handleOptionClick(option1)}
          className={`border-2 py-2 px-5 rounded-md font-semibold transition-colors duration-200 ${
            selectedOption === option1
              ? "bg-[#1F2839] text-[#D9D9D9] border-[#1F2839]"
              : "bg-[#D9D9D9] text-[#1F2839] border-[#D9D9D9] hover:bg-transparent hover:text-[#1F2839] hover:border-[#1F2839]"
          }`}
        >
          {option1}
        </button>
        <button
          onClick={() => handleOptionClick(option2)}
          className={`border-2 py-2 px-5 rounded-md font-semibold transition-colors duration-200 ${
            selectedOption === option2
              ? "bg-[#1F2839] text-[#D9D9D9] border-[#1F2839]"
              : "bg-[#D9D9D9] text-[#1F2839] border-[#D9D9D9] hover:bg-transparent hover:text-[#1F2839] hover:border-[#1F2839]"
          }`}
        >
          {option2}
        </button>
      </div>
    </div>
  );
}

export default ButtonQuestion;
