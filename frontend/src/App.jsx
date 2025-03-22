import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Reservation from "./pages/reservation";
import ManagerDashboard from "./pages/managerDashboard"; 


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Reservation />} />
        <Route path="/manager" element={<ManagerDashboard />} /> 
      </Routes>
    </Router>
  );
};

export default App;
