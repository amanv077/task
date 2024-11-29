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
          // Filter users by role and map their fullnames
          const users = data.users.filter((user) => user.role === "user");
          setTeamMembers(users); // Store whole user data for editing/deleting purposes
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
  }, []); // Empty dependency array means this effect runs once when the component mounts

  // Handle Delete User
  const deleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        setLoading(true);

        const response = await fetch(
          `${USER_API_END_POINT}/user/delete/${userId}`,
          {
            method: "DELETE",
            credentials: "include", // Ensure the cookie with token is sent
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
    // Navigate to the EditUser page, passing userId as a parameter
    window.location.href = `/edit-user/${userId}`; // Redirecting manually for simplicity
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Team Members</h2>
        <Link
          to="/create-user"
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
        >
          Create User
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          {teamMembers.length === 0 ? (
            <p>No users available</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {teamMembers.map((member) => (
                <UserCard
                  key={member._id}
                  member={member}
                  onEdit={() => editUser(member._id)} // Trigger edit when the edit button is clicked
                  onDelete={() => deleteUser(member._id)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageTeam;
