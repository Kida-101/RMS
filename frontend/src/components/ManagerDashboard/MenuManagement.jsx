import React, { useState, useEffect } from "react";
import axios from "axios";

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", price: "", category: "", description: "", image: null });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/menu");
      setMenuItems(response.data);
    } catch (err) {
      setError("Failed to load menu");
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
      setMenuItems(menuItems.filter((item) => item.id !== id));
    } catch (err) {
      setError("Failed to delete item");
    }
  };

  return (
    <section className="bg-white p-6 rounded-lg shadow max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">Update Menu</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <input type="text" placeholder="Item Name" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} className="border p-2 rounded w-full" />
        <input type="number" placeholder="Price" value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} className="border p-2 rounded w-full" />
        <input type="text" placeholder="Category" value={newItem.category} onChange={(e) => setNewItem({ ...newItem, category: e.target.value })} className="border p-2 rounded w-full" />
        <input type="text" placeholder="Description" value={newItem.description} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} className="border p-2 rounded w-full col-span-2" />
        <input type="file" accept="image/*" onChange={(e) => setNewItem({ ...newItem, image: e.target.files[0] })} className="border p-2 rounded w-full" />
        <button onClick={handleAddMenuItem} className="bg-green-500 text-white px-4 py-2 rounded w-full">Add Item</button>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.id} className="flex flex-wrap justify-between items-center bg-gray-100 p-2 rounded">
            <span className="text-sm md:text-base">{item.name} - ${item.price}</span>
            <button onClick={() => handleDeleteMenuItem(item.id)} className="bg-red-500 text-white px-3 py-1 rounded">❌</button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MenuManagement;
