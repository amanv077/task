import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const TaskCard = ({ task, isLoading, handleTask }) => {
  const [buttonText, setButtonText] = useState("Mark Complete");
  const navigate = useNavigate();

  // Get Priority Badge
  const getPriorityBadge = (priority) => {
    const priorityStyles = {
      High: "bg-red-600",
      Medium: "bg-orange-400",
      Low: "bg-green-500",
      Unknown: "bg-gray-400",
    };
    return (
      <span
        className={`text-xs font-medium text-white rounded-full px-2 py-1 ${
          priorityStyles[priority] || priorityStyles.Unknown
        }`}
      >
        {priority}
      </span>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-4 space-y-4 overflow-hidden max-w-60">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h5 className="text-base font-semibold text-gray-900 dark:text-white truncate">
          {task.title}
        </h5>
        {getPriorityBadge(task.priority)}
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 truncate overflow-hidden">
        {task.description}
      </p>

      {/* Additional Info */}
      <div className="text-xs space-y-1">
        <p className="text-gray-500 dark:text-gray-400">
          <span className="font-medium">Assigned to:</span>{" "}
          {task.assignees.join(", ")}
        </p>
        <p className="text-gray-500 dark:text-gray-400">
          <span className="font-medium">Deadline:</span>{" "}
          {new Date(task.deadline).toLocaleDateString()}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <button
          className="text-sm text-blue-600 hover:text-blue-800 underline focus:outline-none"
          onClick={() => navigate(`/task/${task._id}`)}
        >
          Details
        </button>
        <div className="flex space-x-2">
          <button
            onClick={() => handleTask("edit-task", task)}
            className="text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-1 rounded focus:outline-none"
          >
            Edit
          </button>
          <button
            onClick={() => handleTask("delete-task", task)}
            className="text-xs text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-1 rounded focus:outline-none"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Status Action */}
      <button
        disabled={isLoading === task._id}
        onClick={() => handleTask("toggle-status", task)}
        className={`w-full text-xs font-medium py-2 rounded-lg transition-all focus:outline-none ${
          task.status === "Completed"
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
        }`}
      >
        {task.status === "Pending" ? "Mark Complete" : "Reopen"}
      </button>
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
