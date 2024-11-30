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

  // Log out handler
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

  // Handle header click based on user role
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
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16">
        {/* Logo */}
        <div>
          <h1
            onClick={handleHeaderClick}
            className="text-3xl font-bold tracking-tight text-blue-600 dark:text-blue-400 flex items-center space-x-2 cursor-pointer"
          >
            <span className="bg-blue-600 text-white px-2 py-1 rounded-md shadow-lg dark:bg-blue-500">
              Task
            </span>
            <span className="text-gray-800 dark:text-gray-200">Manager</span>
          </h1>
        </div>

        {/* Menu */}
        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-6 text-[#004aad] font-semibold">
            {/* Role-based Links */}
            {user && user.role === "admin" ? (
              <>
                <li>
                  <Link to="/admin-dashboard" className="hover:text-[#003b8d]">
                    Admin Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/create-task" className="hover:text-[#003b8d]">
                    Create Task
                  </Link>
                </li>
              </>
            ) : user && user.role === "user" ? (
              <li>
                <Link to="/user-dashboard" className="hover:text-[#003b8d]">
                  User Dashboard
                </Link>
              </li>
            ) : null}
          </ul>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            {!user ? (
              <>
                <Link to="/login">
                  <Button
                    variant="outline"
                    className="border-[#004aad] text-[#004aad] hover:bg-[#004aad] hover:text-white"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-[#004aad] hover:bg-[#003b8d] text-white">
                    Signup
                  </Button>
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="User Profile"
                  />
                </Avatar>
                <div className="flex flex-col text-sm">
                  <h4 className="font-medium">{user?.fullname}</h4>
                  <p className="text-gray-500">{user?.profile?.bio}</p>
                </div>
                <button
                  className="text-red-500 font-semibold hover:text-red-600"
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
