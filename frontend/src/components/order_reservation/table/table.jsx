import React, { useState } from "react";

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

const TableBooking = ({ sendTableToParent }) => {
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
    if (sendTableToParent) {
      sendTableToParent(selectedTables);
      console.log("Table Data sent to parent:", selectedTables);
    } else {
      console.error("sendTableToParent is not defined!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200/40 rounded-lg">
      <div className="shadow-lg px-16 py-4 md:px-16 md:py-10 space-y-8 w-full max-w-4xl rounded-lg">
        <h1 className="text-green-600 text-4xl font-extrabold text-center">
          Table Booking
        </h1>
        <hr className="w-[100%] h-0.5 bg-gray-300 mx-auto border-none" />
        <div className="flex flex-wrap justify-center gap-20 text-center">
          <div className="bg-red-500 text-white px-5 py-1 rounded-[5px] shadow-md">
            Booked
          </div>
          <div className="bg-green-500 text-white px-5 py-1 rounded-[5px]  shadow-md">
            Available
          </div>
        </div>

        <hr className="w-[100%] h-0.5 bg-gray-300 mx-auto border-none" />
        <div className="flex flex-wrap justify-center gap-12">
          {tables.map((table) => (
            <div
              key={table.id}
              className={`w-22 h-22 flex items-center justify-center rounded-md font-bold cursor-pointer transition-transform transform hover:scale-110 
                ${
                  table.booked
                    ? "bg-[#FF0000] text-white cursor-not-allowed"
                    : "bg-green-500 text-white"
                } 
                ${
                  selectedTables.includes(table.id)
                    ? "bg-yellow-300 text-black"
                    : ""
                }`}
              onClick={() => handleTableClick(table)}
            >
              Table {table.id} <br /> Seats: {table.seats}
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={confirmBooking}
            disabled={selectedTables.length === 0}
            className="mt-6 px-8 py-4 text-lg bg-blue-500 text-white rounded-md shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableBooking;
