import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { TASK_API_END_POINT } from "@/utils/constant";

const TaskDetail = () => {
  const { id } = useParams();
  const [activeTask, setActiveTask] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchATask = async (taskId) => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${TASK_API_END_POINT}/${taskId}`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setActiveTask(res.data.task);
      }
    } catch {
      setError("Error fetching task details");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchATask(id);
    }
  }, [id]);

  if (isLoading) {
    return <div className="text-center py-20 text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-600">{error}</div>;
  }

  if (!activeTask) {
    return (
      <div className="text-center py-20 text-gray-500">No data available.</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 sm:p-12">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 sm:p-10">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Task Details</h1>
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:underline focus:outline-none"
          >
            Go Back
          </button>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <DetailItem label="Title" value={activeTask.title} />
          <DetailItem label="Description" value={activeTask.description} />
          <DetailItem
            label="Assignees"
            value={activeTask.assignees?.join(", ")}
          />
          <DetailItem
            label="Priority"
            value={activeTask.priority}
            valueClass={getPriorityClass(activeTask.priority)}
          />
          <DetailItem
            label="Status"
            value={activeTask.status}
            valueClass={
              activeTask.status === "Completed"
                ? "text-green-600"
                : "text-red-600"
            }
          />
          <DetailItem
            label="Deadline"
            value={
              activeTask.deadline
                ? new Date(activeTask.deadline).toLocaleDateString()
                : "No deadline"
            }
          />
        </div>
      </div>
    </div>
  );
};

// Reusable DetailItem Component
const DetailItem = ({ label, value, valueClass = "text-gray-700" }) => (
  <div className="space-y-1">
    <span className="block text-sm font-medium text-gray-500">{label}</span>
    <span className={`block text-lg font-semibold ${valueClass}`}>
      {value || "Not available"}
    </span>
  </div>
);

// Get Priority Styling Class
const getPriorityClass = (priority) => {
  switch (priority) {
    case "High":
      return "text-red-600";
    case "Medium":
      return "text-orange-400";
    case "Low":
      return "text-green-500";
    default:
      return "text-gray-700";
  }
};

export default TaskDetail;
