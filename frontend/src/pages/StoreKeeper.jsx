import React, { useEffect, useState } from "react";
import ReceiveRequest from "../components/StoreKeeper/ReceiveRequest";
import RequestStock from "../components/StoreKeeper/RequestStock";
import TrackStock from "../components/StoreKeeper/TrackStock";
import StockInfo from "../components/StoreKeeper/StockInfo";
import SupplierInfo from "../components/StoreKeeper/SupplierInfo";
import ReportAnalysis from "../components/StoreKeeper/ReportAnalysis";
import SideBar from "../components/StoreKeeper/SideBar";
import AddStock from "../components/StoreKeeper/AddStock";

function StoreKeeper() {
  const suppliersInfo = [
    {
      id: 1,
      name: "Supplier A",
      address: "123 Main St, City A",
      contacts: ["123-456-7890", "1234567890"],
      stockType: "Electronics",
      email: "john@gmail.com",
    },
    {
      id: 2,
      name: "Supplier B",
      address: "456 Elm St, City B",
      contacts: ["987-654-3210"],
      stockType: "Furniture",
      email: "man@gmail.com",
    },
  ];

  // Stock data
  const [stockData, setStockData] = useState([
    {
      id: 1,
      material: "Resistors 10Ω",
      category: "Electronics",
      quantity: 1200,
      unit: "pcs",
      expiryDate: "2025-12-31",
      status: "normal",
      time: "2023-05-10",
    },
    {
      id: 2,
      material: "Capacitors 100µF",
      category: "Electronics",
      quantity: 10,
      unit: "pcs",
      expiryDate: "2024-06-30",
      status: "low",
      time: "2023-06-15",
    },
    {
      id: 3,
      material: "Solder Wire",
      category: "Electronics",
      quantity: 25,
      unit: "rolls",
      expiryDate: "2026-03-15",
      status: "low",
      time: "2025-03-20",
    },
    {
      id: 4,
      material: "PCB Cleaner",
      category: "Chemicals",
      quantity: 18,
      unit: "bottles",
      expiryDate: "2023-11-30",
      status: "expired",
      time: "2025-02-25",
    },
    {
      id: 5,
      material: "PCB Cleaner",
      category: "Chemicals",
      quantity: 18,
      unit: "bottles",
      expiryDate: "2024-11-30",
      status: "expired",
      time: "2023-11-30",
    },
    {
      id: 6,
      material: "LED 5mm Red",
      category: "oil",
      quantity: 3200,
      unit: "pcs",
      expiryDate: "2027-01-15",
      status: "normal",
      time: "2025-3-25",
    },
    {
      id: 7,
      material: "PCB Cleaner",
      category: "Chemicals",
      quantity: 108,
      unit: "bottles",
      expiryDate: "2026-11-30",
      status: "normal",
      time: "2025-03-05",
    },
  ]);

  // Calculate stock summary
  const stockSummary = {
    totalItems: stockData.length,
    totalQuantity: stockData.reduce((sum, item) => sum + item.quantity, 0),
    lowStockItems: stockData.filter((item) => item.status === "low").length,
    expiredItems: stockData.filter((item) => item.status === "expired").length,
    normalStockItems: stockData.filter((item) => item.status === "normal")
      .length,
  };

  const [activeComponent, setActiveComponent] = useState("AddStock");
  const [prefilledMaterial, setPrefilledMaterial] = useState(null);
  const [disposedItems, setDesposedItems] = useState([]);
  const handleReorder = (material) => {
    setPrefilledMaterial(material);
    setActiveComponent("RequestStock");
  };

  // const handleRequestComplete = () => {
  //   setPrefilledMaterial(null);
  //   setActiveComponent("TrackStock");
  // };
  const handleDispose = (materialId) => {
    setStockData((prevData) =>
      prevData.filter((item) => item.id !== materialId)
    );
    setDesposedItems(stockData.filter((item) => item.id === materialId));
  };
  useEffect(() => {
    return () => {
      if (activeComponent !== "RequestStock") {
        setPrefilledMaterial(null);
      }
    };
  }, [activeComponent]);

  const handleLogout = () => {
    console.log("logout");
  };
  const handleAddItem = (newItem) => {
    setStockData((prevStock) => [...prevStock, newItem]);
  };
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
      items: ["Batteries", "Stationery", "Others"],
      units: {
        Batteries: "pieces",
        Stationery: "packs",
        Others: "units",
      },
    },
  });

  // Add new category to structure
  const handleAddCategory = (newCategory, itemsWithUnits) => {
    setCategoryStructure((prev) => ({
      ...prev,
      [newCategory]: {
        items: itemsWithUnits.map((item) => item.name),
        units: itemsWithUnits.reduce((acc, item) => {
          acc[item.name] = item.unit;
          return acc;
        }, {}),
      },
    }));
  };
  const handleAddSubcategory = (category, subcategory, itemsWithUnits) => {
    setCategoryStructure((prev) => {
      const existingItems =
        prev[category]?.subcategories?.[subcategory]?.items || [];
      const existingUnits =
        prev[category]?.subcategories?.[subcategory]?.units || {};

      return {
        ...prev,
        [category]: {
          ...prev[category],
          subcategories: {
            ...(prev[category].subcategories || {}),
            [subcategory]: {
              items: [
                ...existingItems,
                ...itemsWithUnits.map((item) => item.name),
              ],
              units: {
                ...existingUnits,
                ...itemsWithUnits.reduce((acc, item) => {
                  acc[item.name] = item.unit;
                  return acc;
                }, {}),
              },
            },
          },
        },
      };
    });
  };
  const handleAddItemToStructure = (category, subcategory, itemName, unit) => {
    if (subcategory) {
      setCategoryStructure((prev) => {
        const existingSubcategoryItems =
          prev[category]?.subcategories?.[subcategory]?.items || [];
        const existingSubcategoryUnits =
          prev[category]?.subcategories?.[subcategory]?.units || {};

        return {
          ...prev,
          [category]: {
            ...prev[category],
            subcategories: {
              ...prev[category].subcategories,
              [subcategory]: {
                items: [...existingSubcategoryItems, itemName],
                units: {
                  ...existingSubcategoryUnits,
                  [itemName]: unit,
                },
              },
            },
          },
        };
      });
    } else {
      // Add to main category
      setCategoryStructure((prev) => ({
        ...prev,
        [category]: {
          ...prev[category],
          items: [...prev[category].items, itemName],
          units: {
            ...prev[category].units,
            [itemName]: unit,
          },
        },
      }));
    }
  };
  const handleAddStockItem = (newItem) => {
    setStockData((prevStock) => [...prevStock, newItem]);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "ReceiveRequest":
        return <ReceiveRequest />;
      case "RequestStock":
        return (
          <RequestStock
            suppliersInfo={suppliersInfo}
            prefilledMaterial={prefilledMaterial}
          />
          // onComplete={handleRequestComplete}
        );
      case "TrackStock":
        return (
          <TrackStock
            stockData={stockData}
            onReorder={handleReorder}
            onDispose={handleDispose}
          />
        );
      case "StockInfo":
        return <StockInfo stockData={stockData} stockSummary={stockSummary} />;
      case "SupplierInfo":
        return <SupplierInfo suppliersInfo={suppliersInfo} />;
      case "ReportAnalysis":
        return (
          <ReportAnalysis stockData={stockData} disposedItems={disposedItems} />
        );
      case "AddStock":
        return (
          <AddStock
            handleAddItem={handleAddStockItem}
            categoryStructure={categoryStructure}
            onAddCategory={handleAddCategory}
            onAddSubcategory={handleAddSubcategory}
            onAddItem={handleAddItemToStructure}
          />
        );
      default:
        return (
          <AddStock
            handleAddItem={handleAddStockItem}
            categoryStructure={categoryStructure}
            onAddCategory={handleAddCategory}
            onAddSubcategory={handleAddSubcategory}
            onAddItem={handleAddItemToStructure}
          />
        );
    }
  };

  return (
    <div className="flex">
      <SideBar
        setActiveComponent={setActiveComponent}
        activeComponent={activeComponent}
        onLogout={handleLogout}
      />
      <main className="flex-1 p-6 ">{renderComponent()}</main>
    </div>
  );
}

export default StoreKeeper;
