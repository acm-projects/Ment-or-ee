import React from 'react'

function profileBox({ user }) {
  return (
    <div data-testid={'profile'}>
        <div data-testid={'header'} className='px-4 py-2'></div> 
        <div data-testid={'personalinfo'}>
            <h1 className="text-2xl text-black font-semibold mb-2 text-center">
                Hi {user.name}! 
            </h1> 
            {/* add profile pic */}
            <h2 className="text-center text-xl">
                {user.mentoree} 
                {/* Mentee or Mentor */}
            </h2>
            <h3 className="text-lg">
                Location: {user.location}
            </h3>
            <h3 className="text-lg">
                Career Field: {user.career}
            </h3>
            <h3 className="text-lg">
                Personality Type: {user.personality}
            </h3>
        </div>
        <div data-testid={'history'}>
            <h3>
                {/* Current (prop) : (prop)   current mentees or mentors*/}
            </h3>
        </div>

    </div>
      
  )
}

export default profileBox;
