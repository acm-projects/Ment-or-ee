import React from 'react';
import Navbar from '../navbar';

const tasks = () => {
  return (
    <div className="flex flex-col space-y-20">
      <Navbar />
      <div>
        Tasks
      </div>
    </div>
  )
}


export default tasks;