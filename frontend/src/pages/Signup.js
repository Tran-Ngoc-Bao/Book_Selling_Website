import React from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const urlEncoded = new URLSearchParams(formData).toString();

    fetch("/signup", {
      method: "POST",
      body: urlEncoded,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => response.text())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <h2>Signup</h2>
      <form id="userForm" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Tên người dùng:</label>
          <input type="text" id="name" name="name" required = {true}/>
        </div>
        <div>
          <label htmlFor="phone">Số điện thoại:</label>
          <input type="text" id="phone" name="phone" required = {true}/>
        </div>
        <div>
          <label htmlFor="email">Địa chỉ email:</label>
          <input type="text" id="email" name="email" required = {true}/>
        </div>
        <div>
          <label>Giới tính:</label>
          <input type="radio" id="nam" name="gender" value="Nam" />
          <label htmlFor="nam">Nam</label>
          <input type="radio" id="nu" name="gender" value="Nu" />
          <label htmlFor="nu">Nữ</label>
        </div>
        <div>
          <label htmlFor="birthday">Ngày sinh:</label>
          <input type="date" id="birthday" name="birthday" required = {true}/>
        </div>
        <div>
          <label htmlFor="address">Địa chỉ:</label>
          <input type="text" id="address" name="address" required = {true}/>
        </div>
        <div>
          <label htmlFor="password">Mật khẩu:</label>
          <input type="password" id="password" name="password" required = {true}/>
        </div>
        <button type="submit">Đăng ký</button>
      </form>
      <Link to='/login'><p>Đăng nhập</p></Link> 
    </div>
  );
}

export default Signup;
