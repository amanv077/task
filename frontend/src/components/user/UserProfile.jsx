import React from "react";

const UserProfile = () => {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "User",
  };

  return (
    <div className="space-y-4">
      <p>
        <span className="font-semibold">Name:</span> {user.name}
      </p>
      <p>
        <span className="font-semibold">Email:</span> {user.email}
      </p>
      <p>
        <span className="font-semibold">Role:</span> {user.role}
      </p>
    </div>
  );
};

export default UserProfile;
