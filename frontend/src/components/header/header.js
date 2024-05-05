import React, { useState } from "react";
import { Link } from "react-router-dom";
import pageLogo from "../../images/logos/One_Piece_Anime_Logo.png";
import userIcon from "../../images/icons/user.png";
import searchIcon from "../../images/icons/search.png";
import "./header.css";
import UserContext from "../../UserContext";
import { useContext } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [iconPosition, setIconPosition] = useState({ x: 0, y: 0 });
  const { logout } = useContext(UserContext);

  const handleMenuEnter = (event) => {
    setIsMenuOpen(true);
    const iconRect = event.target.getBoundingClientRect();
    setIconPosition({ x: iconRect.left, y: iconRect.bottom });
  };

  const handleMenuLeave = () => {
    setIsMenuOpen(false);
  };

  const handleMenuHover = () => {
    setIsMenuOpen(true);
  };

  const handleMenuHoverLeave = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="header-wrapper">
      <div className="header_container">
        <div id="nav_bar">
          <ul>
            <li>
              <Link to="/">
                <img className="logo" src={pageLogo} alt="Website Logo" />
              </Link>
            </li>
            <li>
              <div className="search-box">
                <input type="text" placeholder="Tam Quoc Dien Nghia" />
                <button className="search-button">
                  <img className="search-icon" src={searchIcon} alt="Search" />
                </button>
              </div>
            </li> 
             <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/cart">Giỏ hàng</Link>
            </li>
          
            <li>
              <Link to="/order">Đơn hàng</Link>
            </li>
            <li>
              <Link to="">Liên hệ</Link>
            </li>
            <li>
              <div
                onMouseEnter={handleMenuEnter}
                onMouseLeave={handleMenuLeave}
                className="user-icon-wrapper"
              >
                <img src={userIcon} id="userIcon" className="icon" alt="User" />
              </div>
            </li>
          </ul>
        </div>
      </div>
      {isMenuOpen && (
        <div
          className="dropdown-menu"
          style={{ top: iconPosition.y, left: iconPosition.x }}
          onMouseEnter={handleMenuHover}
          onMouseLeave={handleMenuHoverLeave}
        >
          <ul>
            <li>
              <Link to="/customer_info">Hồ sơ</Link>
            </li>
            <li>
              <Link to="/Login">Đăng nhập</Link>
            </li>
            <li>
              <Link to="/link2">Đăng xuất</Link>
            </li>
            <button onClick={logout}>Dăng xuất</button>
          </ul>
        </div>
      )}
    </div>
  );
}
