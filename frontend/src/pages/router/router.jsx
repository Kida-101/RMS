import React from "react";
import Reservation from "../reservation";
import Menu from "../../components/menu/menu";
import "../pageStyls/router.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../../components/home/home";
import TableBooking from "../../components/table/table";

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
