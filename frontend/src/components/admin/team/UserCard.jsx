// UserCard component to display individual team members
const UserCard = ({ member, onEdit, onDelete }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold">{member.fullname}</h3>
      <p className="text-gray-600">{member.email}</p>
      <p className="text-gray-500">{member.phoneNumber}</p>
      <div className="flex justify-between mt-4">
        <button
          className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 transition"
          onClick={onEdit}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 transition"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;
