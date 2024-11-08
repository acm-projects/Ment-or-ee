import React, { useState, useEffect } from "react";

const Slider = ({ fields, onWeightageChange, onAnswer, curAnswer }) => {
  const [weights, setWeights] = useState(Array(fields.length).fill(0));
  const [totalWeightage, setTotalWeightage] = useState(0);

  useEffect(() => {
    // Calculate total when weights change
    const total = weights.reduce((acc, curr) => acc + curr, 0);
    setTotalWeightage(total);
    onWeightageChange(weights);
  }, [weights, onWeightageChange]);

  const handleChange = (index, value) => {
    const newWeights = [...weights];
    newWeights[index] = parseInt(value, 10);
    setWeights(newWeights);
    if (onAnswer) {
      console.log("got  here");
      onAnswer(newWeights);
    }
  };

  return (
    <div className="flex w-full p-8 bg-white rounded">
      {/* Left Half: Sliders Section */}
      <div className="w-1/2 pr-8">
        <h2 className="text-3xl mb-4">Matching Preferences</h2>
        {fields.map((field, index) => (
          <div key={field.id} className="mb-6">
            <label className="block text-xl text-[#B89C75] font-medium">
              {field.label}
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="10"
              value={weights[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-full"
            />
            <p>{weights[index]}%</p>
          </div>
        ))}
      </div>

      {/* Right Half: Total Weightage Display */}
      <div className="w-1/2 pl-8 flex flex-col items-start justify-center">
        <div
          className={`text-3xl ${
            totalWeightage === 100 ? "text-[#B89C75]" : "text-[#1F2839]"
          }`}
        >
          Total Weightage: {totalWeightage}%
        </div>
        {totalWeightage !== 100 && (
          <p className="text-2xl text-[#B89C75] mt-4">Total must be 100%</p>
        )}
      </div>
    </div>
  );
};

export default Slider;
