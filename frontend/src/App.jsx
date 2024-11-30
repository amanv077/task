import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import Footer from "./components/shared/Footer";
import AdminDashboard from "./components/admin/AdminDashboard";
import UserDashboard from "./components/user/UserDashboard";
import Tasks from "./components/admin/task/Tasks";
import ManageTeam from "./components/admin/team/ManageTeam";
import CreateUser from "./components/admin/team/CreateUser";
import EditUser from "./components/admin/team/EditUser";
import TaskDetail from "./components/admin/task/TaskDetail";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Navbar />
      </header>
      <main className="flex-grow px-4 sm:px-6 md:px-8">
        <Outlet />
      </main>
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      { path: "/create-task", element: <Tasks type="create" /> },
      { path: "/edit-task/:taskId", element: <Tasks type="edit" /> },
      { path: "/show-tasks", element: <Tasks type="show" /> },
      {
        path: "/signup",
        element: <Signup />,
      },

      {
        path: "/user-dashboard",
        element: <UserDashboard />,
      },

      {
        path: "/create-user",
        element: <CreateUser />,
      },

      {
        path: "/task/:id",
        element: <TaskDetail />,
      },

      {
        path: "/profile",
        element: <Profile />,
      },

      {
        path: "/admin-dashboard",
        element: (
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/manage-team",
        element: (
          <ProtectedRoute>
            <ManageTeam />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/edit-user/:userId",
        element: (
          <ProtectedRoute>
            {" "}
            <EditUser />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
