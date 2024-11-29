import PropTypes from "prop-types";
import { useState } from "react";

const TaskCard = ({ task, isLoading, handleTask }) => {
  const [buttonText, setButtonText] = useState("Mark Complete");

  // if (isLoading === task._id) buttonText = "Loading...";

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "High":
        return (
          <span className="text-xs font-medium text-white bg-red-600 rounded-full px-2 py-1">
            High
          </span>
        );
      case "Medium":
        return (
          <span className="text-xs font-medium text-white bg-orange-400 rounded-full px-2 py-1">
            Medium
          </span>
        );
      case "Low":
        return (
          <span className="text-xs font-medium text-white bg-green-500 rounded-full px-2 py-1">
            Low
          </span>
        );
      default:
        return (
          <span className="text-xs font-medium text-white bg-gray-400 rounded-full px-2 py-1">
            Unknown
          </span>
        );
    }
  };

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out p-3">
      <div className="relative mb-6">
        <button
          className="absolute top-0 left-0 text-xs bg-gray-100 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full px-2 py-1"
          onClick={() => handleTask("edit-task", task)}
        >
          Edit
        </button>
        <button
          className="absolute top-0 right-0 text-xs text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full px-2 py-1 ml-8"
          onClick={() => handleTask("delete-task", task)}
        >
          Delete
        </button>
      </div>
      <div className="text-sm mb-2">
        <h5 className="text-base font-medium text-gray-900 dark:text-white mb-1">
          {task.title}
        </h5>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          {task.description}
        </p>

        {/* Priority Badge */}
        <div className="mb-2">{getPriorityBadge(task.priority)}</div>

        {/* Assignees */}
        <div className="mb-1 text-xs text-gray-600 dark:text-gray-400">
          <span className="font-medium">Assigned to:</span>{" "}
          {task.assignees.join(", ")}
        </div>

        {/* Deadline */}
        <div className="mb-2 text-xs text-gray-600 dark:text-gray-400">
          <span className="font-medium">Deadline:</span>{" "}
          {new Date(task.deadline).toLocaleDateString()}
        </div>

        {/* Task Status and Action Button */}
        <button
          disabled={isLoading === task._id}
          onClick={() => handleTask("toggle-status", task)}
          className={`w-full text-xs font-medium py-1 px-3 rounded-lg transition-colors duration-200 ease-in-out focus:outline-none ${
            task.status === "Completed"
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-transparent border border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          {task.status === "Pending" ? "Mark Complete" : "Reopen"}
        </button>
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
