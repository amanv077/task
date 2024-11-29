import CreateTask from "./CreateTask";
import TaskList from "./TaskList";
import CompletedTasks from "./CompletedTasks";
import { useEffect, useState } from "react";
import axios from "axios";
import { TASK_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

const inActiveTabCn =
  "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300";

const activeTabCn =
  "inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500";

function Tasks() {
  const [activeTask, setActiveTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activePanel, setActivePanel] = useState("create-task");

  const handlerShowTaskList = () => setActivePanel("show-tasks");

  const fetchAllApplicants = async (loadingId = true) => {
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

  const updateTask = async (task) => {
    try {
      const res = await axios.put(
        `${TASK_API_END_POINT}/${task._id}`,
        {
          ...task,
          status: task.status === "Pending" ? "Completed" : "Pending",
        },
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        await fetchAllApplicants(task._id);
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
    console.log(type, task);
    switch (type) {
      case "edit-task": {
        setActiveTask(task);
        setActivePanel("create-task");
        break;
      }
      case "update-task":
      case "toggle-status": {
        setIsLoading(task._id);
        await updateTask(task);
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
            await fetchAllApplicants();
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
    fetchAllApplicants();
  }, []);

  const pendingTasks = tasks.filter((task) => task.status === "Pending");
  const completedTasks = tasks.filter((task) => task.status === "Completed");

  return (
    <div>
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 mb-2">
        <ul className="flex flex-wrap -mb-px">
          <li className="me-2">
            <button
              onClick={() => {
                setActivePanel("create-task");
                setActiveTask(null);
              }}
              className={
                activePanel === "create-task" ? activeTabCn : inActiveTabCn
              }
            >
              create task
            </button>
          </li>
          <li className="me-2">
            <button
              onClick={() => setActivePanel("show-tasks")}
              className={
                activePanel === "show-tasks" ? activeTabCn : inActiveTabCn
              }
            >
              show tasks
            </button>
          </li>
        </ul>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {activePanel === "create-task" && (
          <div className="bg-white shadow-md p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4">
              {activeTask ? "Edit Task" : "Create Task"}
            </h2>
            <CreateTask
              defaultTask={activeTask}
              handleTask={handleTask}
              handlerShowTaskList={handlerShowTaskList}
            />
          </div>
        )}
        {/* Current and Completed Tasks */}
        {activePanel === "show-tasks" && (
          <div className="bg-white shadow-md p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Current Tasks</h2>
            <TaskList
              tasks={pendingTasks}
              isLoading={isLoading}
              handleTask={handleTask}
            />
          </div>
        )}
        {activePanel === "show-tasks" && (
          <div className="bg-white shadow-md p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Completed Tasks</h2>
            <TaskList
              tasks={completedTasks}
              isLoading={isLoading}
              handleTask={handleTask}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Tasks;
