import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }

    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = (index) => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    window.location.href = "http://localhost:3000/login";
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="TradeHub_Logo.png" style={{ width: "15%", marginLeft:"10px" }} />
      <div className="menus">
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Analytics
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/funds"
              onClick={() => handleMenuClick(4)}
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
          
        </ul>
        <p
          className="menu"
          style={{
            cursor: "pointer",
            marginRight: "20px",
          }}
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </p>
        <div className="profile" onClick={handleProfileClick}>
  <div className="avatar">ZU</div>
  <p className="username">
    {localStorage.getItem("username") || "USERID"}
  </p>
</div>

{isProfileDropdownOpen && (
  <div
    className="profile-dropdown"
    style={{
      position: "absolute",
      top: "70px",
      right: "20px",
      borderRadius: "8px",
      padding: "12px",
      minWidth: "180px",
      zIndex: 1000,
    }}
  >
    <p style={{ marginBottom: "10px" }}>
      <strong>
        {localStorage.getItem("username") || "USERID"}
      </strong>
    </p>

    <button
      onClick={handleLogout}
      style={{
        width: "100%",
        padding: "8px",
        border: "none",
        borderRadius: "5px",
        backgroundColor: "#387ed1",
        color: "white",
        cursor: "pointer",
      }}
    >
      Logout
    </button>
  </div>
)}
      </div>
    </div>
  );
};

export default Menu;