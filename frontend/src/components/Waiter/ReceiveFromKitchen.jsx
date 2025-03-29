import React, { useState, useEffect } from "react";

const ReceiveFromKitchen = () => {
  const [readyOrders, setReadyOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulating fetching data from backend
    const fetchReadyOrders = () => {
      setTimeout(() => {
        const dummyData = [
          { id: 1, tableNumber: 3, foodItem: "Pasta" },
          { id: 2, tableNumber: 5, foodItem: "Salad" },
          { id: 3, tableNumber: 2, foodItem: "Steak" },
        ];
        setReadyOrders(dummyData);
        setLoading(false);
      }, 1000);
    };

    fetchReadyOrders();
  }, []);

  const receiveOrder = async (orderId) => {
    try {
      setReadyOrders(readyOrders.filter((order) => order.id !== orderId));
      alert(`Order ${orderId} received and ready to be served!`);
    } catch (err) {
      alert("Error receiving order: " + err.message);
    }
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Receive Orders from Kitchen</h2>
      <ul>
        {readyOrders.length === 0 ? (
          <p>No ready orders</p>
        ) : (
          readyOrders.map((order) => (
            <li key={order.id} className="mb-2 p-2 border flex justify-between">
              {order.foodItem} (Table {order.tableNumber})
              <button
                onClick={() => receiveOrder(order.id)}
                className="bg-green-500 text-white p-1 rounded"
              >
                Receive
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ReceiveFromKitchen;
