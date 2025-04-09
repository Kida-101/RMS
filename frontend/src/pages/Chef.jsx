import React, { useState } from "react";
import SideBarForChef from "../components/Chef/SideBarForChef";
import ReceiveAssigned from "../components/Chef/ReceiveAssigned";
import ReportServed from "../components/Chef/ReportServed";
import ChefHistory from "../components/Chef/ChefHistory";
import RequestItem from "../components/Chef/RequestItem";

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
  const [categoryStructure, setCategoryStructure] = useState({
    Food: {
      items: [
        "Rice",
        "Pasta",
        "Bread",
        "Sugar",
        "Salt",
        "Oil",
        "Meat",
        "Seafood",
        "Vegetables",
        "Fruits",
        "Dairy Products",
        "Eggs",
        "Baking Products",
        "Spices & Condiments",
      ],
      units: {
        Rice: "kg",
        Pasta: "kg",
        Bread: "pieces",
        Sugar: "kg",
        Salt: "kg",
        Oil: "liters",
        Eggs: "pieces",
      },
      subcategories: {
        Vegetables: {
          items: [
            "Tomato",
            "Onion",
            "Carrot",
            "Potato",
            "Cabbage",
            "Garlic",
            "Pepper",
            "Spinach",
          ],
          units: {
            Tomato: "kg",
            Onion: "kg",
            Carrot: "kg",
            Potato: "kg",
            Cabbage: "pieces",
            Garlic: "kg",
            Pepper: "kg",
            Spinach: "bunch",
          },
        },
        Fruits: {
          items: [
            "Banana",
            "Apple",
            "Orange",
            "Grapes",
            "Watermelon",
            "Mango",
            "Pineapple",
          ],
          units: {
            Banana: "kg",
            Apple: "kg",
            Orange: "kg",
            Grapes: "kg",
            Mango: "kg",
            Watermelon: "pieces",
            Pineapple: "pieces",
          },
        },
        Meat: {
          items: ["Chicken", "Beef", "Pork", "Lamb", "Turkey"],
          units: {
            Chicken: "kg",
            Beef: "kg",
            Pork: "kg",
            Lamb: "kg",
            Turkey: "kg",
          },
        },
        Seafood: {
          items: ["Fish", "Shrimp", "Crab", "Lobster", "Squid"],
          units: {
            Fish: "kg",
            Shrimp: "kg",
            Crab: "kg",
            Lobster: "kg",
            Squid: "kg",
          },
        },
        "Dairy Products": {
          items: ["Milk", "Cheese", "Butter", "Yogurt"],
          units: {
            Milk: "liters",
            Cheese: "kg",
            Butter: "kg",
            Yogurt: "liters",
          },
        },
        "Baking Products": {
          items: ["Flour", "Yeast", "Baking Powder", "Butter"],
          units: {
            Flour: "kg",
            Yeast: "grams",
            "Baking Powder": "grams",
            Butter: "kg",
          },
        },
        "Spices & Condiments": {
          items: [
            "Salt",
            "Black Pepper",
            "Chili Powder",
            "Vinegar",
            "Soy Sauce",
          ],
          units: {
            Salt: "kg",
            "Black Pepper": "grams",
            "Chili Powder": "grams",
            Vinegar: "liters",
            "Soy Sauce": "liters",
          },
        },
      },
    },
    Beverages: {
      items: [
        "Water",
        "Juice",
        "Milk",
        "Tea",
        "Coffee",
        "Soft Drinks",
        "Alcohol",
      ],
      units: {
        Water: "liters",
        Juice: "liters",
        Milk: "liters",
        Tea: "grams",
        Coffee: "grams",
        "Soft Drinks": "bottles",
        Alcohol: "bottles",
      },
      subcategories: {
        Water: {
          items: [
            "1 liter",
            "0.5 liter",
            "2 liters",
            "5 liters",
            "10 liters",
            "20 liters",
            "1.5 liters",
          ],
          units: {
            "1 liter": "liters",
            "0.5 liter": "liters",
            "2 liters": "liters",
            "5 liters": "liters",
            "10 liters": "liters",
            "20 liters": "liters",
            "1.5 liters": "liters",
          },
        },
        Juice: {
          items: ["Orange Juice", "Apple Juice", "Grape Juice", "Mixed Juice"],
          units: {
            "Orange Juice": "liters",
            "Apple Juice": "liters",
            "Grape Juice": "liters",
            "Mixed Juice": "liters",
          },
        },
        "Soft Drinks": {
          items: [
            "Cola",
            "Lemonade",
            "Energy Drink",
            "Orange Soda",
            "Ginger Ale",
            "Sprite",
            "Pepsi",
            "Root Beer",
            "Tonic Water",
            "Fanta",
            "Diet Cola",
          ],
          units: {
            Cola: "bottles",
            Lemonade: "bottles",
            "Energy Drink": "bottles",
            "Orange Soda": "bottles",
            "Ginger Ale": "bottles",
            Sprite: "bottles",
            Pepsi: "bottles",
            "Root Beer": "bottles",
            "Tonic Water": "bottles",
            Fanta: "bottles",
            "Diet Cola": "bottles",
          },
        },
        Alcohol: {
          items: [
            "St. George Beer",
            "Meta Beer",
            "Bedele Beer",
            "Dashen Beer",
            "Harar Beer",
            "Walia Beer",
            "Habesha Beer",
            "Raya Beer",
            "Bedele Special Beer",
            "Meta Premium",
            "St. George Amber Beer",
            "Hakim Stout",
            "Garden Bräu Ebony",
            "Garden Bräu Blondy",
            "Castel Beer",
            "Cabernet Sauvignon Wine",
            "Merlot Wine",
            "Pinot Noir Wine",
            "Chardonnay Wine",
            "Sauvignon Blanc Wine",
            "Zinfandel Wine",
            "Riesling Wine",
            "Malbec Wine",
            "Shiraz Wine",
            "Prosecco Wine",
            "Johnnie Walker Red Label Whiskey",
            "Johnnie Walker Black Label Whiskey",
            "Jameson Irish Whiskey",
            "Chivas Regal 12 Year Old Whiskey",
            "Glenfiddich 12 Year Old Whiskey",
            "Jack Daniel's Whiskey",
            "The Macallan 12 Year Old Whiskey",
            "Bushmills Original Whiskey",
            "Talisker 10 Year Old Whiskey",
            "Aberlour A'Bunadh Whiskey",
            "Smirnoff Vodka",
            "Grey Goose Vodka",
            "Absolut Vodka",
            "Belvedere Vodka",
            "Tito's Handmade Vodka",
            "Skyy Vodka",
            "Ciroc Vodka",
            "Stolichnaya Vodka",
            "Ketel One Vodka",
            "Finlandia Vodka",
            "Rum",
          ],
          units: {
            "St. George Beer": "bottles",
            "Meta Beer": "bottles",
            "Bedele Beer": "bottles",
            "Dashen Beer": "bottles",
            "Harar Beer": "bottles",
            "Walia Beer": "bottles",
            "Habesha Beer": "bottles",
            "Raya Beer": "bottles",
            "Bedele Special Beer": "bottles",
            "Meta Premium": "bottles",
            "St. George Amber Beer": "bottles",
            "Hakim Stout": "bottles",
            "Garden Bräu Ebony": "bottles",
            "Garden Bräu Blondy": "bottles",
            "Castel Beer": "bottles",
            "Cabernet Sauvignon Wine": "bottles",
            "Merlot Wine": "bottles",
            "Pinot Noir Wine": "bottles",
            "Chardonnay Wine": "bottles",
            "Sauvignon Blanc Wine": "bottles",
            "Zinfandel Wine": "bottles",
            "Riesling Wine": "bottles",
            "Malbec Wine": "bottles",
            "Shiraz Wine": "bottles",
            "Prosecco Wine": "bottles",
            "Johnnie Walker Red Label Whiskey": "bottles",
            "Johnnie Walker Black Label Whiskey": "bottles",
            "Jameson Irish Whiskey": "bottles",
            "Chivas Regal 12 Year Old Whiskey": "bottles",
            "Glenfiddich 12 Year Old Whiskey": "bottles",
            "Jack Daniel's Whiskey": "bottles",
            "The Macallan 12 Year Old Whiskey": "bottles",
            "Bushmills Original Whiskey": "bottles",
            "Talisker 10 Year Old Whiskey": "bottles",
            "Aberlour A'Bunadh Whiskey": "bottles",
            "Smirnoff Vodka": "bottles",
            "Grey Goose Vodka": "bottles",
            "Absolut Vodka": "bottles",
            "Belvedere Vodka": "bottles",
            "Tito's Handmade Vodka": "bottles",
            "Skyy Vodka": "bottles",
            "Ciroc Vodka": "bottles",
            "Stolichnaya Vodka": "bottles",
            "Ketel One Vodka": "bottles",
            "Finlandia Vodka": "bottles",
            Rum: "bottles",
          },
        },
      },
    },
    Cleaning: {
      items: ["Detergent", "Soap", "Sanitizer", "Bleach"],
      units: {
        Detergent: "liters",
        Soap: "bars",
        Sanitizer: "ml",
        Bleach: "liters",
      },
    },
    Utensils: {
      items: ["Plates", "Spoons", "Cups", "Knives", "Forks"],
      units: {
        Plates: "pieces",
        Spoons: "pieces",
        Cups: "pieces",
        Knives: "pieces",
        Forks: "pieces",
      },
    },
    Miscellaneous: {
      items: ["Batteries", "Stationery"],
      units: {
        Batteries: "pieces",
        Stationery: "packs",
      },
    },
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
      case "RequestItem":
        return <RequestItem categoryStructure={categoryStructure} />;
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
      <main className="flex-1 p-6 ">{renderComponent()}</main>
    </div>
  );
};
export default Chef;
