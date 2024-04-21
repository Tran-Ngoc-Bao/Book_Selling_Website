import React from 'react';
import { Link } from 'react-router-dom'; // Import the Link component from react-router-dom

function Login() {
  return (
    <div>
      <form action="/login" method="post">
        <div>
          <label htmlFor="phone">Số điện thoại:</label>
          <input type="text" name="phone" id="phone" placeholder="Your phone number" />
        </div>
        <div>
          <label htmlFor="password">Mật khẩu:</label>
          <input type="password" name="password" id="password" placeholder="Your password" />
        </div>
        <button type="submit">Đăng nhập</button>
      </form>
      {/* Use the Link component to navigate to the signup page */}
      <Link to="/signup"><p>Đăng ký</p></Link>
    </div>
  );
}

export default Login;
