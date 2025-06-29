import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/Header.css";

const Header = ({ scrollToSection }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const showNavbar =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/signup";

  if (!showNavbar) return null;

  return (
    <motion.header
      className="header-ss"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {location.pathname === "/" && (
        <button
          className="header-ss-hamburger"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          ☰
        </button>
      )}

      <div className="header-ss-center">
        <Link to="/">
          <h2 className="header-ss-logo">SurveySnap</h2>
        </Link>
      </div>

      <div className="header-ss-right">
        {location.pathname === "/login" || location.pathname === "/signup" ? (
          <div className="header-ss-auth-nav">
            <button
              className="header-ss-back-home"
              onClick={() => navigate("/")}
            >
              🏠 Back to Home
            </button>
            <button
              className="header-ss-switch-auth"
              onClick={() =>
                navigate(location.pathname === "/login" ? "/signup" : "/login")
              }
            >
              {location.pathname === "/login" ? "Sign Up" : "Login"}
            </button>
          </div>
        ) : (
          <>
            <nav className={`header-ss-nav${menuOpen ? " open" : ""}`}>
              <ul>
                <motion.li
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button onClick={() => scrollToSection("features")}>
                    Features
                  </button>
                </motion.li>
                <motion.li
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button onClick={() => scrollToSection("howItWorks")}>
                    How It Works
                  </button>
                </motion.li>
                <motion.li
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button onClick={() => scrollToSection("pricing")}>
                    Pricing
                  </button>
                </motion.li>
                <motion.li
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button onClick={() => navigate("/contactus")}>
                    Contact
                  </button>
                </motion.li>
                {user?.role === "admin" && (
                  <motion.li
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button onClick={() => navigate("/admin-dashboard")}>
                      Admin Panel
                    </button>
                  </motion.li>
                )}
              </ul>
            </nav>
            <div className="header-ss-auth-buttons">
              <motion.button
                onClick={() => navigate("/login")}
                className="header-ss-login-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Login
              </motion.button>
              <motion.button
                onClick={() => navigate("/signup")}
                className="header-ss-signup-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Up
              </motion.button>
            </div>
          </>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
