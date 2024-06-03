import React, { useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import header from "./Header.module.css";
import axios from "axios";
import { logoutAsync } from "../../redux/features/user/userSlice";
import { useDispatch,useSelector } from "react-redux";

export default function Header() {
  const dispatch = useDispatch()
  const login = useSelector((state)=>state.user.login)
   async function dangxuat(){
    dispatch(logoutAsync())
    const rep = await axios.post("/api/customers/logout")
    alert("Đăng xuất thành công")
  }

  const data = useRef([]);
  const [result, setResult] = useState([]);
  const search = async (searchTerm) => {
    try {
      const response = await axios.get(
        `/api/books/searchbook?searchterm=${encodeURI(
          searchTerm
        )}`
      );
      data.current = response.data;
      setResult(data.current);
    } catch (error) {
      console.error("Error searching for books:", error);
    }
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const debouncedSearch = useMemo(() => debounce(search, 300), [search]); // Memoize the debounced search function

  const handleSearchChange = (e) => {
    // Include the 'e' parameter here
    const searchTerm = e.target.value;
    if (searchTerm != "") {
      debouncedSearch(searchTerm);
    } else {
      data.current = [];
      setResult(data.current);
    }
    // Call the debounced search function with the current search term
  };

  return (
    <div className={header.header_content}>
      <div className={header.header_container}>
        <div className={header.homepage_nav}>
          {/* <Link to="/">
            <div className={header.logo_container}>
              <img
                src={require("../../images/logos/page_logo_v2.png")}
                className={header.logo}
                alt="page logo"
              />
            </div>
          </Link> */}
        </div>

      <form>
      <input
            style={{ width: "500px", padding: "10px" }}
            type="text"
            placeholder="Tìm kiếm bằng cách nhập tên sách"
            onChange={(e) => {
              if (e.target.value.length < 2) {
                // Set data.current to an empty array if the input value becomes empty
                data.current = [];
                setResult(data.current);
                console.log(
                  "dayla input ",
                  e.target.value,
                  "dodai: ",
                  e.target.value.length
                );
              } else {
                handleSearchChange(e);
              }
              // Call handleSearchChange function if needed
            }} // Call handleSearchChange on input change
            aria-label="Tìm kiếm sách"
            autoComplete="off" // Disable autocomplete to prevent browser suggestions interfering with search
            // onBlur={() => {
            //   data.current = [];
            //   setResult(data.current);
            // }} // Clear the data array when the input field loses focus
          />
        {/* Check if data.current has items before rendering */}

        {result && (
            <div className={header.search_result_box}>
              {result.map((item) => (
                <div key={item._id} className={header.book_item}>
                  <Link
                    to={{
                      pathname: `/bookdetail/${item._id}`,
                    }}
                  >
                    <img
                      src={`../images/${item._id}.jpeg`}
                      width={70}
                      height={70}
                      alt={item.title}
                    />
                  </Link>
                  <p>{item.title}</p>
                </div>
              ))}
            </div>
          )}
      </form>

      <div className={header.homepage_nav}>
          <Link to="/book">
            <span className={header.homepage_label}>Sản phẩm</span>
          </Link>
        </div>
        <div className={header.profile_nav}>
          <Link to="/customer_info">
            <span className={header.profile_label}>Hồ sơ</span>
          </Link>
        </div>
        <div className={header.cart_nav}>
          <Link to="/cart">
            <span className={header.cart_label}>Giỏ hàng</span>
          </Link>
        </div>
        <div className={header.order_nav}>
          <Link to="/order">
            <span className={header.order_label}>Đơn hàng</span>
          </Link>
        </div>
      <div className={header.login_button}>
        {!login&&<Link to="/Login">
          <span className={header.login_label}>Đăng nhập</span>
        </Link>}
        {login&&
        <span className={header.login_label} onClick={dangxuat} >Đăng xuất</span>
        }
      </div>
    </div>
    </div>
  );
}
