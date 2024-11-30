import Tasks from "../admin/task/Tasks";
import UserSidebar from "./UserSidebar";

const UserDashboard = () => {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <UserSidebar />

      <div className="flex flex-col flex-grow">
        <div className="bg-white shadow p-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">User Dashboard</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition">
            Add New Task
          </button>
        </div>

        <div className="p-6 space-y-8">
          <Tasks />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
