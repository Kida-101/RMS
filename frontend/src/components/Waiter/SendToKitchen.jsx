import React, { useState } from "react";

const ReceiveFromCustomer = () => {
  const [orders, setOrders] = useState([]);
  const [tableNumber, setTableNumber] = useState("");
  const [foodItem, setFoodItem] = useState("");

  const handleAddOrder = () => {
    if (!tableNumber || !foodItem) {
      alert("Please enter both table number and food item.");
      return;
    }

    const newOrder = {
      id: orders.length + 1,
      tableNumber: parseInt(tableNumber),
      foodItem,
    };

    setOrders([...orders, newOrder]);
    setTableNumber("");
    setFoodItem("");
  };

  const sendToKitchen = (orderId) => {
    setOrders(orders.filter((order) => order.id !== orderId));
    alert(`Order ${orderId} sent to kitchen!`);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Waiter: Receive Order</h2>
      <div className="mb-4">
        <input
          type="number"
          placeholder="Table Number"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Food Item"
          value={foodItem}
          onChange={(e) => setFoodItem(e.target.value)}
          className="border p-2 mr-2"
        />
        <button
          onClick={handleAddOrder}
          className="bg-green-500 text-white p-2 rounded"
        >
          Add Order
        </button>
      </div>

      <h3 className="text-lg font-bold mb-2">Pending Orders</h3>
      <ul>
        {orders.length === 0 ? (
          <p>No orders yet</p>
        ) : (
          orders.map((order) => (
            <li key={order.id} className="mb-2 p-2 border flex justify-between">
              {order.foodItem} (Table {order.tableNumber})
              <button
                onClick={() => sendToKitchen(order.id)}
                className="bg-blue-500 text-white p-1 rounded"
              >
                Send to Kitchen
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ReceiveFromCustomer;
