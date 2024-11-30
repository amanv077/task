import { USER_API_END_POINT } from "@/utils/constant";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import UserCard from "./UserCard"; // Import the UserCard component

const ManageTeam = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch team members from the backend
  useEffect(() => {
    const fetchTeamMembers = async () => {
      setLoading(true);
      try {
        const response = await fetch(USER_API_END_POINT);
        const data = await response.json();

        if (data.success) {
          const users = data.users.filter((user) => user.role === "user");
          setTeamMembers(users);
        } else {
          setError(data.message || "Error fetching users");
        }
      } catch (error) {
        setError("Error fetching users: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  // Handle Delete User
  const deleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        setLoading(true);

        const response = await fetch(
          `${USER_API_END_POINT}/user/delete/${userId}`,
          {
            method: "DELETE",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (data.success) {
          setTeamMembers(teamMembers.filter((member) => member._id !== userId));
          alert("User deleted successfully");
        } else {
          alert(data.message || "Failed to delete user");
        }
      } catch (error) {
        alert("Error deleting user: " + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  // Edit User function (route to EditUser page)
  const editUser = (userId) => {
    window.location.href = `/edit-user/${userId}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl font-bold text-gray-800">Team Members</h2>
        <Link
          to="/create-user"
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
        >
          + Add New User
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg text-gray-500 animate-pulse">Loading...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      ) : teamMembers.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 text-lg">No team members available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <UserCard
              key={member._id}
              member={member}
              onEdit={() => editUser(member._id)}
              onDelete={() => deleteUser(member._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageTeam;
