import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error logging out");
    }
  };

  const handleHeaderClick = () => {
    if (!user) {
      navigate("/");
    } else if (user.role === "admin") {
      navigate("/admin-dashboard");
    } else {
      navigate("/user-dashboard");
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div>
          <h1
            onClick={handleHeaderClick}
            className="text-2xl font-bold tracking-tight text-blue-600 dark:text-blue-400 flex items-center gap-2 cursor-pointer"
          >
            <span className="bg-blue-600 text-white px-3 py-1 rounded-lg shadow-md dark:bg-blue-500">
              Task
            </span>
            <span className="text-gray-800 dark:text-gray-200">Manager</span>
          </h1>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          <ul className="hidden md:flex items-center gap-6 text-blue-600 font-medium">
            {user && user.role === "admin" ? (
              <>
                <li>
                  <Link
                    to="/admin-dashboard"
                    className="hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                  >
                    Admin Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/create-task"
                    className="hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                  >
                    Create Task
                  </Link>
                </li>
              </>
            ) : user && user.role === "user" ? (
              <li>
                <Link
                  to="/user-dashboard"
                  className="hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                >
                  User Dashboard
                </Link>
              </li>
            ) : null}
          </ul>

          {/* Authentication */}
          <div className="flex items-center gap-4">
            {!user ? (
              <>
                <Link to="/login">
                  <Button
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-colors">
                    Signup
                  </Button>
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto || "/default-avatar.png"}
                    alt="User Profile"
                  />
                </Avatar>
                <div className="hidden sm:block text-sm">
                  <h4 className="font-medium text-gray-800 dark:text-gray-100">
                    {user?.fullname}
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400">
                    {user?.profile?.bio || "No bio available"}
                  </p>
                </div>
                <button
                  className="text-red-600 font-medium hover:text-red-700 transition-colors"
                  onClick={logoutHandler}
                >
                  <LogOut className="inline-block mr-1" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
