import Sidebar from "./Sidebar";
import Tasks from "./task/Tasks";

const AdminDashboard = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex flex-col flex-grow">
        <div className="p-6 space-y-6">
          <Tasks />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6"></div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
