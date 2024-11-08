// TaskItem.js
import React from 'react';
import TaskStatus from './TaskStatus';

const TaskItem = ({ type, description, dueDate, mentor, status, onStatusChange }) => {
  const handleClick = () => {
    onStatusChange(status); // Pass the current status when clicked
  };

  const getStatusColor = () => {
    switch (status) {
      case TaskStatus.COMPLETED:
        return 'bg-[#1F2839]'; // Completed color
      case TaskStatus.IN_PROGRESS:
        return 'bg-[#B89C75]'; // In-progress color (beige)
      default:
        return 'bg-white'; // Not started color
    }
  };

  return (
    <div className="flex items-center justify-between p-2 border-b last:border-none">
      <div
        className={`w-6 h-6 rounded-full border cursor-pointer ${getStatusColor()}`}
        onClick={handleClick}
      ></div>
      <span className="text-sm font-medium">{type}</span>
      <span className="text-sm text-blue-600 underline cursor-pointer">{description}</span>
      <span className="text-sm">{dueDate}</span>
      <span className="text-sm">{mentor}</span>
    </div>
  );
};

export default TaskItem;