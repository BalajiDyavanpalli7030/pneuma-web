import React from "react";
import { Link, useLocation } from "react-router-dom";

function NavBar() {
  const location = useLocation();
  return (
    <nav>
      <ul>
        <li className={location.pathname === "/credit-cards" ? "active" : ""}>
        <Link to="/credit-cards">Credit Cards</Link></li>
        <li className={location.pathname === "/banks" ? "active" : ""}>
        <Link to="/banks">Banks</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;