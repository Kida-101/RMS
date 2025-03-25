import React, { useEffect, useState } from "react";
import ReceiveRequest from "../components/StoreKeeper/ReceiveRequest";
import RequestStock from "../components/StoreKeeper/RequestStock";
import TrackStock from "../components/StoreKeeper/TrackStock";
import StockInfo from "../components/StoreKeeper/StockInfo";
import SupplierInfo from "../components/StoreKeeper/SupplierInfo";
import ReportAnalysis from "../components/StoreKeeper/ReportAnalysis";
import SideBar from "../components/StoreKeeper/SideBar";

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

  const [activeComponent, setActiveComponent] = useState("ReceiveRequest");
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
      default:
        return <ReceiveRequest />;
    }
  };

  return (
    <div className="flex">
      <SideBar
        setActiveComponent={setActiveComponent}
        activeComponent={activeComponent}
      />
      <main className="flex-1 p-6 ml-7 sm:64 md:ml-64">
        {renderComponent()}
      </main>
    </div>
  );
}

export default StoreKeeper;
