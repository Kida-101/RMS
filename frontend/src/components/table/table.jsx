import React, { useState } from "react";
import "./table.css";

const tablesData = [
  { id: 1, seats: 4, booked: false },
  { id: 2, seats: 2, booked: true },
  { id: 3, seats: 6, booked: false },
  { id: 4, seats: 4, booked: true },
  { id: 5, seats: 2, booked: false },
  { id: 6, seats: 4, booked: true },
  { id: 7, seats: 4, booked: false },
  { id: 8, seats: 4, booked: false },
  { id: 9, seats: 4, booked: true },
  { id: 10, seats: 4, booked: false },
  { id: 11, seats: 4, booked: false },
  { id: 12, seats: 4, booked: false },
  { id: 13, seats: 4, booked: false },
  { id: 14, seats: 4, booked: true },
  { id: 15, seats: 4, booked: false },
];

const TableBooking = () => {
  const [tables, setTables] = useState(tablesData);
  const [selectedTables, setSelectedTables] = useState([]);

  const handleTableClick = (table) => {
    if (table.booked) return;
    setSelectedTables((prev) =>
      prev.includes(table.id)
        ? prev.filter((id) => id !== table.id)
        : [...prev, table.id]
    );
  };

  const confirmBooking = () => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        selectedTables.includes(table.id) ? { ...table, booked: true } : table
      )
    );
    setSelectedTables([]);
  };

  return (
    <div className="table-container">
      <h1
        style={{
          color: "#45a049",
          textAlign: "center",
          fontSize: "40px",
          fontWeight: "bolder",
        }}
      >
        Table Booking
      </h1>

      <hr className="separator-line" />

      <div className="clr-disc">
        <div className="table-booked">
          <p>Booked</p>
        </div>

        <div className="table-available">
          <p>Available</p>
        </div>
      </div>

      <hr className="separator-line" />

      <div className="table-layout">
        {tables.map((table) => (
          <div
            key={table.id}
            className={`table ${table.booked ? "booked" : "available"} ${
              selectedTables.includes(table.id) ? "selected" : ""
            }`}
            onClick={() => handleTableClick(table)}
          >
            Table {table.id} <br /> Seats: {table.seats}
          </div>
        ))}
      </div>
      <button
        onClick={confirmBooking}
        disabled={selectedTables.length === 0}
        className="tbl-btn"
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default TableBooking;
