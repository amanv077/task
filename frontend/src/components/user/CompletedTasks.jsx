import React from "react";
import TaskCard from "./TaskCard";

const CompletedTasks = () => {
  const tasks = [
    {
      id: 3,
      title: "Write Documentation",
      status: "Completed",
      deadline: "2024-11-25",
    },
    {
      id: 4,
      title: "Team Meeting",
      status: "Completed",
      deadline: "2024-11-20",
    },
  ];

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default CompletedTasks;
