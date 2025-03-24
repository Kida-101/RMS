import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import KitchenManager from "./pages/Kitchen_manager";
import Reservation from "./pages/reservation";
import StoreKeeper from "./pages/StoreKeeper";
import ManagerDashboard from "./pages/managerDashboard"; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Reservation />} />
        <Route path="/manager" element={<ManagerDashboard />} /> 
        <Route path="/storeKepper" element={<StoreKeeper />} /> 
        <Route path="/kitchen" element={<KitchenManager />} /> 
      </Routes>
    </Router>
  );
};

export default App;
