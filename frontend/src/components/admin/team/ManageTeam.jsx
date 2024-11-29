import TeamMemberCard from "./TeamMemberCard";

const ManageTeam = () => {
  // Replace this with API data
  const teamMembers = [
    { id: 1, name: "John Doe", role: "Developer" },
    { id: 2, name: "Jane Smith", role: "Designer" },
  ];

  return (
    <div className="space-y-4">
      {teamMembers.map((member) => (
        <TeamMemberCard key={member.id} member={member} />
      ))}
    </div>
  );
};

export default ManageTeam;
