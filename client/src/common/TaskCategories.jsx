// TaskCategories.js
import React from 'react';

const TaskCategories = ({ tasks }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-center mb-2">Task Categories</h2>
      <div className="bg-white rounded-lg shadow-md p-4">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Due Date</th>
              <th className="px-4 py-2">Mentor</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td className="border px-4 py-2">{task.type}</td>
                <td className="border px-4 py-2">{task.description}</td>
                <td className="border px-4 py-2">{task.dueDate}</td>
                <td className="border px-4 py-2">{task.mentor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskCategories;