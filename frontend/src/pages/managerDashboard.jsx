import React, { useState, useEffect } from "react";
import axios from "axios";
import "../pages/pagestyls/ManagerDashboard.css";

const ManagerDashboard = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", price: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [reportType, setReportType] = useState("daily");
  const [reports, setReports] = useState(null);

  useEffect(() => {
    fetchMenu();
    fetchReports(reportType);
  }, [reportType]);

  // Fetch menu items from backend
  const fetchMenu = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/menu");
      setMenuItems(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching menu:", err);
      setError("Failed to load menu");
      setLoading(false);
    }
  };

  // Fetch reports from backend
  const fetchReports = async (type) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/reports?type=${type}`);
      setReports(response.data);
    } catch (err) {
      console.error("Error fetching reports:", err);
      setError("Failed to load reports");
    }
  };

  // Add new menu item
  const handleAddMenuItem = async () => {
    if (!newItem.name || !newItem.price) return;

    try {
      const response = await axios.post("http://localhost:5000/api/menu", newItem);
      setMenuItems([...menuItems, response.data]);
      setNewItem({ name: "", price: "" });
    } catch (err) {
      console.error("Error adding menu item:", err);
      setError("Failed to add item");
    }
  };

  // Delete menu item
  const handleDeleteMenuItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/menu/${id}`);
      setMenuItems(menuItems.filter(item => item.id !== id));
    } catch (err) {
      console.error("Error deleting menu item:", err);
      setError("Failed to delete item");
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>GOOD FOOD</h2>
        <nav>
          <ul>
            <li>Dashboard</li>
            <li>Reports</li>
            <li>Orders</li>
            <li className="active">Menu Management</li>
            <li>Table Reservation</li>
            <li>Settings</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <h1>Manager Dashboard</h1>
        </header>

        {/* Reports and Analysis Section */}
        <section className="card">
          <h2>Reports & Analysis</h2>
          <div className="report-buttons">
            <button onClick={() => setReportType("daily")}>Daily Report</button>
            <button onClick={() => setReportType("weekly")}>Weekly Report</button>
            <button onClick={() => setReportType("monthly")}>Monthly Report</button>
          </div>

          {reports ? (
            <div className="report-content">
              <h3>{reportType.toUpperCase()} Report</h3>
              <p>Sales: {reports.sales}</p>
              <p>Orders: {reports.orders}</p>
              <p>Revenue: ${reports.revenue}</p>
            </div>
          ) : (
            <p>Loading reports...</p>
          )}
        </section>

        {/* Update Menu Section */}
        <section className="card">
          <h2>Update Menu</h2>
          <div className="input-group">
            <input
              type="text"
              placeholder="Item Name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price"
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            />
            <button onClick={handleAddMenuItem}>Add Item</button>
          </div>

          {loading && <p>Loading menu...</p>}
          {error && <p className="error">{error}</p>}

          <ul className="menu-list">
            {menuItems.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price}
                <button onClick={() => handleDeleteMenuItem(item.id)}>❌</button>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default ManagerDashboard;