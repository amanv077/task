import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white text-black h-screen flex flex-col shadow-lg">
      <div className="p-6 text-center text-2xl font-semibold text-blue-700 border-b-2 border-gray-200">
        Admin Dashboard
      </div>
      <nav className="flex-grow">
        <ul className="space-y-6 p-6">
          <li>
            <Link
              to="/admin-dashboard"
              className="block py-3 px-4 text-lg font-medium rounded-md transition-all duration-200 ease-in-out hover:bg-blue-600 hover:text-white"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/manage-tasks"
              className="block py-3 px-4 text-lg font-medium rounded-md transition-all duration-200 ease-in-out hover:bg-blue-600 hover:text-white"
            >
              Manage Tasks
            </Link>
          </li>
          <li>
            <Link
              to="/manage-team"
              className="block py-3 px-4 text-lg font-medium rounded-md transition-all duration-200 ease-in-out hover:bg-blue-600 hover:text-white"
            >
              Manage Team
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
