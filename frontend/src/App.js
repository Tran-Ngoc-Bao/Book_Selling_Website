import React, { useState, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import Bkbosto from "./pages/homepage/Bkbosto";
import Customer_info from "./pages/customer_info/Customer_info";
import Cart from "./pages/cart/Cart";
import Order from "./pages/Order";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BookDetail from "./pages/BookDetail";
import LightModeIcon from "./images/icons/light_mode.png";
import DarkModeIcon from "./images/icons/dark_mode.png";
import UserContext from "./UserContext";
import axios from "axios";
import Book from "./pages/Book";
import AdminLogin from "./pages/adminpages/AdminLogin";
import Admin from "./pages/adminpages/Admin";
import Appstyle from "./App.module.css"; // Import your CSS module for dark mode styles
import BookDetailAdmin from "./pages/adminpages/book-op/bookgridadmin/BookDetailAdmin";

function App() {
  const [ user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [accesstk, setAccessTk] = useState(null);
  const [refreshtk, setRefreshTk] = useState(null);
  const [cart, setCart] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    if (user) {
      setUser(null);
    }
  };

  const giohang = useRef(null);

  async function fetchCart(user, accesstk) {
    try {
      const cartcontainer = await axios.get(
        `/api/customers/getdetails/${user._id}`,
        {
          headers: {
            token: accesstk,
          },
        }
      );
      let getcart = cartcontainer.data.cart || [];
      giohang.current = getcart;
      return getcart;
    } catch (error) {
      try {
        const newtk = await getnewTk(refreshtk, setAccessTk);
        const cartcontainer = await axios.get(
          `/api/customers/getdetails/${user._id}`,
          {
            headers: {
              token: newtk,
            },
          }
        );
        let getcart = cartcontainer.data.cart || [];
        setCart(getcart);
        giohang.current = getcart;
        return getcart;
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function getnewTk(accesstk, setAccessTk) {
    try {
      const res = await axios.post("/api/customers/refreshtoken", {
        header: {
          token: refreshtk,
        },
      });
      const newtk = res.refreshing;
      setAccessTk(newtk);
      return newtk;
    } catch (err) {
      return err;
    }
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        logout,
        accesstk,
        setAccessTk,
        cart,
        setCart,
        getnewTk,
        refreshtk,
        fetchCart,
      }}
    >
      <div className={`${Appstyle.App} ${darkMode ? Appstyle["dark-mode"] : ""}`}>
        <div className={Appstyle.Content}>
          <Routes>
            <Route path="/" element={<Bkbosto user={user} />} />
            <Route
              path="/customer_info"
              element={<Customer_info user={user} />}
            />
            <Route
              path="/cart"
              element={
                <Cart
                  cart={cart}
                  setCart={setCart}
                  user={login}
                  giohang={giohang}
                />
              }
            />
            <Route path="/order" element={<Order />} />
            <Route
              path="/login"
              element={
                <Login
                  user={user}
                  setUser={login}
                  accesstk={accesstk}
                  setAccessTk={setAccessTk}
                  refreshtk={refreshtk}
                  setRefreshTk={setRefreshTk}
                  cart={cart}
                  setCart={setCart}
                  fetchCart={fetchCart}
                />
              }
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/book" element={<Book />} />
            <Route
              path="/bookdetail/:id"
              element={
                <BookDetail
                  giohang={giohang}
                  setCart={setCart}
                  user={user}
                  setUser={setUser}
                  accesstk={accesstk}
                />
              }
            />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/book/:id" element={<BookDetailAdmin />} />
            </Routes>

        </div>

        <button className={Appstyle["toggle-button"]} onClick={toggleDarkMode}>
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
