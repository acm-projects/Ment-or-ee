import React from 'react'
import logo from '../../assets/logo.svg'
import image1 from '../../assets/landingimage1.svg'
import bgimage from '../../assets/landingbgimage.svg'
import neeti_pfp from '../../assets/neeti_pfp.svg'
import lerich_pfp from '../../assets/lerich_pfp.svg'

  export const Landnavbar = () => {

    return (
      <header className="relative w-full h-screen bg-cover bg-center z-negative" style={{ backgroundImage: `url(${bgimage})`, backgroundPosition: 'center 0px', }}>
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
        <button className="px-4 py-2 text-white bg-[#1F2839] rounded-full">
          Login
        </button>
        <button className="px-4 py-2 text-gray-900 bg-white border border-gray-900 rounded-full">
          Signup
        </button>
      </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-lg p-4 h-[430px] w-[665px] mx-auto my-8">
            <h1 className="text-white text-4xl font-bold">Welcome!</h1>
            <p className='text-xl text-white font-semibold'>Learn and Grow, Seamlessly!</p>
        </div>
        {/* <div className="relative z-10 p-4">
            <h1>!</h1>
            <p>Additional content that will scroll over the background image.</p>
        </div> */}

      </nav>
      </header>
    )
  }

  export const Landing = () => {
    return (
      <div></div>
    );
  };

  export const About = () => {
    return (
      <div>
        <div className='w-full bg-[#D6C7B1]  py-24'>
        <div className='max-w-[1000px] m-auto grid grid-cols-2'>
        <img src={image1} />
          <div className='flex flex-col justify-start gap-4'>
            <h1 className='py-4 md:text-5xl text-5xl font-semibold p-4 text-white bg-[#1F2839] rounded-3xl text-center mx-auto w-max'>About Us</h1>
            <p className='p-4 text-2xl text-[#1F2839]'>Make an account to find a mentor or mentee today!</p>
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
            <img src={neeti_pfp } className="mb-4"/>
            <p className='p-4 text-2xl text-[#1F2839]'>I learned so much from my mentor! - Mentee 2024</p>
          </div>
           
          <div className="flex flex-col items-center">
            <img src={lerich_pfp} className="mb-4"/>
            <p className='p-4 text-2xl text-[#1F2839]'>I feel so fulfilled giving advice to my mentee! - Mentor 2023</p>
          </div>

        </div>
       </div>
      </div>
    );
  };

  

  //export default landing
