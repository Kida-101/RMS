import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // Simulated admin user data (will be replaced by backend later)
  const adminUsers = [
    { email: "manager@example.com", password: "1234", role: "Manager", isAdmin: true },
    { email: "cashier@example.com", password: "abcd", role: "Cashier", isAdmin: true },
    { email: "storekeeper@example.com", password: "store123", role: "Storekeeper", isAdmin: true },
  ];

  const handleLogin = (e) => {
    e.preventDefault();

    const foundUser = adminUsers.find(
      (user) =>
        user.email === formData.email &&
        user.password === formData.password &&
        user.isAdmin === true
    );

    if (!foundUser) {
      setError("Invalid email, password, or you're not an admin.");
      return;
    }

    // Redirect based on role
    switch (foundUser.role) {
      case "Manager":
        navigate("/manager");
        break;
      case "Cashier":
        navigate("/Casher");
        break;
      case "Storekeeper":
        navigate("/storekeeper");
        break;
      default:
        setError("No dashboard found for this role.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="border p-2 rounded w-full mb-3"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="border p-2 rounded w-full mb-4"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 w-full rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
