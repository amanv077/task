import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-blue-600 text-white h-screen flex flex-col">
      <div className="p-4 text-center text-2xl font-bold">Admin Dashboard</div>
      <nav className="flex-grow">
        <ul className="space-y-4 p-4">
          <li>
            <Link
              to="/admin-dashboard"
              className="block py-2 px-4 hover:bg-blue-700 rounded-md"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/manage-tasks"
              className="block py-2 px-4 hover:bg-blue-700 rounded-md"
            >
              Manage Tasks
            </Link>
          </li>
          <li>
            <Link
              to="/manage-team"
              className="block py-2 px-4 hover:bg-blue-700 rounded-md"
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
