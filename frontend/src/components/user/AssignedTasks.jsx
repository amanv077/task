import React from "react";
import TaskCard from "./TaskCard";

const AssignedTasks = () => {
  const tasks = [
    {
      id: 1,
      title: "Develop User API",
      status: "In Progress",
      deadline: "2024-11-30",
    },
    { id: 2, title: "Fix UI Bugs", status: "Pending", deadline: "2024-12-01" },
  ];

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default AssignedTasks;
