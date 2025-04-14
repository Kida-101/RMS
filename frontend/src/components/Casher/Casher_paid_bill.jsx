import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Casher_paid_bill() {
  const [filter, setFilter] = useState('All');
  const [bills, setBills] = useState([]);
  const [error, setError] = useState(null); // Error state for feedback
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch the data from the backend API
  useEffect(() => {
    const fetchBills = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error state before fetching

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/casher/paid_bill/PaidBill`);
        const data = response.data;
        setBills(data); // Correctly update bills state
      } catch (error) {
        console.error('Error fetching bills:', error);
        setError('Failed to fetch bills. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBills(); // Call the function to fetch the data
  }, []); // Empty dependency array to run the effect only once on mount

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Filter the bills based on the selected filter
  const filteredBills = filter === 'All' ? bills : bills.filter((bill) => bill.order_type.toLowerCase() === filter);

  return (
    <div className="p-5 bg-gray-100 mt-4 mb-0 overflow-y-auto min-h-screen">
      {/* Dropdown Filter */}
      <div className="flex justify-end items-center mb-6">
        <label htmlFor="filter" className="text-lg font-medium text-gray-700 mr-3">
          Filter by:
        </label>
        <select
          id="filter"
          value={filter}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-md text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All</option>
          <option value="online">Online</option>
          <option value="onsite">Onsite</option>
          <option value="third-party">Third-Party</option>
        </select>
      </div>

      {/* Loading and Error Handling */}
      {loading && <div className="text-center text-lg text-gray-700">Loading bills...</div>}
      {error && <div className="text-center text-lg text-red-500">{error}</div>}

      {/* Bills List */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBills.length > 0 ? (
            filteredBills.map((bill, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Bill Details</h2>
                <ul className="list-none space-y-2">
                  <li className="text-gray-600">
                    <strong>Table:</strong> {bill.table}
                  </li>
                  <li className="text-gray-600">
                    <strong>Order Type:</strong> {bill.order_type}
                  </li>
                  <li className="text-gray-600">
                    <strong>Food Items:</strong> {bill.food_items}
                  </li>
                  <li className="text-gray-600">
                    <strong>Total Amount:</strong> {bill.total_amount} Birr
                  </li>
                  <li className="text-gray-600">
                    <strong>Payment Time:</strong> {bill.payment_time}
                  </li>
                  <li className="text-gray-600">
                    <strong>Payment Method:</strong> {bill.payment_method}
                  </li>
                  <li className="text-gray-600">
                    <strong>Payer:</strong> {bill.payer}
                  </li>
                </ul>
              </div>
            ))
          ) : (
            <div className="text-center text-lg text-gray-700">No bills found for the selected filter.</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Casher_paid_bill;
