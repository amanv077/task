import React from "react";
import TaskCard from "./TaskCard";

const TodayDeadlines = () => {
  const todayTasks = [
    {
      id: 5,
      title: "Deploy App",
      status: "In Progress",
      deadline: "2024-11-28",
    },
  ];

  return (
    <div className="space-y-4">
      {todayTasks.length ? (
        todayTasks.map((task) => <TaskCard key={task.id} task={task} />)
      ) : (
        <p>No deadlines for today!</p>
      )}
    </div>
  );
};

export default TodayDeadlines;
