import React, { useEffect, useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

const UserProfile = () => {
  const [user, setUser] = useState(null); // State for user data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${USER_API_END_POINT}/profile`, {
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (err) {
        console.error("Failed to fetch user details:", err);
        setError("Failed to load user details.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-2xl p-6">
        {/* Profile Header */}
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 rounded-full">
            <AvatarImage
              src={
                user?.profilePhoto ||
                "https://via.placeholder.com/150?text=Avatar"
              }
              alt="Profile Picture"
            />
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">
              {user?.fullname || "No Name Available"}
            </h1>
            <p className="text-gray-600">{user?.bio || "No bio provided"}</p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Contact Information</h2>
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Email:</span>{" "}
              {user?.email || "No email provided"}
            </p>
            <p>
              <span className="font-semibold">Phone Number:</span>{" "}
              {user?.phoneNumber || "No phone number provided"}
            </p>
          </div>
        </div>

        {/* Additional Details */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Additional Details</h2>
          <p>
            <span className="font-semibold">Gender:</span>{" "}
            {user?.gender || "Not specified"}
          </p>
          <p>
            <span className="font-semibold">Date of Birth:</span>{" "}
            {user?.dob || "Not specified"}
          </p>
        </div>

        {/* Edit Profile Button */}
        <div className="mt-6">
          <Button
            onClick={() => toast.info("Edit profile feature coming soon!")}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
