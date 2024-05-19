import React, { useState } from "react";
import { Link } from "react-router-dom";
import searchIcon from "../../images/icons/search.png";
import header from "./Header.module.css";
import UserContext from "../../UserContext";
import { useContext } from "react";

export default function Header() {
  const { logout } = useContext(UserContext);

  return (
    <div className={header.header_container}>
      <div className={header.choose_button}>
        <span className={header.choose_label}>Lựa chọn</span>
      </div>
      <div className={header.search_bar}>
        <span className={header.search_label}>Tìm kiếm</span>
        <span className={header.search_button}>
          <img src={searchIcon} alt="Search" className={header.search_icon} />
        </span>
      </div>
      <div className={header.homepage_nav}>
        <Link to="/">
          <span className={header.homepage_label}>BK BoSto</span>
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
        <Link to="/Login">
          <span className={header.login_label}>Đăng nhập</span>
        </Link>
      </div>
    </div>
  );
}
