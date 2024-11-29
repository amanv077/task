import Sidebar from "../admin/Sidebar";
import CreateTask from "../admin/task/CreateTask";
import AssignedTasks from "./AssignedTasks";
import CompletedTasks from "./CompletedTasks";
import RaiseTicket from "./RaiseTicket";
import TodayDeadlines from "./TodayDeadlines";
import UserProfile from "./UserProfile";

const UserDashboard = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex flex-col flex-grow">
        {/* Main Content */}
        <div className="p-6 space-y-6">
          {/* Profile Section */}
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">User Profile</h2>
            <UserProfile />
          </div>

          {/* Task Management */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Assigned Tasks</h2>
              <AssignedTasks />
            </div>
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Create Task</h2>
              <CreateTask />
            </div>
          </div>

          {/* Completed Tasks and Deadlines */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Completed Tasks</h2>
              <CompletedTasks />
            </div>
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Today's Deadlines</h2>
              <TodayDeadlines />
            </div>
          </div>

          {/* Raise Ticket */}
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Raise a Ticket</h2>
            <RaiseTicket />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
