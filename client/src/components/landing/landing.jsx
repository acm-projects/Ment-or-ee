import React from 'react'
import logo from '../../assets/logo.svg'
import image1 from '../../assets/landingimage1.svg'
import bgimage from '../../assets/landingbgimage.svg'
import neeti_pfp from '../../assets/neeti_pfp.svg'
import lerich_pfp from '../../assets/lerich_pfp.svg'
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
  

  export const Landnavbar = () => {
      const navigate = useNavigate();
    
      const handleLoginClick = () => {
        navigate('/login');
      };

      const handleSignupClick = () => {
        navigate('/signup');
      };
    
    return (
      <header className="fixed inset-0 relative w-full h-screen bg-fixed bg-cover bg-center z-negative h-[1100px]" style={{ backgroundImage: `url(${bgimage})`, backgroundPosition: 'center 0px', }}>
      <nav className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center">
        <img
          src = {logo}
          alt="mentor/ee logo"
          className="h-16 w-auto mr-2"
        />
        <span className="text-4xl font-bold text-gray-800">mentor/ee</span>
      </div>
      <div className="flex space-x-4">
        <button onClick={handleLoginClick} className="px-6 py-3 text-lg font-semibold text-white bg-[#1F3839] rounded-full hover:bg-[#1A202C] focus:outline-none focus:ring-2 focus:ring-[#1F2839]">
            Login
        </button>
        <button onClick={handleSignupClick} className="px-6 py-3 text-lg font-semibold text-gray-900 bg-white border border-gray-900 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300">
            Signup
        </button>
        </div>
        <div className="absolute inset-0 top-1/4 left-1/2 transform -translate-x-1/2 translate-y-10 flex flex-col items-center justify-center bg-white bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-3xl p-4 h-[430px] w-[665px] mx-auto my-8">
            <h1 className="text-white text-6xl font-bold py-2 mb-8">Welcome!</h1>
            <p className='text-4xl text-white font-semibold'>Learn and Grow, Seamlessly!</p>
        </div>
        {/* <div className="relative z-10 p-4">
            <h1>!</h1>
            <p>Additional content that will scroll over the background image.</p>
        </div> */}
      </nav>
      </header>
    )
  }
  export const About = () => {
    return (
        <div>
            <div className='w-full bg-[#D6C7B1] py-24'>
                <div className='max-w-[1000px] m-auto grid grid-cols-2'>
                <img src={image1} alt="about page pic" className='w-full h-auto object-cover' />
                <div className='flex flex-col justify-start gap-4 items-end'>
                    <h1 className='py-4 md:text-5xl text-5xl font-semibold p-4 text-white bg-[#1F2839] rounded-3xl text-center w-max'>
                    About Us
                    </h1>
                    <p className='p-4 text-4xl text-[#1F2839] text-right text-balance'>
                    Make an account to find a mentor or mentee today!
                    </p>
                </div>
                </div>
            </div>
            </div>
    )
  }
  export const Testimonials = () => {
    return (
      <div>
        <div className='w-full bg-[#F5F5EF]  py-24'>
         <div className='max-w-[1000px] m-auto grid grid-cols-3'>
           <div className='flex flex-col justify-start gap-4'>
             <h1 className='py-4 md:text-5xl text-5xl font-semibold p-4 text-white bg-[#1F2839] rounded-3xl text center mx-auto w-max'>Testimonials</h1>
           </div>
          <div className="flex flex-col items-center">
            <img src={neeti_pfp } alt="neeti pfp" className="mb-4"/>
            <p className='p-4 text-2xl text-[#1F2839] text-balance'>I learned so much from my mentor! - Mentee 2024</p>
          </div>
          <div className="flex flex-col items-center">
            <img src={lerich_pfp} alt="lerich pfp" className="mb-4"/>
            <p className='p-4 text-2xl text-[#1F2839] text-balance'>I feel so fulfilled giving advice to my mentee! - Mentor 2023</p>
          </div>
        </div>
       </div>
      </div>
    );
  };
  export const Contact = () => {
    return (
      <div>
        <div className='w-full bg-[#D6C7B1]  py-12 h-[350px]'>
         <div className='max-w-[1000px] m-auto grid grid-cols-3'>
         <div className="flex flex-col items-left">
            <p className='p-2 text-4xl text-[#1F2839] font-semibold'>Our Team</p>
            <p className='p-2 text-2xl text-[#1F2839] text-opacity-55'>Lerich Osay</p>
            <p className='p-2 text-2xl text-[#1F2839] text-opacity-55'>Neeti Ingle</p>
            <p className='p-2 text-2xl text-[#1F2839] text-opacity-55'>Mia Sorola Yoshida</p>
            <p className='p-2 text-2xl text-[#1F2839] text-opacity-55'>Ali Arkate</p>
            <p className='p-2 text-2xl text-[#1F2839] text-opacity-55'>Chris Abraham</p>
          </div>
          <div className="flex flex-col items-left">
          <p className='p-4 text-4xl text-[#1F2839] font-semibold'>Directories</p>
            <p className='p-4 text-2xl text-[#1F2839] text-opacity-55'>Login</p>
            <p className='p-4 text-2xl text-[#1F2839] text-opacity-55'>Signup</p>
            <p className='p-4 text-2xl text-[#1F2839] text-opacity-55'>About Us</p>
          </div>
          <div className="flex flex-col items-left">
            <div className="flex items-center">
              <img
                src = {logo}
                alt="mentor/ee logo"
                className="h-16 w-auto mr-2"
              />
              <span className="text-4xl font-bold text-gray-800">mentor/ee</span>
            </div>
            <div className="flex items-center">
              <button>
                <IoCallOutline
                    size={30}
                    className="callicon"
                    style={{color:'#000'}}
                />
              </button>
              <p className='p-4 text-2xl text-[#1F2839] text-opacity-55'>123-456-7890</p>
            </div>
            <div className="flex items-center">
              <button>
                <MdOutlineEmail
                    size={30}
                    className="emailicon"
                    style={{color:'#000'}}
                />
              </button>
              <p className='p-4 text-2xl text-[#1F2839] text-opacity-55'>mentoree@gmail.com</p>
            </div>
          </div>
        </div>
       </div>
      </div>
    );
  };
  //export default landing