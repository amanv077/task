import React from "react";

const TaskCard = ({ task }) => {
  return (
    <div className="p-4 border rounded-lg shadow-sm hover:shadow-lg transition duration-300">
      <h3 className="text-lg font-bold">{task.title}</h3>
      <p>Status: {task.status}</p>
      <p>Deadline: {task.deadline}</p>
    </div>
  );
};

export default TaskCard;
