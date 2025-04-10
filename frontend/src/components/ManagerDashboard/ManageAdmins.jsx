import React, { useState, useEffect } from "react";

const ManageAdmins = () => {
  // State for users, errors, and forms
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [newCredentials, setNewCredentials] = useState({ email: "", password: "" });
  const [updatedPasswords, setUpdatedPasswords] = useState({});
  const [isEditing, setIsEditing] = useState(null); // Track which user is being edited

  // Mock users (replace with real API calls)
  useEffect(() => {
    const mockUsers = [
      { id: 1, email: "admin@example.com", role: "Admin", isAdmin: true },
      { id: 2, email: "chef@example.com", role: "Chef", isAdmin: false },
      { id: 3, email: "waiter@example.com", role: "Waiter", isAdmin: false },
    ];
    setUsers(mockUsers);
  }, []);

  // Promote/Demote user
  const toggleAdmin = (userId) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, isAdmin: !user.isAdmin } : user
    ));
  };

  // Delete user
  const handleDelete = (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    setUsers(users.filter(user => user.id !== userId));
  };

  // Assign new credentials (email + password)
  const handleAssignCredentials = (userId) => {
    if (!newCredentials.email || !newCredentials.password) {
      setError("Email and password are required.");
      return;
    }
    if (newCredentials.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setUsers(users.map(user =>
      user.id === userId ? { ...user, email: newCredentials.email } : user
    ));
    alert(`Credentials assigned:\nEmail: ${newCredentials.email}\nPassword: ${newCredentials.password}`);
    setNewCredentials({ email: "", password: "" });
    setError("");
  };

  // Update password
  const handlePasswordChange = (userId) => {
    const newPassword = updatedPasswords[userId];
    if (!newPassword || newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    alert(`Password updated for user ${userId}`);
    setUpdatedPasswords({ ...updatedPasswords, [userId]: "" });
    setError("");
  };

  return (
    <section className="bg-white p-6 rounded-lg shadow max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">Manage Users</h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <ul className="space-y-4">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-100 p-4 rounded"
          >
            <div className="mb-2 md:mb-0">
              <span className="font-medium">{user.email}</span>
              <span className="text-gray-600 ml-2">({user.role})</span>
              {user.isAdmin && <span className="ml-2 text-green-600">● Admin</span>}
            </div>

            <div className="flex flex-col gap-2 w-full md:w-auto">
              {/* Promote/Demote Button */}
              <button
                onClick={() => toggleAdmin(user.id)}
                className={`px-3 py-1 rounded ${
                  user.isAdmin ? "bg-orange-500" : "bg-blue-500"
                } text-white`}
              >
                {user.isAdmin ? "Demote" : "Promote to Admin"}
              </button>

              {/* Assign Credentials (for new admins) */}
              {user.isAdmin && (
                <div className="mt-2">
                  <h3 className="text-sm font-semibold mb-1">Assign Credentials</h3>
                  <input
                    type="email"
                    placeholder="New Email"
                    value={newCredentials.email}
                    onChange={(e) => setNewCredentials({ ...newCredentials, email: e.target.value })}
                    className="border p-2 rounded w-full mb-1"
                  />
                  <input
                    type="password"
                    placeholder="New Password"
                    value={newCredentials.password}
                    onChange={(e) => setNewCredentials({ ...newCredentials, password: e.target.value })}
                    className="border p-2 rounded w-full mb-1"
                  />
                  <button
                    onClick={() => handleAssignCredentials(user.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded w-full"
                  >
                    Save Credentials
                  </button>
                </div>
              )}

              {/* Change Password (for all users) */}
              <div className="mt-2">
                <h3 className="text-sm font-semibold mb-1">Change Password</h3>
                <input
                  type="password"
                  placeholder="New Password"
                  value={updatedPasswords[user.id] || ""}
                  onChange={(e) =>
                    setUpdatedPasswords({ ...updatedPasswords, [user.id]: e.target.value })
                  }
                  className="border p-2 rounded w-full mb-1"
                />
                <button
                  onClick={() => handlePasswordChange(user.id)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded w-full"
                >
                  Update Password
                </button>
              </div>

              {/* Delete User Button */}
              <button
                onClick={() => handleDelete(user.id)}
                className="bg-red-500 text-white px-3 py-1 rounded mt-2"
              >
                Delete User
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ManageAdmins;