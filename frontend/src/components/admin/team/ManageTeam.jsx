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
        // Show loading indicator or disable button
        setLoading(true);

        // Send DELETE request to the server
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
          // If deletion is successful, update the state to remove the user
          setTeamMembers(teamMembers.filter((member) => member._id !== userId));
          alert("User deleted successfully");
        } else {
          // If there's a failure, show the message returned from the backend
          alert(data.message || "Failed to delete user");
        }
      } catch (error) {
        // If an error occurs during the request, show an error message
        alert("Error deleting user: " + error.message);
      } finally {
        // Hide loading indicator or re-enable button
        setLoading(false);
      }
    }
  };

  // Handle Edit User (you could show a modal or navigate to another page)
  const editUser = (userId) => {
    // For now, just alerting. In a real scenario, this would redirect or open a form to edit the user.
    alert(`Editing user with ID: ${userId}`);
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Team Members</h2>
        <Link
          to="/create-user" // Add the route for creating a new user
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
            <p>No users available</p> // Show when no team members exist
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
      )}
    </div>
  );
};

export default ManageTeam;
