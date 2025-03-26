import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Reservation from "../../../pages/reservation";
import Menu from "../menu/menu";
import Home from "../home/home";
import TableBooking from "../table/table";
import PaymentSuccessPopup from "../paymentSuccess/PaymentSuccessPopup";

const Routing = () => {
  const [showPopup, setShowPopup] = useState(false);

  const orderDetails = {
    tableNumber: 5,
    date: "March 25, 2025",
    startTime: "7:00 PM",
    endTime: "9:00 PM",
    items: [
      { name: "Pizza", quantity: 2 },
      { name: "Pasta", quantity: 1 },
    ],
  };

  return (
    <BrowserRouter>
      <div
        className="flex min-h-screen w-full bg-cover bg-center bg-black/80 bg-blend-darken font-[Poppins]"
        style={{ backgroundImage: "url('../../src/assets/food-bg/44.jfif')" }}
      >
        <div className="flex-1 min-w-[100px] f-screen">
          <Reservation />
        </div>

        <div className="flex-2 p-[25px] mb-[30px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/table" element={<TableBooking />} />
          </Routes>
          {/* <button
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
          )} */}
        </div>
      </div>
    </BrowserRouter>
  );
};

export default Routing;
