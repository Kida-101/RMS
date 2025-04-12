import React, { useState, useEffect } from "react";

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: null,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    // Mock initial data
    const mockMenu = [
      { id: 1, name: "Burger", price: 10, category: "Fast Food", description: "Tasty burger" },
      { id: 2, name: "Pizza", price: 15, category: "Italian", description: "Cheesy pizza" },
    ];
    setMenuItems(mockMenu);
  }, []);

  const handleAddMenuItem = () => {
    if (
      !newItem.name ||
      !newItem.price ||
      !newItem.category ||
      !newItem.description
    ) {
      setError("Please fill all fields.");
      return;
    }

    const id = Date.now(); // simple ID generation
    const newMenuItem = { ...newItem, id };
    setMenuItems([...menuItems, newMenuItem]);
    setNewItem({ name: "", price: "", category: "", description: "", image: null });
    setError("");
  };

  const handleDeleteMenuItem = (id) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  const handleUpdateMenuItem = (updatedItem) => {
    const updatedList = menuItems.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setMenuItems(updatedList);
  };

  return (
    <section className="bg-white p-6 rounded-lg shadow max-w-5xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">Manage Menu (Mocked)</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Item Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Price"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Category"
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Description"
          value={newItem.description}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
          className="border p-2 rounded w-full col-span-2"
        />
        <button
          onClick={handleAddMenuItem}
          className="bg-green-500 text-white px-4 py-2 rounded w-full"
        >
          Add Item
        </button>
      </div>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <ul className="space-y-4">
        {menuItems.map((item, index) => (
          <li key={item.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
              <input
                type="text"
                value={item.name}
                onChange={(e) => {
                  const updated = [...menuItems];
                  updated[index].name = e.target.value;
                  setMenuItems(updated);
                }}
                className="border p-2 rounded w-full"
              />
              <input
                type="number"
                value={item.price}
                onChange={(e) => {
                  const updated = [...menuItems];
                  updated[index].price = e.target.value;
                  setMenuItems(updated);
                }}
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                value={item.category}
                onChange={(e) => {
                  const updated = [...menuItems];
                  updated[index].category = e.target.value;
                  setMenuItems(updated);
                }}
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                value={item.description}
                onChange={(e) => {
                  const updated = [...menuItems];
                  updated[index].description = e.target.value;
                  setMenuItems(updated);
                }}
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleUpdateMenuItem(item)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Update
              </button>
              <button
                onClick={() => handleDeleteMenuItem(item.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MenuManagement;
