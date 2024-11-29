import { TASK_API_END_POINT, USER_API_END_POINT } from "@/utils/constant"; // Adjust path if necessary
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
  const [teamMembers, setTeamMembers] = useState([]); // State for fetched team members
  const [loading, setLoading] = useState(false); // State for loading indication

  const priorities = [
    { label: "High", value: "High", color: "bg-red-500 text-white" },
    { label: "Medium", value: "Medium", color: "bg-orange-400 text-white" },
    { label: "Low", value: "Low", color: "bg-green-500 text-white" },
  ];

  // Fetch team members from the backend
  useEffect(() => {
    const fetchTeamMembers = async () => {
      setLoading(true);
      try {
        const response = await fetch(USER_API_END_POINT);
        const data = await response.json();

        if (data.success) {
          // Filter users by role
          const users = data.users.filter((user) => user.role === "user");
          setTeamMembers(users.map((user) => user.fullname)); // Assuming the API returns 'name' field for each user
        } else {
          console.error("Error fetching users:", data.message);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleAssigneesChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setTask({ ...task, assignees: selectedOptions });
  };

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
      className="space-y-6 bg-white p-8 rounded-lg shadow-xl max-w-2xl mx-auto"
    >
      {/* Task Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Task Title
        </label>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          placeholder="Enter task title"
          className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Task Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Describe the task"
          className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          required
        ></textarea>
      </div>

      {/* Assignees */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Assign to Team Members
        </label>
        {loading ? (
          <div className="text-center text-gray-500">
            Loading team members...
          </div>
        ) : (
          <select
            multiple
            name="assignees"
            value={task.assignees}
            onChange={handleAssigneesChange}
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            {teamMembers.map((member) => (
              <option key={member} value={member}>
                {member}
              </option>
            ))}
          </select>
        )}
        <p className="text-xs text-gray-500 mt-1">
          Hold Ctrl (Windows) or Command (Mac) to select multiple.
        </p>
      </div>

      {/* Priority */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Priority
        </label>
        <select
          name="priority"
          value={task.priority}
          onChange={handleChange}
          className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          {priorities.map((priority) => (
            <option key={priority.value} value={priority.value}>
              {priority.label}
            </option>
          ))}
        </select>
      </div>

      {/* Deadline */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Deadline
        </label>
        <input
          type="date"
          name="deadline"
          value={task.deadline}
          onChange={handleChange}
          className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out"
      >
        {defaultTask ? "Edit" : "Create"} Task
      </button>
    </form>
  );
};

export default CreateTask;
