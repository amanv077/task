import TaskList from "../admin/task/TaskList";
import Tasks from "../admin/task/Tasks";
import AssignedTasks from "./AssignedTasks";
import CompletedTasks from "./CompletedTasks";
import UserSidebar from "./UserSidebar";

const UserDashboard = () => {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <UserSidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-grow">
        {/* Header */}
        <div className="bg-white shadow p-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">User Dashboard</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition">
            Add New Task
          </button>
        </div>

        {/* Main Content Area */}
        <div className="p-6 space-y-8">
          {/* Assigned Tasks */}
          {/* <div className="bg-white shadow-md p-6 rounded-lg"> */}
          {/* <h2 className="text-xl font-bold text-gray-800 mb-4">
              Assigned Tasks
            </h2> */}
          <Tasks />
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
