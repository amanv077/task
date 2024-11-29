import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";

const EditUser = () => {
  const { userId } = useParams(); // Get the userId from the URL params
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("user");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // For navigation after successful edit

  //   // Fetch user data on component mount
  //   useEffect(() => {
  //     const fetchUserData = async () => {
  //       try {
  //         const response = await fetch(`${USER_API_END_POINT}/${userId}`);
  //         const data = await response.json();

  //         if (data.success) {
  //           const user = data.user;
  //           setUserData(user);
  //           setFullname(user.fullname);
  //           setEmail(user.email);
  //           setPhoneNumber(user.phoneNumber);
  //           setRole(user.role);
  //         } else {
  //           setError(data.message || "Error fetching user data");
  //         }
  //       } catch (error) {
  //         setError("Error fetching user data: " + error.message);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchUserData();
  //   }, [userId]);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${USER_API_END_POINT}/${userId}`);

        // If the response is successful
        if (response.data.success) {
          const user = response.data.user;
          setUserData(user);
          setFullname(user.fullname);
          setEmail(user.email);
          setPhoneNumber(user.phoneNumber);
          setRole(user.role);
        } else {
          setError(response.data.message || "Error fetching user data");
        }
      } catch (error) {
        setError("Error fetching user data: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${USER_API_END_POINT}/user/update/${userId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullname,
            email,
            phoneNumber,
            role,
            password,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("User updated successfully!");
        navigate("/manage-team"); // Redirect to Manage Team page
      } else {
        setError(data.message || "Failed to update user");
      }
    } catch (error) {
      setError("Error updating user: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit User</h2>
      {error && <p className="text-red-500">{error}</p>}
      {userData && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block">Full Name</label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block">Phone Number</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <label className="block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              {loading ? "Updating..." : "Update User"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditUser;
