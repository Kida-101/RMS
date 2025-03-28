import React from "react";
import {
  FaSignOutAlt,
  FaUtensils,
  FaClipboardCheck,
  FaHistory,
} from "react-icons/fa";
import { MdDinnerDining } from "react-icons/md";

const SideBarForChef = ({ setActiveComponent, activeComponent, onLogout }) => {
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
  ];

  const handleClick = (name) => {
    if (name === "logout") {
      onLogout();
    } else {
      setActiveComponent(name);
    }
  };

  return (
    <aside className="w-16 md:w-64 bg-white p-2 md:p-6 shadow-lg fixed h-full transition-all duration-300">
      <div className="flex items-center mb-4 p-2">
        <FaUtensils className="text-[#3447AA] text-xl md:text-2xl mr-2" />
        <h2 className="hidden sm:block text-sm md:text-xl lg:text-2xl font-semibold">
          Chef
        </h2>
      </div>
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={`p-5 md:p-4 flex items-center text-md font-medium space-x-3 cursor-pointer rounded-lg transition-colors ${
                activeComponent === item.name
                  ? "bg-[#3447AA] text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => handleClick(item.name)}
            >
              <span
                className={`text-2xl ${
                  activeComponent === item.name
                    ? "text-white"
                    : "text-[#3447AA]"
                }`}
              >
                {item.icon}
              </span>
              <span className="hidden md:block">{item.label}</span>
            </li>
          ))}

          <li
            className="p-3 md:p-4 flex items-center text-md font-medium space-x-3 cursor-pointer rounded-lg transition-colors hover:bg-gray-200"
            onClick={() => handleClick("logout")}
          >
            <span className="text-xl md:text-2xl text-[#3447AA]">
              <FaSignOutAlt />
            </span>
            <span className="hidden md:block">Logout</span>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideBarForChef;
