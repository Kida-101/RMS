import React, { useState } from "react";
import Reservation from "../../../pages/reservation";
import Menu from "../../../components/order_reservation/menu/menu.jsx";
import Home from "../../../components/order_reservation/home/home.jsx";
import TableBooking from "../table/table.jsx";

const Routing = () => {
  const [navTo, setNavTo] = useState("/");
  const [newOrderData, setOrderData] = useState(null);
  const [newTableData, setTableData] = useState(null);

  const handleChildData = (data) => {
    console.log("Received from child:", data);
    setOrderData(data);
  };
  const handleTableData = (table) => {
    console.log("Recived from table:", table);
    setTableData(table);
  };

  const renderComponent = () => {
    switch (navTo) {
      case "/":
        return <Home />;
      case "menu":
        return <Menu sendDataToParent={handleChildData} />;
      case "table":
        return <TableBooking sendTableToParent={handleTableData} />;
      default:
        return <Home />;
    }
  };

  return (
    <div
      className="flex flex-col md:flex-row min-h-screen w-full bg-cover bg-center bg-black/80 bg-blend-darken font-[Poppins]"
      style={{ backgroundImage: "url('../../src/assets/food-bg/44.jfif')" }}
    >
      <div className="w-full md:w-1/4 sm:w-auto lg:w-1/4">
        <Reservation
          activecomponent={setNavTo}
          propsOrderData={newOrderData}
          propsTableData={newTableData}
        />
      </div>
      <div className="flex-1 p-6 md:ml-6 lg:ml-10 rounded-lg">
        {renderComponent()}
      </div>
    </div>
  );
};

export default Routing;

{
  /* <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4"
            onClick={() => setShowPopup(true)}
          >
            Show Payment Success
          </button>
          {showPopup && (
            <PaymentSuccessPopup
              isOpen={showPopup}
              onClose={() => setShowPopup(false)}
              order={orderDetails}
            />
          )} */
}
