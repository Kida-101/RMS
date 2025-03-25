import React, { useState, useEffect } from "react";
import axios from "axios";

const ManagerDashboard = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", price: "", category: "", description: "", image: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [reportType, setReportType] = useState("daily");
  const [reports, setReports] = useState(null);
  const [selectedSection, setSelectedSection] = useState("menu");

  useEffect(() => {
    if (selectedSection === "menu") {
      fetchMenu();
    } else if (selectedSection === "reports") {
      fetchReports(reportType);
    }
  }, [selectedSection, reportType]);

  const fetchMenu = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/menu");
      setMenuItems(response.data);
    } catch (err) {
      setError("Failed to load menu");
    } finally {
      setLoading(false);
    }
  };

  const fetchReports = async (type) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/reports?type=${type}`);
      setReports(response.data);
    } catch (err) {
      setError("Failed to load reports");
    }
  };

  const handleAddMenuItem = async () => {
    if (!newItem.name || !newItem.price || !newItem.category || !newItem.description || !newItem.image) return;
    
    const formData = new FormData();
    formData.append("name", newItem.name);
    formData.append("price", newItem.price);
    formData.append("category", newItem.category);
    formData.append("description", newItem.description);
    formData.append("image", newItem.image);

    try {
      const response = await axios.post("http://localhost:5000/api/menu", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMenuItems([...menuItems, response.data]);
      setNewItem({ name: "", price: "", category: "", description: "", image: null });
    } catch (err) {
      setError("Failed to add item");
    }
  };

  const handleDeleteMenuItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/menu/${id}`);
      setMenuItems(menuItems.filter(item => item.id !== id));
    } catch (err) {
      setError("Failed to delete item");
    }
  };

  return (
    <div className="flex h-screen font-sans">
      <aside className="w-64 bg-gray-200 p-6">
        <h2 className="text-2xl font-bold mb-4">hi,boss</h2>
        <nav>
          <ul className="space-y-2">
            <li className={`p-2 rounded cursor-pointer ${selectedSection === "menu" ? "bg-purple-400 text-white" : "hover:bg-purple-300"}`} onClick={() => setSelectedSection("menu")}>
              Menu Management
            </li>
            <li className={`p-2 rounded cursor-pointer ${selectedSection === "reports" ? "bg-purple-400 text-white" : "hover:bg-purple-300"}`} onClick={() => setSelectedSection("reports")}>
              Reports
            </li>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Manager Dashboard</h1>

        {selectedSection === "reports" ? (
          <section className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-xl font-semibold mb-4">Reports & Analysis</h2>
            <div className="flex gap-4 mb-4">
              <button onClick={() => setReportType("daily")} className="bg-blue-500 text-white px-4 py-2 rounded">Daily Report</button>
              <button onClick={() => setReportType("weekly")} className="bg-blue-500 text-white px-4 py-2 rounded">Weekly Report</button>
              <button onClick={() => setReportType("monthly")} className="bg-blue-500 text-white px-4 py-2 rounded">Monthly Report</button>
            </div>
            {reports ? (
              <div className="text-lg">
                <p>Sales: {reports.sales}</p>
                <p>Orders: {reports.orders}</p>
                <p>Revenue: ${reports.revenue}</p>
              </div>
            ) : (
              <p>Loading reports...</p>
            )}
          </section>
        ) : (
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Update Menu</h2>
            <div className="flex gap-4 mb-4">
              <input type="text" placeholder="Item Name" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} className="border p-2 rounded w-full" />
              <input type="number" placeholder="Price" value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} className="border p-2 rounded w-full" />
              <input type="text" placeholder="Category" value={newItem.category} onChange={(e) => setNewItem({ ...newItem, category: e.target.value })} className="border p-2 rounded w-full" />
              <input type="text" placeholder="Description" value={newItem.description} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} className="border p-2 rounded w-full" />
              <input type="file" accept="image/*" onChange={(e) => setNewItem({ ...newItem, image: e.target.files[0] })} className="border p-2 rounded w-full" />
              <button onClick={handleAddMenuItem} className="bg-green-500 text-white px-4 py-2 rounded">Add Item</button>
            </div>

            {loading && <p>Loading menu...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                  {item.name} - ${item.price}
                  <button onClick={() => handleDeleteMenuItem(item.id)} className="bg-red-500 text-white px-3 py-1 rounded">❌</button>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
};

export default ManagerDashboard;
