import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/header";
import Bkbosto from "./pages/Bkbosto";
import Customer_info from "./pages/Customer_info";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./components/footer/footer";
import BookDetail from "./pages/BookDetail";
import LightModeIcon from "./images/icons/light_mode.png";
import DarkModeIcon from "./images/icons/dark_mode.png";
import "./App.css"; // Import your CSS file for dark mode styles

function App() {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false); // State to track dark mode

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App ${darkMode ? "dark-mode" : ""}`}>
      <Header />

      <div className="Content">
        <Routes>
          <Route path="/" element={<Bkbosto />} />
          <Route
            path="/customer_info"
            element={<Customer_info user={user} setUser={setUser} />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route
            path="/login"
            element={<Login user={user} setUser={setUser} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/bookdetail/:id" element={<BookDetail />} />
        </Routes>
      </div>

      <Footer />

      {/* Toggle button for dark mode */}
      <button className="toggle-button" onClick={toggleDarkMode}>
        <img
          src={darkMode ? DarkModeIcon : LightModeIcon}
          alt={darkMode ? "Dark Mode" : "Light Mode"}
          style={{ filter: darkMode ? "invert(100%)" : "none" }}
        />
      </button>
    </div>
  );
}

export default App;
