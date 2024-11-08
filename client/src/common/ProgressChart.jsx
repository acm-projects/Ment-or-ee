// ProgressChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import TaskStatus from './TaskStatus';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const ProgressChart = ({ currentTasks, pastTasks }) => {
  // Count tasks by status
  const statusCounts = {
    [TaskStatus.NOT_STARTED]: 0,
    [TaskStatus.IN_PROGRESS]: 0,
    [TaskStatus.COMPLETED]: 0,
  };
  
  [...currentTasks, ...pastTasks].forEach(task => {
    statusCounts[task.status]++;
  });

  const data = {
    labels: ['Not Started', 'In Progress', 'Completed'],
    datasets: [
      {
        data: [
          statusCounts[TaskStatus.NOT_STARTED],
          statusCounts[TaskStatus.IN_PROGRESS],
          statusCounts[TaskStatus.COMPLETED],
        ],
        backgroundColor: ['#FFFFFF', '#B89C75', '#1F2839'],
      },
    ],
  };

  return (
    <div className="w-80 h-80 mx-auto ">
      <Pie data={data} />
    </div>
  );
};

export default ProgressChart;
