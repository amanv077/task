import React from "react";

const TeamMemberCard = ({ member }) => {
  return (
    <div className="p-4 border rounded-md shadow-sm">
      <h3 className="font-bold">{member.name}</h3>
      <p>Role: {member.role}</p>
    </div>
  );
};

export default TeamMemberCard;
