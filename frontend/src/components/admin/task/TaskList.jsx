import TaskCard from "./TaskCard";

const TaskList = ({ tasks = [], isLoading, handleTask }) => {
  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="flex flex-wrap gap-5">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          isLoading={isLoading}
          handleTask={handleTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
