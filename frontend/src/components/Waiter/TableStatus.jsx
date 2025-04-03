import React, { useState } from "react";

const TableStatusCheck = () => {
  const [tables, setTables] = useState([
    { id: 1, seats: 4, booked: true },
    { id: 2, seats: 2, booked: false },
    { id: 3, seats: 6, booked: false },
    { id: 4, seats: 4, booked: true },
  ]);
  const [tableNumber, setTableNumber] = useState("");
  const [reservationStatus, setReservationStatus] = useState(null);

  const checkReservation = () => {
    if (!tableNumber) {
      alert("Please enter a table number.");
      return;
    }
    const table = tables.find((t) => t.id === parseInt(tableNumber));
    if (table) {
      setReservationStatus(table.booked ? "Reserved" : "Available");
    } else {
      setReservationStatus("Table not found");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Table Status</h2>
      <div className="mb-4">
        <input
          type="number"
          placeholder="Enter Table Number"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={checkReservation} className="bg-blue-500 text-white p-2 rounded">
          Check Reservation
        </button>
      </div>
      {reservationStatus && <p className="text-lg font-bold">Status: {reservationStatus}</p>}
      <h3 className="text-lg font-bold mt-4">All Tables</h3>
      <ul>
        {tables.map((table) => (
          <li key={table.id} className="mb-2 p-2 border">
            Table {table.id} - {table.booked ? "Occupied" : "Free"} | Seats: {table.seats}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableStatusCheck;
