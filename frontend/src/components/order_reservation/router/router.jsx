import React from "react";
import Reservation from "../../../pages/reservation";
import Menu from "../menu/menu";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../home/home";
import TableBooking from "../table/table";

const Routing = () => {
  return (
    <BrowserRouter>
      <div className="flex min-h-[300vh] w-full h-[100px] bg-[url('../../../src/assets/food-bg/44.jfif')] bg-cover bg-center bg-black/80 bg-blend-darken font-[Poppins]">
        <div className="flex-1 min-w-[100px] h-screen">
          <Reservation />
        </div>
        <div className="flex-2 p-[25px] mb-[30px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/table" element={<TableBooking />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default Routing;
