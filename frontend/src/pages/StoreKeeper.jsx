import React, { useState } from "react";

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
      email: "jhon@gamil.com",
    },
    {
      id: 2,
      name: "Supplier B",
      address: "456 Elm St, City B",
      contacts: ["987-654-3210"],
      stockType: "Furniture",
      email: "man@gamil.com",
    },
  ];
  const [activeComponent, setActiveComponent] = useState("ReceiveRequest");

  const renderComponent = () => {
    switch (activeComponent) {
      case "ReceiveRequest":
        return <ReceiveRequest />;
      case "RequestStock":
        return <RequestStock suppliersInfo={suppliersInfo} />;
      case "TrackStock":
        return <TrackStock />;
      case "StockInfo":
        return <StockInfo />;
      case "SupplierInfo":
        return <SupplierInfo suppliersInfo={suppliersInfo} />;
      case "ReportAnalysis":
        return <ReportAnalysis />;
      default:
        return <ReceiveRequest />;
    }
  };

  return (
    <div className="flex ">
      <SideBar
        setActiveComponent={setActiveComponent}
        activeComponent={activeComponent}
      />
      <main className="flex-1 p-6 ml-7 sm:64 md:ml-64 ">
        {renderComponent()}
      </main>
    </div>
  );
}

export default StoreKeeper;
