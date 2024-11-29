import { TASK_API_END_POINT } from "@/utils/constant"; // Adjust path if necessary
import { useEffect, useState } from "react";

const emptyTaskData = {
  title: "",
  description: "",
  assignees: [],
  deadline: "",
  priority: "Medium", // Default priority
};

function formatDateForInput(dateString) {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
}

const CreateTask = ({ defaultTask, handleTask, handlerShowTaskList }) => {
  const [task, setTask] = useState(defaultTask || emptyTaskData);

  const teamMembers = ["Alice", "Bob", "Charlie", "Diana"]; // Example team members
  const priorities = [
    { label: "High", value: "High", color: "bg-red-500 text-white" },
    { label: "Medium", value: "Medium", color: "bg-orange-400 text-white" },
    { label: "Low", value: "Low", color: "bg-green-500 text-white" },
  ];

  // Handle input field changes
  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  // Handle assignees multi-select change
  const handleAssigneesChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setTask({ ...task, assignees: selectedOptions });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (defaultTask) {
      handleTask("update-task", { ...defaultTask, ...task });
    }
    try {
      const response = await fetch(TASK_API_END_POINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      const data = await response.json();
      if (data.success) {
        console.log("Task Created:", data.task);
        setTask(emptyTaskData);
        handlerShowTaskList();
        // Handle successful task creation (e.g., clear form, display message)
      } else {
        console.error("Error creating task:", data.message);
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  useEffect(() => {
    const _task = { ...emptyTaskData, ...(defaultTask || {}) };
    if (_task.deadline) {
      _task.deadline = formatDateForInput(_task.deadline);
    }
    setTask(_task);
  }, [defaultTask]);

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg shadow-md"
    >
      {/* <h2 className="text-2xl font-bold text-gray-800">
        {defaultTask ? "Edit Task" : "Create New Task"}
      </h2> */}

      {/* Task Title */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Task Title
        </label>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          placeholder="Enter task title"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Task Description */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Describe the task"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          required
        ></textarea>
      </div>

      {/* Assignees */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Assign to Team Members
        </label>
        <select
          multiple
          name="assignees"
          value={task.assignees}
          required
          onChange={handleAssigneesChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {teamMembers.map((member) => (
            <option key={member} value={member}>
              {member}
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">
          Hold Ctrl (Windows) or Command (Mac) to select multiple.
        </p>
      </div>

      {/* Priority */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Priority
        </label>
        <select
          name="priority"
          value={task.priority}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {priorities.map((priority) => (
            <option
              key={priority.value}
              value={priority.value}
              className={priority.color}
            >
              {priority.label}
            </option>
          ))}
        </select>
      </div>

      {/* Deadline */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Deadline
        </label>
        <input
          type="date"
          name="deadline"
          value={task.deadline}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {defaultTask ? "Edit" : "Create"} Task
      </button>
    </form>
  );
};

export default CreateTask;
