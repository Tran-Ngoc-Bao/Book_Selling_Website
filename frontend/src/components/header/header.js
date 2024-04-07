import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className='header_container'>
      <div id='nav_bar'>
        <ul>
          <li><button>Liên hệ</button></li>
          <li><input type='text' placeholder='Tìm kiếm'></input></li>
          <li><Link to="/">BK BoSTo</Link></li>
          <li><Link to="/customer_info">Hồ sơ</Link></li>
          <li><Link to="/cart">Giỏ hàng</Link></li>
          <li><Link to="/order">Đơn hàng</Link></li>
          {/* cai dat sao cho khi nguoi dung da dang nhap thi ko hien nut sign up, sign in chi hien nut dang xuat */}
          
          <li><Link to="/Login">Dang nhap</Link></li>
          <li><button>Đăng xuất</button></li>
        </ul>
      </div>
    </div>
  );
}
