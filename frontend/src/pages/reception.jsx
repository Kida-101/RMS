import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

const Reception = () => {
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
  const [search, setSearch] = useState("");
  const [bookings, setBookings] = useState([
    {
      id: 1,
      fullName: "John Doe",
      phone: "123-456-7890",
      email: "john@gmail.com",
      date: new Date(),
      arrivalTime: "18:00",
      endTime: "19:00",
      menu: "Italian Special",
      table: null,
      requests: [],
      status: "Pending",
    },
    {
      id: 2,
      fullName: "Alice Smith",
      phone: "987-654-3210",
      email: "alice@gmail.com",
      date: new Date(),
      arrivalTime: "19:00",
      endTime: "19:00",
      menu: "Vegan Delight",
      table: 5,
      requests: ["Extra napkins"],
      status: "Seated",
    },
    {
      id: 3,
      fullName: "Alice Smith",
      phone: "987-654-3210",
      email: "alice@gmail.com",
      date: new Date(),
      arrivalTime: "19:00",
      endTime: "19:00",
      menu: "Vegan Delight",
      table: 5,
      requests: ["Extra napkins"],
      status: "Seated",
    },
    {
      id: 4,
      fullName: "Alice Smith",
      phone: "987-654-3210",
      email: "alice@gmail.com",
      date: new Date(),
      arrivalTime: "19:00",
      endTime: "19:00",
      menu: "Vegan Delight",
      table: 5,
      requests: ["Extra napkins"],
      status: "Seated",
    },
    {
      id: 5,
      fullName: "Alice Smith",
      phone: "987-654-3210",
      email: "alice@gmail.com",
      date: new Date(),
      arrivalTime: "19:00",
      endTime: "19:00",
      menu: "Vegan Delight",
      table: 5,
      requests: ["Extra napkins"],
      status: "Seated",
    },
    {
      id: 6,
      fullName: "Alice Smith",
      phone: "987-654-3210",
      email: "alice@gmail.com",
      date: new Date(),
      arrivalTime: "19:00",
      endTime: "19:00",
      menu: "Vegan Delight",
      table: 5,
      requests: ["Extra napkins"],
      status: "Seated",
    },
  ]);

  // const [newFullName, setNewFullName] = useState("");
  // const [newPhone, setNewPhone] = useState("");
  // const [newEmail, setNewEmail] = useState("");
  // const [newDate, setNewDate] = useState("");
  // const [newArrivalTime, setNewArrivalTime] = useState("");
  // const [newMenu, setNewMenu] = useState("");
  // const [newTable, setNewTable] = useState("");
  const [newRequest, setNewRequest] = useState("");

  // const handleAddBooking = () => {
  //   if (
  //     !newFullName ||
  //     !newPhone ||
  //     !newEmail ||
  //     !newDate ||
  //     !newArrivalTime ||
  //     !newMenu
  //   ) {
  //     toast.error("Please fill in all fields.");
  //     return;
  //   }

  //   const newBooking = {
  //     id: bookings.length + 1,
  //     fullName: newFullName,
  //     phone: newPhone,
  //     email: newEmail,
  //     date: new Date(newDate),
  //     arrivalTime: newArrivalTime,
  //     menu: newMenu,
  //     table: newTable || null,
  //     requests: newRequest ? [newRequest] : [],
  //     status: "Pending",
  //   };

  //   setBookings([...bookings, newBooking]);
  //   setNewFullName("");
  //   setNewPhone("");
  //   setNewEmail("");
  //   setNewDate("");
  //   setNewArrivalTime("");
  //   setNewMenu("");
  //   setNewTable("");
  //   setNewRequest("");
  //   setIsBookingModalOpen(false); // This line is correct and should close the modal
  //   alert("New Booking Added!");
  // };

  const [editingTableId, setEditingTableId] = useState(null);
  const [customTable, setCustomTable] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const startEditingTable = (booking) => {
    setEditingTableId(booking.id);
    setCustomTable(booking.table || "");
  };

  const saveTableNumber = (id) => {
    if (!customTable.trim()) return;
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, table: customTable, status: "Seated" } : b
      )
    );
    alert(`Table ${customTable} Assigned!`);
    setEditingTableId(null);
    setCustomTable("");
  };

  const openRequestModal = (booking) => {
    setSelectedBooking(booking);
    setIsRequestModalOpen(true);
  };

  const closeRequestModal = () => {
    setIsRequestModalOpen(false);
    setNewRequest("");
  };

  const handleAddRequest = () => {
    if (!newRequest.trim()) return;
    setBookings((prev) =>
      prev.map((b) =>
        b.id === selectedBooking.id
          ? { ...b, requests: [...b.requests, newRequest] }
          : b
      )
    );
    //   toast.success("Request Added!");
    alert("Request Added!");
    closeRequestModal();
  };

  const cancelBooking = (id) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
    alert("Booking Cancelled!");
    // toast.error("Booking Cancelled!");
  };

  return (
    <div
      className="w-full mx-auto p-6 min-h-screen md:flex-row min-h-screen bg-cover bg-center bg-black/80 bg-blend-darken font-[Poppins]"
      style={{
        backgroundImage: "url('../../src/assets/food-bg/55.jfif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h2 className="text-green-600 text-center text-6xl font-bold mb-4">
        Reception Dashboard
      </h2>
      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search Customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-white/50 bg-transparent p-3 w-full rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/50 transition"
        />
        <button
          onClick={() => setIsBookingModalOpen(true)}
          className="bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold px-4 py-3 rounded-lg shadow-lg hover:scale-105 transition"
        >
          Book Table
        </button>
      </div>

      <table className="w-full bg-white shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="p-3">Name</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Email</th>
            <th className="p-3">Date</th>
            <th className="p-3">Arrival Time</th>
            <th className="p-3">End Time</th>
            <th className="p-3">Table</th>
            <th className="p-3">Requests</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings
            .filter((b) =>
              b.fullName.toLowerCase().includes(search.toLowerCase())
            )
            .map((booking) => (
              <tr key={booking.id} className="border-b text-center">
                <td className="p-3">{booking.fullName}</td>
                <td className="p-3">{booking.phone}</td>
                <td className="p-3">{booking.email}</td>
                <td className="p-3">{booking.date.toDateString()}</td>
                <td className="p-3">{booking.arrivalTime}</td>
                <td className="p-3">{booking.endTime}</td>
                <td className="p-3">
                  {editingTableId === booking.id ? (
                    <select
                      value={customTable}
                      onChange={(e) => setCustomTable(e.target.value)}
                      className="border p-1 rounded"
                    >
                      <option value="">Select Table</option>
                      {tablesData
                        .filter((table) => !table.booked)
                        .map((table) => (
                          <option key={table.id} value={table.id}>
                            Table {table.id} ({table.seats} seats)
                          </option>
                        ))}
                    </select>
                  ) : booking.table ? (
                    `Table ${booking.table}`
                  ) : (
                    "Not Seated"
                  )}
                </td>
                <td className="p-3">
                  {booking.requests.length > 0
                    ? booking.requests.join(", ")
                    : "None"}
                </td>
                <td className="p-3">
                  <div className="flex gap-2 justify-center">
                    {editingTableId === booking.id ? (
                      <>
                        <button
                          onClick={() => saveTableNumber(booking.id)}
                          className="bg-green-500 text-white px-2 py-1 rounded-lg"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingTableId(null)}
                          className="bg-gray-500 text-white px-2 py-1 rounded-lg"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => startEditingTable(booking)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded-lg"
                      >
                        Edit Table
                      </button>
                    )}
                    <button
                      onClick={() => openRequestModal(booking)}
                      className="bg-blue-500 text-white px-4 py-1 rounded-lg"
                    >
                      Add Request
                    </button>
                    <button
                      onClick={() => cancelBooking(booking.id)}
                      className="bg-red-500 text-white px-4 py-1 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {isBookingModalOpen && (
        <div className="fixed pt-30 top-0 left-0 right-0 bottom-0 flex items-center justify-center overflow-y-auto backdrop-blur-md bg-black/30 z-50 p-4">
          <div
            className="rounded-lg shadow-lg w-full max-w-4xl p-6 space-y-8 mt-10 mb-10 bg-cover bg-center bg-black/80 bg-blend-darken font-[Poppins]"
            style={{
              backgroundImage: "url('../../src/assets/food-bg/55.jfif')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h1 className="text-green-600 text-5xl font-extrabold text-center">
              Table Booking
            </h1>
            <div className="flex flex-wrap justify-center gap-6">
              {tables.map((table) => (
                <div
                  key={table.id}
                  className={`w-28 h-28 flex flex-col items-center justify-center rounded-md font-bold cursor-pointer transition-transform hover:scale-110 
              ${
                table.booked
                  ? "bg-red-500 text-white cursor-not-allowed"
                  : "bg-green-500 text-white"
              } 
              ${
                selectedTables.includes(table.id)
                  ? "bg-yellow-300 text-black"
                  : ""
              }`}
                  onClick={() => handleTableClick(table)}
                >
                  Table {table.id}
                  <br />
                  Seats: {table.seats}
                </div>
              ))}
            </div>

            <div className="text-center space-y-4">
              <button
                onClick={() => setIsBookingModalOpen(false)}
                className="mt-6 px-8 py-4 mr-5 text-lg bg-blue-500 text-white rounded-md shadow-md"
              >
                Cancel
              </button>
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
      )}

      {isRequestModalOpen && (
        <div
          className={`fixed inset-0 flex items-center justify-center bg-opacity-90 ${
            isRequestModalOpen ? "backdrop-blur-md shadow-xl" : ""
          }`}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 z-10">
            <h2 className="text-xl font-bold mb-4">
              Add Request for {selectedBooking.fullName}
            </h2>
            <input
              type="text"
              placeholder="Enter request..."
              value={newRequest}
              onChange={(e) => setNewRequest(e.target.value)}
              className="border p-2 w-full rounded-lg mb-4 border-black focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-500/50 placeholder-gray-500 focus:placeholder-gray-500  transition-all text-white focus:text-black"
            />
            <div className="flex justify-end">
              <button
                onClick={closeRequestModal}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleAddRequest}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reception;
