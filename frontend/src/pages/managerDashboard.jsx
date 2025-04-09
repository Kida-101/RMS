import React, { useState } from "react";
import { Utensils, BarChart2, Users, PlusCircle, ClipboardList, Menu, LogOut } from "lucide-react";
import MenuManagement from "../components/ManagerDashboard/MenuManagement";
import Reports from "../components/ManagerDashboard/Reports";
import ManagerRequests from "../components/ManagerDashboard/ManagerRequests";
import ManageAdmins from "../components/ManagerDashboard/manageAdmins";
import AddUser from "../components/ManagerDashboard/AddUser";

const ManagerDashboard = () => {
    const [toggle, setToggle] = useState(false);
    const [selectedSection, setSelectedSection] = useState("menu");

    const handleMenuClick = (menuItem) => {
        setSelectedSection(menuItem);
    };

    const menuItems = [
        { name: "menu", label: "Menu Management", icon: <Utensils size={20} /> },
        { name: "reports", label: "Reports", icon: <BarChart2 size={20} /> },
        { name: "requests", label: "Manager Requests", icon: <ClipboardList size={20} /> },
        { name: "manageAdmins", label: "Manage Admins", icon: <Users size={20} /> },
        { name: "addUser", label: "Add User", icon: <PlusCircle size={20} /> },
    ];

    const sectionComponents = {
        menu: <MenuManagement />, 
        reports: <Reports />, 
        requests: <ManagerRequests />, 
        manageAdmins: <ManageAdmins />, 
        addUser: <AddUser />,
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            {toggle ? (
                <div className="flex flex-col justify-between w-20 border-r border-gray-300">
                    <div className="flex flex-col bg-white">
                        <button onClick={() => setToggle(!toggle)} className="flex justify-center p-4 text-xl text-black hover:text-blue-700">
                            <Menu size={24} />
                        </button>
                        <div className="flex flex-col space-y-2">
                            {menuItems.map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => handleMenuClick(item.name)}
                                    className={`flex justify-center items-center p-4 text-xl transition-all ${
                                        selectedSection === item.name ? "text-blue-500" : "text-gray-700"
                                    } hover:bg-gray-300`}
                                >
                                    {item.icon}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button className="flex justify-center items-center p-4 text-xl hover:bg-gray-300">
                        <LogOut size={20} />
                    </button>
                </div>
            ) : (
                <div className="flex flex-col justify-between w-60 border-r border-gray-300">
                    <div className="flex flex-col bg-white">
                        <div className="flex items-center justify-between p-4 border-b border-gray-300">
                            <p className="ml-3 text-xl font-semibold">Manager</p>
                            <button onClick={() => setToggle(!toggle)} className="text-xl text-black hover:text-blue-700">
                                <Menu size={24} />
                            </button>
                        </div>
                        <div className="flex flex-col space-y-2">
                            {menuItems.map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => handleMenuClick(item.name)}
                                    className={`flex items-center p-4 text-lg transition-all ${
                                        selectedSection === item.name ? "text-blue-500" : "text-gray-700"
                                    } hover:bg-gray-300`}
                                >
                                    {item.icon} <span className="ml-3">{item.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <button className="flex items-center w-full p-4 text-lg hover:bg-gray-300">
                        <LogOut size={20} className="mr-3" /> Logout
                    </button>
                </div>
            )}

            {/* Main Content Area */}
            <main className="flex-1 p-6">
                <h1 className="text-3xl font-bold mb-6">Manager Dashboard</h1>
                {sectionComponents[selectedSection]} 
            </main>
        </div>
    );
};

export default ManagerDashboard;
