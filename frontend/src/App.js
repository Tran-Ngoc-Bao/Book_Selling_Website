import React, { useState, useRef, useEffect } from "react";
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
import UserContext from "./UserContext"
import axios from "axios";
import { useContext } from "react";

import "./App.css"; // Import your CSS file for dark mode styles

function App() {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false); // State to track dark mode
  const [accesstk, setAccessTk] = useState(null)
  const [refreshtk, setRefreshTk] = useState(null)
  const [cart,setCart]=useState([])
  const login = (userData) => {
    setUser(userData);
  };
  const logout = () => {
    setUser(null);
  };

  async function getCart (userid, accesstk) {
    if(!userid){
      console.log("login pls")
      return false
    }
    try {
      // Retrieve the user's cart from the backend
      const cartcontainer = await axios.get(`/api/customers/getdetails/${userid}`, {
        headers: {
          token: accesstk,
        },
      });
      let getcart = cartcontainer.data.cart || [];
      console.log("cart from backend:", getcart);
      return getcart
    }catch(err){return err}
  }



  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <UserContext.Provider value={{ user, setUser,logout, accesstk, cart, getCart  }}>
       <div className={`App ${darkMode ? "dark-mode" : ""}`}>
      <Header />
      <div className="Content">
        <Routes>
          <Route path="/" element={<Bkbosto user={user}/>} />
          <Route
            path="/customer_info"
            element={<Customer_info user={login}  
           />}
          />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} user={login} />}  />
          <Route path="/order" element={<Order />} />
          <Route
            path="/login"
            element={<Login user={user} setUser={login}  
            accesstk={accesstk} setAccessTk={setAccessTk}
            refreshtk={refreshtk} setRefreshTk={setRefreshTk}
            cart={cart} setCart={setCart}/>}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/bookdetail/:id" element={<BookDetail cart={cart} setCart={setCart} user={user} setUser={setUser} accesstk={accesstk}/>} />
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
    </UserContext.Provider>
   
  );
}

export default App;
