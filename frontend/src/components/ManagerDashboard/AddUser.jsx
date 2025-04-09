import React, { useState } from "react";
import axios from "axios";

const AddUser = () => {
  const [user, setUser] = useState({ name: "", email: "", role: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleAddUser = async () => {
    if (!user.name || !user.email || !user.role) {
      setError("All fields are required");
      return;
    }
    setError("");
    setSuccess("");

    try {
      await axios.post("http://localhost:5000/api/users", user);
      setSuccess("User added successfully");
      setUser({ name: "", email: "", role: "" });
    } catch (err) {
      setError("Failed to add user");
    }
  };

  return (
    <section className="bg-white p-6 rounded-lg shadow max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">Add New User</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input type="text" placeholder="Full Name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} className="border p-2 rounded w-full" />
        <input type="email" placeholder="Email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} className="border p-2 rounded w-full" />
        <select value={user.role} onChange={(e) => setUser({ ...user, role: e.target.value })} className="border p-2 rounded w-full">
          <option value="">Select Role</option>
          <option value="Manager">Manager</option>
          <option value="Chef">Chef</option>
          <option value="Cashier">Cashier</option>
          <option value="Waiter">Waiter</option>
          <option value="Storekeeper">Storekeeper</option>
          <option value="Kitchen Manager">Kitchen Manager</option>
        </select>
        <button onClick={handleAddUser} className="bg-blue-500 text-white px-4 py-2 rounded w-full">Add User</button>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}
      {success && <p className="text-green-500 text-center">{success}</p>}
    </section>
  );
};
export default AddUser;
