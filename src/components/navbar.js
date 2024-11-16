import React, { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve token and user data from localStorage
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    setIsAuthenticated(!!token); // Set authentication status

    // Parse and set the username
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserName(parsedUser.name || "Guest");
    } else {
      setUserName("Guest");
    }
  }, []);

  const handleLogout = () => {
    // Clear localStorage and redirect to signup page
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    navigate("/signup");
  };

  return (
    <nav className="navbar">
      {/* Logo Section */}
      <div className="logo">
        Task/Bug Tracker
      </div>

      {/* Navigation Links */}
      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        {isAuthenticated ? (
          <>
            {/* User Profile */}
            <li className="user-profile">
              <CgProfile className="profile-icon" />
              <span className="user-name">{userName}</span>
            </li>
            {/* Logout Button */}
            <li>
              <button onClick={handleLogout} className="logout-btn">
                <MdLogout className="logout-icon" /> Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li><a href="/login">Login</a></li>
            <li><a href="/signup">Signup</a></li>
          </>
        )}
      </ul>

      {/* Hamburger Menu for Mobile */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
};

export default Navbar;


