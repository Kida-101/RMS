import React, { useState } from "react";
import {
  FaSignOutAlt,
  FaTruckLoading,
  FaClipboardCheck,
  FaHistory,
} from "react-icons/fa";
import { MdDinnerDining } from "react-icons/md";
import logo from "../../assets/logo.png";

const SideBarForChef = ({ setActiveComponent, activeComponent, onLogout }) => {
  const [toggle, setToggle] = useState(false);

  const menuItems = [
    {
      name: "ReceiveAssigned",
      icon: <FaClipboardCheck />,
      label: "Receive assigned",
    },
    {
      name: "ReportServed",
      icon: <MdDinnerDining />,
      label: "Report served",
    },
    { name: "ChefHistory", icon: <FaHistory />, label: "My History" },
    { name: "RequestItem", icon: <FaTruckLoading />, label: "Request Stock" },
    { name: "logout", icon: <FaSignOutAlt />, label: "Logout" },
  ];

  const handleClick = (name) => {
    if (name === "logout") {
      onLogout();
    } else {
      setActiveComponent(name);
    }
  };

  return toggle ? (
    <div className="flex flex-col w-20 h-[97vh] border-r border-gray-300">
      {/* Minimized Menu */}
      <div className="flex flex-col bg-white">
        <div className="flex items-center justify-between p-4 border-b border-gray-300">
          <div className="min-w-[41px] min-h-[41px]">
            <img
              src={logo}
              alt="logo"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
          <button
            onClick={() => setToggle(!toggle)}
            className="text-xl text-black hover:text-blue-700"
          >
            <i className="fa-sharp fa-solid fa-bars"></i>
          </button>
        </div>

        <div className="flex flex-col">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleClick(item.name)}
              className={`flex justify-center items-center p-4 text-xl transition-all ${
                activeComponent === item.name
                  ? "text-blue-500"
                  : "text-gray-700"
              } hover:bg-gray-300`}
            >
              {item.icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col w-60 h-[97vh] border-r border-gray-300">
      {/* Maximized Menu */}
      <div className="flex flex-col bg-white">
        <div className="flex items-center justify-between p-4 border-b border-gray-300">
          <div className="min-w-[41px] min-h-[41px]">
            <img
              src={logo}
              alt="logo"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
          <p className="ml-3 text-xl font-semibold">Chef</p>
          <button
            onClick={() => setToggle(!toggle)}
            className="text-xl text-black hover:text-blue-700"
          >
            <i className="fa-sharp fa-solid fa-bars"></i>
          </button>
        </div>

        <div className="flex flex-col">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleClick(item.name)}
              className={`flex items-center p-4 text-lg transition-all ${
                activeComponent === item.name
                  ? "text-blue-500"
                  : "text-gray-700"
              } hover:bg-gray-300`}
            >
              <span className="mr-3">{item.icon}</span> {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBarForChef;
