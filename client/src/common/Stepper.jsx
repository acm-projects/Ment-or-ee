import React, { useState, useEffect } from "react";

const Stepper = ({ fields, onWeightageChange, onAnswer, curAnswer }) => {
  const [weights, setWeights] = useState(Array(fields.length).fill(0));
  const [totalWeightage, setTotalWeightage] = useState(0);

  useEffect(() => {
    // Calculate total when weights change
    const total = weights.reduce((acc, curr) => acc + curr, 0);
    setTotalWeightage(total);
    onWeightageChange(weights);
  }, [weights, onWeightageChange]);

  const handleStep = (index, step) => {
    const newWeights = [...weights];
    const newValue = newWeights[index] + step;

    if (newValue >= 0 && newValue <= 100) {
      newWeights[index] = newValue;
      setWeights(newWeights);
      if (onAnswer) {
        onAnswer(newWeights);
      }
    }
  };

  return (
    <div className="flex flex-col w-full p-8">
      {/* Title */}
      <h2 className="text-3xl mb-6 text-center">Matching Preferences</h2>

      {/* Preferences Section */}
      <div className="flex justify-between">
        {/* Preferences List */}
        <div className="space-y-4 w-1/2">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center justify-between">
              {/* Field Label */}
              <label className="text-xl text-[#B89C75] font-medium">
                {field.label}
              </label>

              {/* Stepper Buttons */}
              <div className="flex items-center space-x-4">
                <button
                  className="bg-[#B89C75] text-white px-3 py-1 rounded"
                  onClick={() => handleStep(index, -10)}
                  disabled={weights[index] === 0}
                >
                  -
                </button>
                <p className="w-10 text-center">{weights[index]}%</p>
                <button
                  className="bg-[#B89C75] text-white px-3 py-1 rounded"
                  onClick={() => handleStep(index, 10)}
                  disabled={weights[index] === 100}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Total Weightage Display */}
        <div className="flex flex-col items-center justify-center w-1/2">
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
    </div>
  );
};

export default Stepper;


// import React, { useState, useEffect } from "react";

// const Stepper = ({ fields, onWeightageChange, onAnswer, curAnswer }) => {
//   const [weights, setWeights] = useState(Array(fields.length).fill(0));
//   const [totalWeightage, setTotalWeightage] = useState(0);

//   useEffect(() => {
//     // Calculate total when weights change
//     const total = weights.reduce((acc, curr) => acc + curr, 0);
//     setTotalWeightage(total);
//     onWeightageChange(weights);
//   }, [weights, onWeightageChange]);

//   const handleStep = (index, step) => {
//     const newWeights = [...weights];
//     const newValue = newWeights[index] + step;

//     if (newValue >= 0 && newValue <= 100) {
//       newWeights[index] = newValue;
//       setWeights(newWeights);
//       if (onAnswer) {
//         onAnswer(newWeights);
//       }
//     }
//   };

//   return (
//     <div className="flex w-full p-8 rounded">
//       {/* Left Half: Stepper Buttons Section */}
//       <div className="w-1/2 pr-8">
//         <h2 className="text-3xl mb-4">Matching Preferences</h2>
//         {fields.map((field, index) => (
//           <div key={field.id} className="mb-3">
//             <label className="block text-xl text-[#B89C75] font-medium mb-1">
//               {field.label}
//             </label>
//             <div className="flex items-center space-x-2">
//               <button
//                 className="bg-[#B89C75] text-white px-3 py-1 rounded"
//                 onClick={() => handleStep(index, -10)}
//                 disabled={weights[index] === 0}
//               >
//                 -
//               </button>
//               <p className="w-10 text-center">{weights[index]}%</p>
//               <button
//                 className="bg-[#B89C75] text-white px-3 py-1 rounded"
//                 onClick={() => handleStep(index, 10)}
//                 disabled={weights[index] === 100}
//               >
//                 +
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Right Half: Total Weightage Display */}
//       <div className="w-1/2 pl-8 flex flex-col items-start justify-center">
//         <div
//           className={`text-3xl ${
//             totalWeightage === 100 ? "text-[#B89C75]" : "text-[#1F2839]"
//           }`}
//         >
//           Total Weightage: {totalWeightage}%
//         </div>
//         {totalWeightage !== 100 && (
//           <p className="text-2xl text-[#B89C75] mt-4">Total must be 100%</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Stepper;


// // import React, { useState, useEffect } from "react";

// // const Slider = ({ fields, onWeightageChange, onAnswer, curAnswer }) => {
// //   const [weights, setWeights] = useState(Array(fields.length).fill(0));
// //   const [totalWeightage, setTotalWeightage] = useState(0);

// //   useEffect(() => {
// //     // Calculate total when weights change
// //     const total = weights.reduce((acc, curr) => acc + curr, 0);
// //     setTotalWeightage(total);
// //     onWeightageChange(weights);
// //   }, [weights, onWeightageChange]);

// //   const handleChange = (index, value) => {
// //     const newWeights = [...weights];
// //     newWeights[index] = parseInt(value, 10);
// //     setWeights(newWeights);
// //     if (onAnswer) {
// //       console.log("got  here");
// //       onAnswer(newWeights);
// //     }
// //   };

// //   return (
// //     <div className="flex w-full p-8 rounded">
// //       {/* Left Half: Sliders Section */}
// //       <div className="w-1/2 pr-8">
// //         <h2 className="text-3xl mb-4">Matching Preferences</h2>
// //         {fields.map((field, index) => (
// //           <div key={field.id} className="mb-3">
// //             <label className="block text-xl text-[#B89C75] font-medium mb-1">
// //               {field.label}
// //             </label>
// //             <div className="flex items-center space-x-2">
// //               <input
// //                 type="range"
// //                 min="0"
// //                 max="100"
// //                 step="10"
// //                 value={weights[index]}
// //                 onChange={(e) => handleChange(index, e.target.value)}
// //                 className="flex-grow"
// //               />
// //               <p className="w-5 text-right">{weights[index]}%</p>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Right Half: Total Weightage Display */}
// //       <div className="w-1/2 pl-8 flex flex-col items-start justify-center">
// //         <div
// //           className={`text-3xl ${
// //             totalWeightage === 100 ? "text-[#B89C75]" : "text-[#1F2839]"
// //           }`}
// //         >
// //           Total Weightage: {totalWeightage}%
// //         </div>
// //         {totalWeightage !== 100 && (
// //           <p className="text-2xl text-[#B89C75] mt-4">Total must be 100%</p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Slider;
