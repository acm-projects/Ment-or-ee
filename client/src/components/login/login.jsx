import React, { useEffect, useState } from 'react'
import logo from '../../assets/logo.svg'
import { useNavigate, useHistory } from 'react-router-dom';
import axios from "axios"
import { useAuth } from '../../context/AuthContext'

const Login = () => {
  
  const navigate = useNavigate();
  // const history = useHistory();
    
  const handleHomeClick = () => {
    navigate('/');
  };

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const { login } = useAuth();

  const handleSubmit =  async (e) => {
    e.preventDefault();

    setError('');

    const success = await login(email, password);
    if (success) {
      navigate("/menteehome")
      // navigate("/menteehome",{state:{id:email}}) //check if mentee or mentor; consider history
      // history.push("/menteehome")
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className='w-screen h-screen flex'>
      <div className='w-1/2 bg-[#F5F5EF]'>
        <button onClick={handleHomeClick} className="flex items-center px-6 py-4">
          
          <img
            src = {logo}
            alt="mentor/ee logo"
            className="h-16 w-auto mr-2"
          />
          <span className="text-4xl font-bold text-gray-800">mentor/ee</span>
        </button>

        <div className='flex flex-col items-center justify-center'>
          <h1 class='mt-12 text-5xl block text-center font-semibold'>Welcome Back!</h1>
          
          <form action="POST" >
            <div class='mt-12'>
              <label font-bold mb-2 block for='email'>Email</label>
              <input type='email' onChange={(e)=>{setEmail(e.target.value)}} id='email' class= 'w-[450px] h-[50px] border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 rounded-3xl' placeholder="Email"/>
            </div>
            <div class="mt-4">
              <label for='password'>Password</label>
              <input type='password' onChange={(e)=>{setPassword(e.target.value)}} id='password' class= 'w-[450px] h-[50px] border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 rounded-3xl' placeholder="Password"/>
            </div>
            <div class='flex items-center jusitfy-between mt-10'>
              <button type="submit" className='border-2 border-[#1F2839] w-[250px] h-[50px] bg-[#1F2839] text-2xl text-white py-1 px-5 rounded-3xl hover:bg-transparent hover:text-[#1F2839] font-semibold' onClick={handleSubmit}>Login</button>
            </div>
            <div className="flex justify-between m-3">
              <button className="border-none bg-none text-center hover:underline" onClick={() => navigate('/signup')}>Don't have an account?</button>
            </div>
          </form>
        </div>
      </div>

      <div className='w-1/2 bg-[#1F3839]'>

      </div>
    </div>
      
  )
}

export default Login;
