import TaskCard from "./TaskCard";

const CompletedTasks = () => {
  // Replace this with API data
  const tasks = [
    { id: 3, title: "Launch Marketing Campaign", status: "Completed" },
    { id: 4, title: "Optimize Backend API", status: "Completed" },
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
