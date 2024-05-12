import React, { useState } from "react";
import { Link } from "react-router-dom";
import pageLogo from "../../images/logos/One_Piece_Anime_Logo.png";
import userIcon from "../../images/icons/user.png";
import searchIcon from "../../images/icons/search.png";
import header from "./Header.module.css";
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
    <div className={header.header_wrapper}>
      <div className={header.header_container}>
        <div className={header.promotion_banner}>
          <p>Hello and Welcome</p>
        </div>
        <div className={header.nav_bar}>
          <ul>
            <li>
              <Link to="/">
                <img
                  className={header.logo}
                  src={pageLogo}
                  alt="Website Logo"
                />
              </Link>
            </li>
            <li>
              <div className={header.search_box}>
                <input
                  type="text"
                  placeholder="Tìm kiếm bằng tên tác giả, tác phẩm"
                />
                <button className={header.search_button}>
                  <img
                    className={header.search_icon}
                    src={searchIcon}
                    alt="Search"
                  />
                </button>
              </div>
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
                className={header.user_icon_wrapper}
              >
                <img
                  src={userIcon}
                  id="userIcon"
                  className={header.icon}
                  alt="User"
                />
              </div>
            </li>
          </ul>
        </div>
        <div className={header.sub_nav_bar}>
          <ul>
            <li>Thieu nhi</li>
            <li>Khoa hoc vien tuong</li>
            <li>Trinh tham</li>
            <li>Lich su</li>
            <li>Lang man</li>
            <li>Sach tranh</li>
          </ul>
        </div>
      </div>
      {isMenuOpen && (
        <div
          className={header.dropdown_menu}
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
              <button onClick={logout}>Đăng xuất</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
