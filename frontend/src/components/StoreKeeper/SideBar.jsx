import React from "react";
import {
  FaBoxOpen,
  FaTruckLoading,
  FaExclamationTriangle,
  FaClipboardList,
  FaUserTie,
  FaChartLine,
} from "react-icons/fa";

const SideBar = ({ setActiveComponent, activeComponent }) => {
  const menuItems = [
    { name: "ReceiveRequest", icon: <FaBoxOpen />, label: "Provide Stock" },
    { name: "RequestStock", icon: <FaTruckLoading />, label: "Request Stock" },
    {
      name: "TrackStock",
      icon: <FaExclamationTriangle />,
      label: "Track Stock",
    },
    { name: "StockInfo", icon: <FaClipboardList />, label: "Stock Info" },
    { name: "SupplierInfo", icon: <FaUserTie />, label: "Supplier Info" },
    { name: "ReportAnalysis", icon: <FaChartLine />, label: "Report Analysis" },
  ];

  return (
    <aside className="  w-16 md:w-64 bg-white p-2 md:p-6 shadow-lg fixed h-full transition-all duration-300">
      {/* Title - Hidden on small screens */}
      <h2 className=" sm:block text-sm  md:text-xl lg:text-2xl font-semibold mb-4 p-2">
        Store Keeper
      </h2>
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={`p-5 flex items-center text-md font-medium space-x-3 cursor-pointer  rounded-lg transition-colors ${
                activeComponent === item.name
                  ? "bg-[#3447AA] text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => setActiveComponent(item.name)}
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
              {/* Label - Hidden on small screens */}
              <span className="hidden md:block">{item.label}</span>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
