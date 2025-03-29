import React, { useState } from "react";
import { Utensils, BarChart2, Users, PlusCircle, ClipboardList } from "lucide-react";
import MenuManagement from "../components/ManagerDashboard/MenuManagement";
import Reports from "../components/ManagerDashboard/Reports";
import ManagerRequests from "../components/ManagerDashboard/ManagerRequests";
import ManageAdmins from "../components/ManagerDashboard/manageAdmins";
import AddUser from "../components/ManagerDashboard/AddUser";

const ManagerDashboard = () => {
  const [selectedSection, setSelectedSection] = useState("menu");

  // Mapping sections to their respective components
  const sectionComponents = {
    menu: <MenuManagement />,
    reports: <Reports />,
    requests: <ManagerRequests />,
    manageAdmins: <ManageAdmins />,
    addUser: <AddUser />,
  };

  return (
    <div className="flex h-screen font-sans">
      <aside className="w-64 bg-gray-200 p-6">
        <h2 className="text-2xl font-bold mb-4">Hi, Boss</h2>
        <nav>
          <ul className="space-y-2">
            <li
              className={`flex items-center gap-2 p-2 rounded cursor-pointer ${
                selectedSection === "menu" ? "bg-blue-400 text-white" : "hover:bg-blue-300"
              }`}
              onClick={() => setSelectedSection("menu")}
            >
              <Utensils size={20} /> Menu Management
            </li>
            <li
              className={`flex items-center gap-2 p-2 rounded cursor-pointer ${
                selectedSection === "reports" ? "bg-blue-400 text-white" : "hover:bg-blue-300"
              }`}
              onClick={() => setSelectedSection("reports")}
            >
              <BarChart2 size={20} /> Reports
            </li>
            <li
              className={`flex items-center gap-2 p-2 rounded cursor-pointer ${
                selectedSection === "requests" ? "bg-blue-400 text-white" : "hover:bg-blue-300"
              }`}
              onClick={() => setSelectedSection("requests")}
            >
              <ClipboardList size={20} /> Manager Requests
            </li>
            <li
              className={`flex items-center gap-2 p-2 rounded cursor-pointer ${
                selectedSection === "manageAdmins" ? "bg-blue-400 text-white" : "hover:bg-blue-300"
              }`}
              onClick={() => setSelectedSection("manageAdmins")}
            >
              <Users size={20} /> Manage Admins
            </li>
            <li
              className={`flex items-center gap-2 p-2 rounded cursor-pointer ${
                selectedSection === "addUser" ? "bg-blue-400 text-white" : "hover:bg-blue-300"
              }`}
              onClick={() => setSelectedSection("addUser")}
            >
              <PlusCircle size={20} /> Add User
            </li>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Manager Dashboard</h1>
        {sectionComponents[selectedSection]}
      </main>
    </div>
  );
};

export default ManagerDashboard;
