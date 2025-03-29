import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({ email: "", role: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admins");
      setAdmins(response.data);
    } catch (err) {
      setError("Failed to load admins");
    }
  };

  const handleAddAdmin = async () => {
    if (!newAdmin.email || !newAdmin.role) return;

    try {
      const response = await axios.post("http://localhost:5000/api/admins", newAdmin);
      setAdmins([...admins, response.data]);
      setNewAdmin({ email: "", role: "" });
    } catch (err) {
      setError("Failed to add admin");
    }
  };

  const handleDeleteAdmin = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admins/${id}`);
      setAdmins(admins.filter((admin) => admin.id !== id));
    } catch (err) {
      setError("Failed to delete admin");
    }
  };

  return (
    <section className="bg-white p-6 rounded-lg shadow max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">Manage Admins</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input type="email" placeholder="Admin Email" value={newAdmin.email} onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })} className="border p-2 rounded w-full" />
        <select value={newAdmin.role} onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })} className="border p-2 rounded w-full">
          <option value="">Select Role</option>
          <option value="Manager">Manager</option>
          <option value="Chef">Chef</option>
          <option value="Cashier">Cashier</option>
          <option value="Waiter">Waiter</option>
          <option value="Storekeeper">Storekeeper</option>
          <option value="Kitchen Manager">Kitchen Manager</option>
        </select>
        <button onClick={handleAddAdmin} className="bg-green-500 text-white px-4 py-2 rounded w-full">Add Admin</button>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <ul className="space-y-2">
        {admins.map((admin) => (
          <li key={admin.id} className="flex flex-wrap justify-between items-center bg-gray-100 p-2 rounded">
            <span className="text-sm md:text-base">{admin.email} - {admin.role}</span>
            <button onClick={() => handleDeleteAdmin(admin.id)} className="bg-red-500 text-white px-3 py-1 rounded">❌</button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ManageAdmins;
