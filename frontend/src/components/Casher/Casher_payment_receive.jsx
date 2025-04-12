import React, { useState, useEffect } from 'react';

function Casher_payment_receive() {
  const [unpaidOrders, setUnpaidOrders] = useState([]);

  useEffect(() => {
    const fetchUnpaidOrders = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/casher/casher_payment_receive/unpaid`);
        const data = await response.json();
        setUnpaidOrders(data); // Set the fetched data to state
      } catch (error) {
        console.error('Error fetching unpaid orders:', error);
      }
    };

    fetchUnpaidOrders();
  }, []);

  const handleMarkAsPaid = async (sale_id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/casher/casher_payment_receive/paid`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sale_id }),
      });

      const result = await response.json();
      
      if (response.ok) {
        alert(result.message); // Notify success
        // Optionally, update the state to remove the paid order from the UI
        setUnpaidOrders((prevOrders) =>
          prevOrders.filter((order) => order.sale_id !== sale_id)
        );
      } else {
        alert(result.error); // Handle error
      }
    } catch (error) {
      console.error('Error marking as paid:', error);
    }
  };

  return (
    <div className='Kitchen_Assign_Order_contener grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5 bg-gray-100 max-h-screen overflow-y-auto'>
      {unpaidOrders.length > 0 ? (
        unpaidOrders.map((order) => (
          <div key={order.sale_id} className="single_recived_order w-full bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-101">
            <h2 className="text-lg text-gray-800 font-semibold mb-2">Pending Payment</h2>
            <ul className="list-none p-0">
              <li className="text-gray-600 border-b border-gray-300 py-2">Table: {order.table}</li>
              <li className="text-gray-600 border-b border-gray-300 py-2">Waiter: {order.payer}</li>
              <li className="text-gray-600 border-b border-gray-300 py-2">Food Items: {order.food_items}</li>
              <li className="text-gray-600 py-2">Total Amount: {order.total_amount}</li>
            </ul>
            <button
              onClick={() => handleMarkAsPaid(order.sale_id)}
              className="assign_shafe mt-2 w-full p-2 bg-blue-600 text-white rounded-md transition-all hover:bg-blue-700"
            >
              Mark as Paid
            </button>
          </div>
        ))
      ) : (
        <p>No unpaid orders found for today.</p>
      )}
    </div>
  );
}

export default Casher_payment_receive;
