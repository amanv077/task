import CreateTask from "./CreateTask";
import TaskList from "./TaskList";
import { useEffect, useState } from "react";
import axios from "axios";
import { TASK_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useParams } from "react-router-dom";

// const inActiveTabCn =
//   "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300";

// const activeTabCn =
//   "inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500";

function Tasks({ type }) {
  const { taskId } = useParams();
  const [activeTask, setActiveTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activePanel, setActivePanel] = useState("show-tasks");

  const handlerShowTaskList = () => setActivePanel("show-tasks");

  const fetchAllTasks = async (loadingId = true) => {
    setIsLoading(loadingId);
    try {
      const res = await axios.get(`${TASK_API_END_POINT}`, {
        withCredentials: true,
      });

      if (res.status === 200) setTasks(res.data.tasks);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchATask = async (taskId) => {
    setIsLoading(taskId);
    try {
      const res = await axios.get(`${TASK_API_END_POINT}/${taskId}`, {
        withCredentials: true,
      });

      if (res.status === 200) {
        console.log(res);
        setActiveTask(res.data.task);
        setActivePanel("create-task");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateTask = async (task, type) => {
    const toggleStatus = type === "toggle-status";
    try {
      const res = await axios.put(
        `${TASK_API_END_POINT}/${task._id}`,
        {
          ...task,
          ...(toggleStatus && {
            status: task.status === "Pending" ? "Completed" : "Pending",
          }),
        },
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        await fetchAllTasks(task._id);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
      setActiveTask(null);
      handlerShowTaskList();
    }
  };

  const handleTask = async (type, task) => {
    switch (type) {
      case "edit-task": {
        setActiveTask(task);
        setActivePanel("create-task");
        break;
      }
      case "update-task":
      case "toggle-status": {
        setIsLoading(task._id);
        await updateTask(task, type);
        break;
      }
      case "delete-task": {
        setIsLoading(task._id);
        try {
          const res = await axios.delete(`${TASK_API_END_POINT}/${task._id}`, {
            withCredentials: true,
          });
          if (res.data.success) {
            toast.success(res.data.message);
            await fetchAllTasks();
          }
        } catch (error) {
          toast.error(error.response?.data?.message || "An error occurred");
        } finally {
          setIsLoading(false);
        }
        break;
      }
      default: {
        console.log(type, " action is not handled");
      }
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  useEffect(() => {
    if (type === "create") setActivePanel("create-task");
    if (type === "show") setActivePanel("show-tasks");
    if (type === "edit") {
      setActivePanel("edit-task");
      if (taskId) fetchATask(taskId);
    }
  }, [type, taskId]);

  const pendingTasks = tasks.filter((task) => task.status === "Pending");
  const completedTasks = tasks.filter((task) => task.status === "Completed");

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="">
        {activePanel === "create-task" && (
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              {activeTask ? "Edit Task" : "Create Task"}
            </h2>
            <CreateTask
              defaultTask={activeTask}
              handleTask={handleTask}
              handlerShowTaskList={handlerShowTaskList}
            />
          </div>
        )}
        {activePanel === "show-tasks" && (
          <>
            <div className="bg-gray-100 dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-5">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                Current Tasks
              </h2>
              {pendingTasks.length > 0 ? (
                <TaskList
                  tasks={pendingTasks}
                  isLoading={isLoading}
                  handleTask={handleTask}
                />
              ) : (
                <div className="flex items-center justify-center p-6 text-center text-gray-600 dark:text-gray-400">
                  <p className="text-lg">
                    🎉 No pending tasks! Take a break or create a new one.
                  </p>
                </div>
              )}
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 shadow-lg rounded-lg p-6 mt-5">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                Completed Tasks
              </h2>
              {completedTasks.length > 0 ? (
                <TaskList
                  tasks={completedTasks}
                  isLoading={isLoading}
                  handleTask={handleTask}
                />
              ) : (
                <div className="flex items-center justify-center p-6 text-center text-gray-600 dark:text-gray-400">
                  <p className="text-lg">
                    ✅ No completed tasks yet. Finish some tasks and see them
                    here!
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Tasks;
