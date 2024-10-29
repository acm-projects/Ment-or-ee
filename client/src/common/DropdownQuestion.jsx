import React, { useState, useRef, useEffect } from "react";

export default function DropdownQuestion({
  question,
  options,
  multi,
  onAnswer,
  curAnswer,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (curAnswer === "") {
      setSelectedOptions([]);
    } else if (typeof curAnswer === "string") {
      setSelectedOptions(curAnswer.split(",").filter(Boolean));
    }
  }, [curAnswer]);

  const toggleOption = (option) => {
    setSelectedOptions((prev) => {
      let newSelections;
      if (multi) {
        newSelections = prev.includes(option)
          ? prev.filter((item) => item !== option)
          : [...prev, option];
      } else {
        newSelections = [option];
      }
      onAnswer(newSelections.join(","));
      return newSelections;
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div data-testid="dropdown question" className="relative" ref={dropdownRef}>
      <label className="block text-4xl font-semibold mb-6 text-[#B69D74]">
        {question}
      </label>
      <div
        className="bg-[#D9D9D9] text-[#1F2839] py-2 px-5 rounded-md font-semibold mt-4 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOptions.length > 0
          ? selectedOptions.join(", ")
          : "Select option(s)"}
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <div
              key={option}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                selectedOptions.includes(option) ? "bg-blue-100" : ""
              }`}
              onClick={() => toggleOption(option)}
            >
              <input
                type={multi ? "checkbox" : "radio"}
                checked={selectedOptions.includes(option)}
                onChange={() => {}}
                className="mr-2"
              />
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
