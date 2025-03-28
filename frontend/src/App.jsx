import React from "react";
import Routing from "./components/order_reservation/router/router.jsx";
// import Chef from "./pages/Chef";
import KitchenManager from "./pages/Kitchen_manager";
import StoreKeeper from "./pages/StoreKeeper";
import ManagerDashboard from "./pages/managerDashboard";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Reception from "./pages/reception.jsx";

const App = () => {
  return (
    <Router>
      <nav className="bg-gray-800 p-4">
        <ul className="flex space-x-6 text-white">
          <li>
            <Link to="/reservation" className="hover:text-gray-400">
              Reservation
            </Link>
          </li>
          <li>
            <Link to="/reception" className="hover:text-gray-400">
              Reception
            </Link>
          </li>
          <li>
            <Link to="/manager" className="hover:text-gray-400">
              Manager Dashboard
            </Link>
          </li>
          <li>
            <Link to="/storeKepper" className="hover:text-gray-400">
              Store Keeper
            </Link>
          </li>
          <li>
            <Link to="/kitchen" className="hover:text-gray-400">
              Kitchen Manager
            </Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/reservation" element={<Routing />} />{" "}
        <Route path="/reception" element={<Reception />} />{" "}
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/storeKepper" element={<StoreKeeper />} />
        <Route path="/kitchen" element={<KitchenManager />} />
      </Routes>
    </Router>
  );
};

export default App;
