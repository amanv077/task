import PropTypes from "prop-types";
import { useState } from "react";

const TaskCard = ({ task, isLoading, handleTask }) => {
  const [buttonText, setButtonText] = useState("Mark Complete");

  if (isLoading === task._id) buttonText = "Loading...";

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "High":
        return (
          <span className="px-2 py-1 text-sm font-medium text-white bg-red-600 rounded-full">
            High
          </span>
        );
      case "Medium":
        return (
          <span className="px-2 py-1 text-sm font-medium text-white bg-orange-400 rounded-full">
            Medium
          </span>
        );
      case "Low":
        return (
          <span className="px-2 py-1 text-sm font-medium text-white bg-green-500 rounded-full">
            Low
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 text-sm font-medium text-white bg-gray-400 rounded-full">
            Unknown
          </span>
        );
    }
  };

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="relative flex justify-end px-4 pt-4">
        <button
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          onClick={() => handleTask("edit-task", task)}
        >
          Edit
        </button>
        <button
          className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          onClick={() => handleTask("delete-task", task)}
        >
          Delete
        </button>
      </div>
      <div className="flex flex-col items-center pb-10 px-6">
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {task.title}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {task.description}
        </span>

        {/* Priority Badge */}
        <div className="mt-2">{getPriorityBadge(task.priority)}</div>

        {/* Assignees */}
        <div className="mt-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Assigned to:{" "}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {task.assignees.join(", ")}
          </span>
        </div>

        {/* Deadline */}
        <div className="mt-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Deadline:{" "}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(task.deadline).toLocaleDateString()}
          </span>
        </div>

        {/* Task Status and Action Button */}
        <div className="flex mt-4 md:mt-6">
          <button
            disabled={isLoading === task._id}
            onClick={() => handleTask("toggle-status", task)}
            className={
              task.status === "Completed"
                ? "inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                : "py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            }
          >
            {task.status === "Pending" ? "Mark Complete" : "Completed"}
          </button>
        </div>
      </div>
    </div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    assignees: PropTypes.arrayOf(PropTypes.string).isRequired,
    deadline: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  isLoading: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  handleTask: PropTypes.func.isRequired,
};

export default TaskCard;
