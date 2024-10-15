import React from 'react'

function ButtonQuestion({ question, option1, option2, onAnswer }) {
    return (
        <div data-testid="button question">
            <h2 className='text-4xl font-semibold mb-6 text-[#B69D74]'>{question}</h2>
            <div className="flex justify-center space-x-4" data-testid="options container">
                <button onClick={() => onAnswer(option1)} className="border-2 border-[#D9D9D9] bg-[#D9D9D9] text-[#1F2839] py-2 px-5 rounded-md hover:bg-transparent hover:text-[#D9D9D9] font-semibold">{option1}</button>
                <button onClick={() => onAnswer(option2)} className="border-2 border-[#D9D9D9] bg-[#D9D9D9] text-[#1F2839] py-2 px-5 rounded-md hover:bg-transparent hover:text-[#D9D9D9] font-semibold">{option2}</button>
            </div>
        </div>
    );
}

export default ButtonQuestion;
