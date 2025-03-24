import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import KitchenManager from "./pages/Kitchen_manager";
import Reservation from "./pages/reservation";
import StoreKeeper from "./pages/StoreKeeper";
import ManagerDashboard from "./pages/managerDashboard"; 

const App = () => {
  return (
    <Router>
      <nav className="bg-gray-800 p-4">
        <ul className="flex space-x-6 text-white">
          <li><Link to="/" className="hover:text-gray-400">Reservation</Link></li>
          <li><Link to="/manager" className="hover:text-gray-400">Manager Dashboard</Link></li>
          <li><Link to="/storeKepper" className="hover:text-gray-400">Store Keeper</Link></li>
          <li><Link to="/kitchen" className="hover:text-gray-400">Kitchen Manager</Link></li>
        </ul>
      </nav>

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
