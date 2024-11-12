import React from 'react';
import TaskStatus from './TaskStatus';

const TaskItem = ({ type, description, dueDate, mentor, status, onStatusChange, taskId }) => {
    const handleClick = () => {
        onStatusChange(taskId); // Pass taskId to onStatusChange when clicked
    };

    const getStatusColor = () => {
        return status === TaskStatus.COMPLETE ? 'bg-[#1F2839]' : 'bg-white'; // Filled if complete
    };

    return (
        <div className="flex items-center justify-between p-4 border-b last:border-none space-x-4">
            {/* Status indicator */}
            <div className={`w-6 h-6 rounded-full border cursor-pointer ${getStatusColor()}`} onClick={handleClick}></div>
            
            {/* Task Type */}
            <span className="text-sm font-medium text-gray-700">{type}</span>
            
            {/* Task Description */}
            <span className="text-sm text-blue-600 underline cursor-pointer">{description}</span>
            
            {/* Due Date */}
            <span className="text-sm text-gray-500">{dueDate}</span>
            
            {/* Mentor */}
            <span className="text-sm text-gray-600">{mentor}</span>
        </div>
    );
};

export default TaskItem;
