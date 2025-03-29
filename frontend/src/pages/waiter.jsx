import React, { useState } from "react";
import { FaTable, FaUtensils, FaCheckCircle, FaBars, FaTimes } from "react-icons/fa";
import TableStatusCheck from "../components/Waiter/TableStatus";
import ReceiveFromCustomer from "../components/Waiter/SendToKitchen";
import ReceiveFromKitchen from "../components/Waiter/ReceiveFromKitchen";

const Waiter = () => {
  const [selectedSection, setSelectedSection] = useState("tableStatus");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const sectionComponents = {
    tableStatus: <TableStatusCheck />,
    sendToKitchen: <ReceiveFromCustomer />,
    receiveFromKitchen: <ReceiveFromKitchen />,
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className={`bg-gray-200 p-6 md:h-screen transition-all duration-300 ${sidebarOpen ? "w-64" : "w-0 overflow-hidden"}`}>
        <h2 className={`text-2xl font-bold mb-4 transition-opacity duration-300 ${sidebarOpen ? "opacity-100" : "opacity-0"}`}>Waiter Panel</h2>
        <nav>
          <ul className={`space-y-2 transition-opacity duration-300 ${sidebarOpen ? "opacity-100" : "opacity-0"}`}>
            <li
              className={`flex items-center p-2 rounded cursor-pointer ${
                selectedSection === "tableStatus" ? "bg-blue-400 text-white" : "hover:bg-blue-300"
              }`}
              onClick={() => setSelectedSection("tableStatus")}
            >
              <FaTable className="mr-2" /> Table Status Check
            </li>
            <li
              className={`flex items-center p-2 rounded cursor-pointer ${
                selectedSection === "sendToKitchen" ? "bg-blue-400 text-white" : "hover:bg-blue-300"
              }`}
              onClick={() => setSelectedSection("sendToKitchen")}
            >
              <FaUtensils className="mr-2" /> Send to Kitchen
            </li>
            <li
              className={`flex items-center p-2 rounded cursor-pointer ${
                selectedSection === "receiveFromKitchen" ? "bg-blue-400 text-white" : "hover:bg-blue-300"
              }`}
              onClick={() => setSelectedSection("receiveFromKitchen")}
            >
              <FaCheckCircle className="mr-2" /> Receive from Kitchen
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <button
          className="text-2xl mb-4 p-2 bg-gray-300 rounded-md md:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
        <h1 className="text-3xl font-bold mb-6">Waiter Dashboard</h1>
        {sectionComponents[selectedSection]}
      </main>
    </div>
  );
};

export default Waiter;
