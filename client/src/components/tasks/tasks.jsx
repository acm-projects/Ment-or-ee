// Tasks.js
import React, { useState } from 'react';
import Navbar from '../../common/navbar';
import LeftBox from '../../common/LeftBox';
import TaskItem from '../../common/TaskItem';
import TaskStatus from '../../common/TaskStatus';
import ProgressChart from '../../common/ProgressChart'; 

const Tasks = () => {
  // State for current and past tasks
  const [currentTasks, setCurrentTasks] = useState([
    { id: 1, type: 'LC Problem', description: 'Problem 50', dueDate: '09/16/24', mentor: 'Lerich Osay', status: TaskStatus.NOT_STARTED },
    { id: 2, type: 'Interview Prep', description: 'Watch this video', dueDate: '09/20/24', mentor: 'Jeshna Gupta', status: TaskStatus.NOT_STARTED },
    { id: 3, type: 'Resume', description: 'Update resume to include summer project', dueDate: '09/21/24', mentor: 'Lerich Osay', status: TaskStatus.NOT_STARTED },
  ]);

  const [pastTasks, setPastTasks] = useState([
    { id: 4, type: 'Project', description: 'Finish project', dueDate: '07/31/24', mentor: 'Abis Naqvi', status: TaskStatus.COMPLETED }
  ]);

  const resources = [
    { mentor: 'Lerich Osay', link: 'https://leetcode.com/', description: 'LeetCode - Coding Challenges' },
    { mentor: 'Jeshna Gupta', link: 'https://www.codecademy.com/', description: 'Codecademy - Learn to Code' },
    { mentor: 'Abis Naqvi', link: 'https://www.khanacademy.org/', description: 'Khan Academy - Learning Resources' },
    // Add more resources as needed
  ];

  // Function to update task status and move completed tasks to the past
  const handleStatusChange = (taskId, currentStatus, isInPastTasks) => {
    const newStatus =
      currentStatus === TaskStatus.NOT_STARTED
        ? TaskStatus.IN_PROGRESS
        : currentStatus === TaskStatus.IN_PROGRESS
        ? TaskStatus.COMPLETED
        : TaskStatus.NOT_STARTED;

    if (isInPastTasks) {
      if (newStatus !== TaskStatus.COMPLETED) {
        // Move the task back to currentTasks if it's not completed
        const taskToMove = pastTasks.find((task) => task.id === taskId);
        setPastTasks((prevPastTasks) => prevPastTasks.filter((task) => task.id !== taskId));
        setCurrentTasks((prevCurrentTasks) => [
          ...prevCurrentTasks,
          { ...taskToMove, status: newStatus },
        ]);
      } else {
        // Update status in place in pastTasks
        setPastTasks((prevPastTasks) =>
          prevPastTasks.map((task) =>
            task.id === taskId ? { ...task, status: newStatus } : task
          )
        );
      }
    } else {
      if (newStatus === TaskStatus.COMPLETED) {
        // Move task to pastTasks if it's marked as completed
        const taskToMove = currentTasks.find((task) => task.id === taskId);
        setCurrentTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        setPastTasks((prevPastTasks) => [...prevPastTasks, { ...taskToMove, status: newStatus }]);
      } else {
        // Update status in place in currentTasks
        setCurrentTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId ? { ...task, status: newStatus } : task
          )
        );
      }
    }
  };

  return (
    <div className="flex flex-col">
      <Navbar />

      <div className="mt-[80px]">
        <div className="flex flex-row space-x-6 p-12 px-4">
          
          {/* LeftBox component with ProgressChart */}
          <div className="flex-none w-1/4 bg-gray-100 rounded-lg shadow-lg p-4">
            <LeftBox title="Profile" name="Neeti" role="Mentee" />
            <ProgressChart currentTasks={currentTasks} pastTasks={pastTasks} /> 
          </div>
          
          {/* Main task section */}
          <div className="flex-1 bg-gray-100 rounded-lg shadow-lg p-4">
            <h1 className="text-3xl font-semibold text-center mb-4 text-[#000000]">Task List</h1>
            
            {/* Current Tasks */}
            <div className="mt-4">
              <h2 className="text-xl font-semibold text-center mb-2">Current Tasks</h2>
              <div className="bg-gray-200 rounded-lg p-2 mb-4">
                <div className="flex justify-around text-lg font-medium">
                  <span>Type</span>
                  <span>Description</span>
                  <span>Due Date</span>
                  <span>Mentor</span>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4">
                {currentTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    type={task.type}
                    description={task.description}
                    dueDate={task.dueDate}
                    mentor={task.mentor}
                    status={task.status}
                    onStatusChange={(newStatus) => handleStatusChange(task.id, newStatus)}
                  />
                ))}
              </div>
            </div>

            {/* Past Tasks */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-center mb-2">Past Tasks</h2>
              <div className="bg-gray-200 rounded-lg p-2 mb-4">
                <div className="flex justify-around text-lg font-medium">
                  <span>Type</span>
                  <span>Description</span>
                  <span>Due Date</span>
                  <span>Mentor</span>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4">
                {pastTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    type={task.type}
                    description={task.description}
                    dueDate={task.dueDate}
                    mentor={task.mentor}
                    status={task.status}
                    onStatusChange={(newStatus) => handleStatusChange(task.id, newStatus, true)} // Pass true for past tasks
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Extra Resources Section */}
          <div className="flex-none w-1/4 bg-gray-100 rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-semibold text-center mb-4">Extra Resources</h2>
            {/* Populate with recommended resources */}
            <ul className="bg-white rounded-lg shadow-md p-4">
              {resources.map((resource, index) => (
                <li key={index} className="py-1">
                  {resource.mentor}: 
                  <a href={resource.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline ml-1">{resource.description}</a>
                </li>
              ))}
            </ul>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Tasks;
