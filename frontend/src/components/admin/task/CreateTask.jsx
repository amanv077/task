import { TASK_API_END_POINT, USER_API_END_POINT } from "@/utils/constant";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const emptyTaskData = {
  title: "",
  description: "",
  assignees: [],
  deadline: "",
  priority: "Medium",
};

function formatDateForInput(dateString) {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
}

const CreateTask = ({ defaultTask, handleTask, handlerShowTaskList }) => {
  const navigate = useNavigate();
  const userRole = useSelector((state) => state.auth.user?.role);
  const [task, setTask] = useState(defaultTask || emptyTaskData);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  const priorities = [
    { label: "High", value: "High", color: "bg-red-500 text-white" },
    { label: "Medium", value: "Medium", color: "bg-yellow-400 text-white" },
    { label: "Low", value: "Low", color: "bg-green-500 text-white" },
  ];

  // Fetch team members
  useEffect(() => {
    const fetchTeamMembers = async () => {
      setLoading(true);
      try {
        const response = await fetch(USER_API_END_POINT);
        const data = await response.json();
        if (data.success) {
          const users = data.users.filter((user) => user.role === "user");
          setTeamMembers(users.map((user) => user.fullname));
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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (defaultTask) {
  //     return handleTask("update-task", { ...defaultTask, ...task });
  //   }

  //   try {
  //     const response = await fetch(TASK_API_END_POINT, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //       body: JSON.stringify(task),
  //     });
  //     const data = await response.json();
  //     if (data.success) {
  //       setTask(emptyTaskData);
  //       handlerShowTaskList();
  //     } else {
  //       console.error("Error creating task:", data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error creating task:", error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (defaultTask) {
      return handleTask("update-task", { ...defaultTask, ...task });
    }

    try {
      const response = await fetch(TASK_API_END_POINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(task),
      });
      const data = await response.json();
      if (data.success) {
        setTask(emptyTaskData);
        // Redirect based on the user's role
        if (userRole === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/user-dashboard");
        }
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

  // Handle navigation based on role
  const handleBack = () => {
    const route = userRole === "admin" ? "/admin-dashboard" : "/user-dashboard";
    navigate(route);
  };

  return (
    <div className="max-w-3xl mx-auto ">
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={handleBack}
          className="flex items-center px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-100 rounded-lg shadow hover:bg-blue-200 dark:bg-blue-700 dark:text-blue-100 dark:hover:bg-blue-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>
      </div>

      {/* Task Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          {defaultTask ? "Edit Task" : "Create Task"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
              Task Title
            </label>
            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              placeholder="Enter task title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
              Deadline
            </label>
            <input
              type="date"
              name="deadline"
              value={task.deadline}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
              placeholder="Describe the task"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              rows="4"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
              Assignees
            </label>
            {loading ? (
              <p className="text-gray-500 dark:text-gray-400">Loading...</p>
            ) : (
              <select
                multiple
                name="assignees"
                value={task.assignees}
                onChange={handleAssigneesChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                required
              >
                {teamMembers.map((member) => (
                  <option key={member} value={member}>
                    {member}
                  </option>
                ))}
              </select>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Hold Ctrl (Windows) or Command (Mac) to select multiple.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
              Priority
            </label>
            <select
              name="priority"
              value={task.priority}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              required
            >
              {priorities.map((priority) => (
                <option key={priority.value} value={priority.value}>
                  {priority.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
          >
            {defaultTask ? "Edit Task" : "Create Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
