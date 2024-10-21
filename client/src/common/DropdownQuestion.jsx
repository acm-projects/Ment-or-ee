import React from "react";

export default function DropdownQuestion({
  question,
  options,
  onAnswer,
  curAnswer,
}) {
  return (
    <div data-testid="dropdown question">
      <label className="block text-4xl font-semibold mb-6 text-[#B69D74]">
        {question}
      </label>
      <select
        value={curAnswer}
        onChange={(e) => onAnswer(e.target.value)}
        className="bg-[#D9D9D9] text-[#1F2839] py-1 px-5 rounded-md font-semibold mt-4 block w-full pl-3 pr-10 py-2 focus:outline-none focus:ring-indigo-500 sm:text-sm"
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
