import React from 'react'
import logo from '../../assets/logo.svg'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  
  const navigate = useNavigate();
    
      const handleHomeClick = () => {
        navigate('/');
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
          
          <div class='mt-12'>
            {/* <label for='email'>Email</label> */}
            <input type='email' id='email' class= 'w-[407px] border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 rounded-full' placeholder="Email"/>
          </div>

          <div class='mt-4'>
            {/* <label for='password'>Passowrd</label> */}
            <input type='password' id='password' class= 'w-[407px] border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 rounded-full' placeholder="Password"/>
          </div>

          <div className="flex justify-between m-3">
              <button className="border-none bg-none text-center hover:underline" onClick={() => navigate('/signup')}>Create an account</button>
          </div>

          <div class='mt-5'>
            <button type="submit" className='border-2 border-[#1F2839] bg-[#1F2839] text-white py-1 px-5 rounded-md hover:bg-transparent hover:text-[#1F2839] font-semibold' onClick={() => navigate('/menteehome')}>Login</button>
          </div>
          

        </div>
      </div>

      <div className='w-1/2 bg-[#1F3839]'>

      </div>
    </div>
      
  )
}

export default Login;
