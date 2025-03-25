import React from "react";
import Reservation from "../../../pages/reservation";
import Menu from "../menu/menu";
import "./router.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../home/home";
import TableBooking from "../table/table";

const Routing = () => {
  return (
    <>
      <BrowserRouter>
        <div className="app-container">
          <div className="sidebar">
            <Reservation />
          </div>
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/table" element={<TableBooking />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
};

export default Routing;
