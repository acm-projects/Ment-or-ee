import React, { useState } from 'react'
import logo from '../../assets/logo.svg'
import { useNavigate } from 'react-router-dom';
import TextQuestion from '../../common/TextQuestion'
import ButtonQuestion from '../../common/ButtonQuestion'
import DropdownQuestion from '../../common/DropdownQuestion.jsx'

function Questions({ questions }) {
  const [QuestionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({});
  const [curAnswer, setCurAnswer] = useState('');

  const handleAnswer = (answer) => {
    setCurAnswer(answer);
  };

  const handleNext = () => {
    if (curAnswer !== '') {
      setAnswers({ ...answers, [QuestionIndex]: curAnswer });
      setCurAnswer('');
      if (QuestionIndex < questions.length - 1) {
        setQuestionIndex(QuestionIndex + 1);
      } else {
        console.log('Questionnaire completed', answers);
        navigate('/menteehome')
      }
    }
  };

  const curQuestion = questions[QuestionIndex];

  const navigate = useNavigate();

  return (
    <div data-testid={'questions background'} className='w-full h-screen bg-[#1F3839]'>
      <div data-testid={'padding'} className='p-10'>
        <div onClick={() => navigate('/')} className="flex items-center px-6 py-4">
          <img
            src = {logo}
            alt="mentor/ee logo"
            className="h-16 w-auto mr-2"
          />
          <div className="text-3xl font-bold text-white">mentor/ee</div>
        </div>
        <div data-testid={'Question container'} className='flex items-center justify-center h-screen'>
          <div className='text-center'>
            {curQuestion.type === 'text' && (
              <TextQuestion
                question={curQuestion.text}
                onAnswer={handleAnswer}
                curAnswer={curAnswer}
              />
            )}
            {curQuestion.type === 'button' && (
              <ButtonQuestion
                question={curQuestion.text}
                option1={curQuestion.option1}
                option2={curQuestion.option2}
                onAnswer={handleAnswer}
              />
            )}
            {curQuestion.type === 'dropdown' && (
              <DropdownQuestion
                question={curQuestion.text}
                onAnswer={handleAnswer}
              />
            )}

            <button data-testid='next button' onClick={handleNext} disabled={curAnswer === ''}
              className="fixed botton-6 right-6 border-2 border-[#B69D74] bg-[#B69D74] text-[#1F2839] py-2 px-5 rounded-full hover:bg-transparent hover:text-[#D9D9D9] font-semibold">
              Next
            </button>
          </div>
        </div>
        <div data-testid={'progress bar'}>

        </div>
      </div>
    </div>
  )
}

export default Questions;