import React, { useState } from 'react'
import logo from '../../assets/logo.svg'
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { useAuth } from '../../context/AuthContext'

const Signup = () => {
  const [email, setEmail]=useState('')
  const [password, setPassword]=useState('')
  const [error, setError]=useState('')


  const navigate = useNavigate();
  const { login } = useAuth();
    
  const handleHomeClick = () => {
    navigate('/');
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }

      const data = await response.json();
      await login(email, password); //password not returned?
      navigate('/questions')
    } catch (error) {
      setError(error.message);
    }


  }
  


  return (
    <div className='w-screen h-screen flex'>
      <div className='w-1/2 bg-[#1F3839]'>
        <button onClick={handleHomeClick} className="flex items-center px-6 py-4">
          <img
            src = {logo}
            alt="mentor/ee logo"
            className="h-16 w-auto mr-2"
          />
          <span className="text-4xl font-bold text-[#F5F5EF]">mentor/ee</span>
        </button>
      </div>

      <div className='w-1/2 bg-[#F5F5EF]'>
      <div className='flex flex-col items-center justify-center'>
        <h1 class='mt-12 text-5xl block text-center font-semibold'>Welcome to Mentor/ee!</h1>
          
          <form action="POST" className="w-64 flex flex-col justify-center" >
            <div class='mt-12'>
              <label font-bold mb-2 block for='email'>Email</label>
              <input type='email' onChange={(e)=>{setEmail(e.target.value)}} id='email' class= 'w-[407px] border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 rounded-full' placeholder="Email"/>
            </div>
            <div class="mt-4">
              <label for='password'>Password</label>
              <input type='password' onChange={(e)=>{setPassword(e.target.value)}} id='password' class= 'w-[407px] border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 rounded-full' placeholder="Password"/>
            </div>
            <div class='mt-5'>
            <button type="submit" className='border-2 border-[#1F2839] bg-[#1F2839] text-white py-1 px-5 rounded-md hover:bg-transparent hover:text-[#1F2839] font-semibold' onClick={handleSubmit}>Sign Up</button>
            </div>
            <div className="flex w-full justify-between m-3">
                <button className="border-none bg-none text-center hover:underline" onClick={() => navigate('/login')}>Already have an account?</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}



export default Signup;






  

  