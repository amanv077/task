import Sidebar from "./Sidebar";
import Tasks from "./task/Tasks";

const AdminDashboard = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex flex-col flex-grow">
        {/* Main Content */}
        <div className="p-6 space-y-6">
          <Tasks />
          {/* Task Management Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* <div className="bg-white shadow-md p-4 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Team Management</h2>
              <ManageTeam />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
