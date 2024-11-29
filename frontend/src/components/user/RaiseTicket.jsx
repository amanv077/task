import React, { useState } from "react";

const RaiseTicket = () => {
  const [ticket, setTicket] = useState({ subject: "", description: "" });

  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call to raise a ticket
    console.log("Ticket Raised:", ticket);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="subject"
        value={ticket.subject}
        onChange={handleChange}
        placeholder="Ticket Subject"
        className="w-full p-2 border rounded-lg"
        required
      />
      <textarea
        name="description"
        value={ticket.description}
        onChange={handleChange}
        placeholder="Describe your issue"
        className="w-full p-2 border rounded-lg"
        required
      ></textarea>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg"
      >
        Raise Ticket
      </button>
    </form>
  );
};

export default RaiseTicket;
