import React from 'react'

function profileBox({ user }) {
  return (
    <div data-testid={'profile'}>
        <div data-testid={'header'}>
            <div data-testid={'personalinfo'}>
                <h1 className="text-xl text-black font-semibold mb-2">
                    Hi {user.name}! 
                </h1> 
                {/* add profile pic */}
                <h2>
                    {user.mentoree} 
                    {/* Mentee or Mentor */}
                </h2>
                <h3>
                    Location: {user.location}
                </h3>
                <h3>
                    Career Field: {user.career}
                </h3>
                <h3>
                    Personality Type: {user.personality}
                </h3>
            </div>
            <div data-testid={'history'}>
                <h3>
                    {/* Current (prop) : (prop)   current mentees or mentors*/}
                </h3>
            </div>

        </div>
      
    </div>
  )
}

export default profileBox;
