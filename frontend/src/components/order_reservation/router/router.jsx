import React, { useState } from "react";
import Reservation from "../../../pages/reservation";
import Menu from "../../../components/order_reservation/menu/menu.jsx";
import Home from "../../../components/order_reservation/home/home.jsx";
import TableBooking from "../table/table.jsx";

const Routing = () => {
  const [navTo, setNavTo] = useState("/");

  const renderComponent = () => {
    switch (navTo) {
      case "/":
        return <Home />;
      case "menu":
        return <Menu />;
      case "table":
        return <TableBooking />;
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
        <Reservation activecomponent={setNavTo} />
      </div>
      <div className="flex-1 p-6 md:ml-6 lg:ml-10 rounded-lg">
        {renderComponent()}
      </div>
    </div>
  );
};

export default Routing;

// const [showPopup, setShowPopup] = useState(false);

// const orderDetails = {
//   tableNumber: 5,
//   date: "March 25, 2025",
//   startTime: "7:00 PM",
//   endTime: "9:00 PM",
//   items: [
//     { name: "Pizza", quantity: 2 },
//     { name: "Pasta", quantity: 1 },
//   ],
// };
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
