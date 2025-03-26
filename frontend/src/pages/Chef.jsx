import React, { useState } from "react";
import SideBarForChef from "../components/Chef/SideBarForChef";
import ReceiveAssigned from "../components/Chef/ReceiveAssigned";
import ReportServed from "../components/Chef/ReportServed";
import ChefHistory from "../components/Chef/ChefHistory";

const Chef = () => {
  const [activeComponent, setActiveComponent] = useState("ReceiveAssigned");

  // Complete sample data with all order states
  const [orders, setOrders] = useState({
    assigned: [
      {
        id: 1,
        tableNumber: 5,
        assignedTime: new Date().toLocaleTimeString(),
        items: [
          { name: "Margherita Pizza", quantity: 2 },
          { name: "Caesar Salad", quantity: 1 },
          { name: "Garlic Bread", quantity: 3 },
        ],
      },
      {
        id: 2,
        tableNumber: 8,
        assignedTime: new Date(Date.now() + 15 * 60000).toLocaleTimeString(),
        items: [
          { name: "Spaghetti Carbonara", quantity: 2 },
          { name: "Grilled Salmon", quantity: 3 },
        ],
      },
    ],
    inProgress: [
      {
        id: 3,
        tableNumber: 3,
        startedCooking: new Date(Date.now() - 30 * 60000).toLocaleTimeString(),
        items: [
          { name: "Chicken Curry", quantity: 2 },
          { name: "Naan Bread", quantity: 4 },
        ],
      },
    ],
    served: [
      {
        id: 4,
        tableNumber: 12,
        servedTime: new Date(Date.now() - 86400000).toISOString(),
        items: [
          { name: "Beef Burger", quantity: 4 },
          { name: "French Fries", quantity: 4 },
        ],
        chef: "Chef John",
      },
      {
        id: 5,
        tableNumber: 7,
        servedTime: new Date().toISOString(),
        items: [{ name: "Vegetable Lasagna", quantity: 2 }],
        chef: "Chef Maria",
      },
    ],
  });

  const handleStartCooking = (orderId) => {
    const orderToMove = orders.assigned.find((order) => order.id === orderId);
    setOrders((prev) => ({
      assigned: prev.assigned.filter((order) => order.id !== orderId),
      inProgress: [
        ...prev.inProgress,
        {
          ...orderToMove,
          startedCooking: new Date().toLocaleTimeString(),
        },
      ],
      served: prev.served,
    }));
  };

  const handleMarkAsServed = (orderId) => {
    const orderToMove = orders.inProgress.find((order) => order.id === orderId);
    setOrders((prev) => ({
      assigned: prev.assigned,
      inProgress: prev.inProgress.filter((order) => order.id !== orderId),
      served: [
        ...prev.served,
        {
          ...orderToMove,
          servedTime: new Date().toISOString(),
          chef: "Current Chef",
        },
      ],
    }));
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "ReceiveAssigned":
        return (
          <ReceiveAssigned
            orders={orders.assigned}
            onStartCooking={handleStartCooking}
          />
        );
      case "ReportServed":
        return (
          <ReportServed
            orders={orders.inProgress}
            onMarkAsServed={handleMarkAsServed}
          />
        );
      case "ChefHistory":
        return <ChefHistory orders={orders.served} />;
      default:
        return (
          <ReceiveAssigned
            orders={orders.assigned}
            onStartCooking={handleStartCooking}
          />
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideBarForChef
        setActiveComponent={setActiveComponent}
        activeComponent={activeComponent}
        onLogout={() => console.log("Logged out")}
      />
      <main className="flex-1 p-6 ml-16 md:ml-64">{renderComponent()}</main>
    </div>
  );
};
export default Chef;
