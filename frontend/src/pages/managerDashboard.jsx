import React, { useState } from "react";
import "../pages/pagestyls/ManagerDashboard.css";

const ManagerDashboard = () => {
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: "Burger", price: 10 },
    { id: 2, name: "Pizza", price: 15 },
  ]);

  const [newItem, setNewItem] = useState({ name: "", price: "" });

  const handleAddMenuItem = () => {
    if (newItem.name && newItem.price) {
      setMenuItems([...menuItems, { id: Date.now(), ...newItem }]);
      setNewItem({ name: "", price: "" });
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
            <li>Menu Management</li>
            <li className="active">Table Reservation</li>
            <li>Settings</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <h1>Manager Dashboard</h1>
          <button className="add-btn">+ Add New Reservation</button>
        </header>

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
          <ul className="menu-list">
            {menuItems.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price}
              </li>
            ))}
          </ul>
        </section>

        {/* Reports and Analysis */}
        <section className="card">
          <h2>Reports & Analysis</h2>
          <div className="report-buttons">
            <button>Daily Report</button>
            <button>Weekly Report</button>
            <button>Monthly Report</button>
          </div>
        </section>

        {/* Menu Page */}
        <section className="card">
          <h2>Menu Page</h2>
          <ul className="menu-list">
            {menuItems.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default ManagerDashboard;
