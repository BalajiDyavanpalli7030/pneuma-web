import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Banks from "./pages/Banks";
import CreditCards from "./pages/CreditCards";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/banks" element={<Banks />} />
        <Route path="/credit-cards" element={<CreditCards />} />
      </Routes>
    </Router>
  );
}

export default App;
