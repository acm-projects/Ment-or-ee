import React from "react";

function TextQuestion({ question, onAnswer, curAnswer }) {
  return (
    <div data-testid="text question">
      <h2 className="text-4xl font-semibold mb-6 text-[#B69D74]">{question}</h2>
      <input
        className="block w-full border-2 border-[#D9D9D9] bg-[#D9D9D9] text-[#1F2839] py-1 px-5 rounded-md font-semibold"
        type="text"
        value={curAnswer}
        onChange={(e) => onAnswer(e.target.value)}
      />
    </div>
  );
}

export default TextQuestion;
