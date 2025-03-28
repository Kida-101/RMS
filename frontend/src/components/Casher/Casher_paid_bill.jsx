import React, { useState } from 'react';

function Casher_paid_bill() {
  const [filter, setFilter] = useState('All');

  const bills = [
    {
      table: '02',
      paidFrom: 'online',
      foodItems: 'Burger, Pizza, Sushi, Pasta, Tacos, Fried Chicken, Salad, Pancakes, Steak, and Ice Cream.',
      totalAmount: '$120.00',
      paymentTime: '2025-03-28 12:30 PM',
      payer: 'Reservation',
    },
    {
      table: '05',
      paidFrom: 'onsite',
      foodItems: 'Pizza, Salad, and Ice Cream.',
      totalAmount: '$45.00',
      paymentTime: '2025-03-28 01:15 PM',
      payer: 'Waiter 011',
    },
    {
      table: '10',
      paidFrom: '3rd party delivery',
      foodItems: 'Burger, Fries, and Soda.',
      totalAmount: '$30.00',
      paymentTime: '2025-03-28 02:00 PM',
      payer: 'BeuDelivery',
    },
    {
      table: '10',
      paidFrom: '3rd party delivery',
      foodItems: 'Burger, Fries, and Soda.',
      totalAmount: '$30.00',
      paymentTime: '2025-03-28 02:00 PM',
      payer: 'BeuDelivery',
    },
    {
      table: '10',
      paidFrom: '3rd party delivery',
      foodItems: 'Burger, Fries, and Soda.',
      totalAmount: '$30.00',
      paymentTime: '2025-03-28 02:00 PM',
      payer: 'BeuDelivery',
    },
    {
      table: '10',
      paidFrom: '3rd party delivery',
      foodItems: 'Burger, Fries, and Soda.',
      totalAmount: '$30.00',
      paymentTime: '2025-03-28 02:00 PM',
      payer: 'BeuDelivery',
    },
    {
      table: '10',
      paidFrom: '3rd party delivery',
      foodItems: 'Burger, Fries, and Soda.',
      totalAmount: '$30.00',
      paymentTime: '2025-03-28 02:00 PM',
      payer: 'BeuDelivery',
    },
    {
      table: '10',
      paidFrom: '3rd party delivery',
      foodItems: 'Burger, Fries, and Soda.',
      totalAmount: '$30.00',
      paymentTime: '2025-03-28 02:00 PM',
      payer: 'BeuDelivery',
    },
    {
      table: '10',
      paidFrom: '3rd party delivery',
      foodItems: 'Burger, Fries, and Soda.',
      totalAmount: '$30.00',
      paymentTime: '2025-03-28 02:00 PM',
      payer: 'BeuDelivery',
    },
    {
      table: '10',
      paidFrom: '3rd party delivery',
      foodItems: 'Burger, Fries, and Soda.',
      totalAmount: '$30.00',
      paymentTime: '2025-03-28 02:00 PM',
      payer: 'BeuDelivery',
    },
    {
      table: '10',
      paidFrom: '3rd party delivery',
      foodItems: 'Burger, Fries, and Soda.',
      totalAmount: '$30.00',
      paymentTime: '2025-03-28 02:00 PM',
      payer: 'BeuDelivery',
    },
  ];

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredBills = filter === 'All' ? bills : bills.filter((bill) => bill.paidFrom === filter);

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
          <option value="3rd party delivery">3rd Party Delivery</option>
        </select>
      </div>

      {/* Bills List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBills.map((bill, index) => (
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
                <strong>Paid From:</strong> {bill.paidFrom}
              </li>
              <li className="text-gray-600">
                <strong>Food Items:</strong> {bill.foodItems}
              </li>
              <li className="text-gray-600">
                <strong>Total Amount:</strong> {bill.totalAmount}
              </li>
              <li className="text-gray-600">
                <strong>Payment Time:</strong> {bill.paymentTime}
              </li>
              <li className="text-gray-600">
                <strong>Payer:</strong> {bill.payer}
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Casher_paid_bill;