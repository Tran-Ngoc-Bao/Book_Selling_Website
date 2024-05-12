import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./Login.css";
import UserContext from "../UserContext"
import { useContext } from "react";

function Login(props) {
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [loginMethod, setLoginMethod] = useState("phone");
  const { user, logout, fetchCart } = useContext(UserContext);

  function loginbyphone() {
    setLoginMethod("phone");
  }
  function loginbyemail() {
    setLoginMethod("email");
  }

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    console.log(user);
  }, [user]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("api/customers/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      setResponse(response.data.message);
      setError(null);
      props.setUser(response.data.existingCustomer);
      props.setAccessTk(response.data.accessToken);
      props.setRefreshTk(response.refreshToken);
      try {
          fetchCart(response.data.existingCustomer,response.data.accessToken)
      } catch (err) {
        console.error("Error fetching cart", err);
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error.response.data.message);
      setResponse(null);
    }
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div>
            
            {loginMethod === "phone" && (
              <div id="login=phone">
                <label htmlFor="phone">Số điện thoại:</label>
                <input
                  type="text"
                  {...register("phone", {
                    required: "Số điện thoại không được để trống",
                  })}
                  id="phone"
                  placeholder="Your phone number"
                />
              </div>
            )}
            {loginMethod === "email" && (
              <div id="login=email">
                <label htmlFor="email">Địa chỉ email:</label>
                <input
                  type="text"
                  {...register("email", {
                    required: "Địa chỉ emai không được để trống",
                  })}
                  id="email"
                  placeholder="Your email address"
                />
              </div>
            )}
          </div>
          <div>
            <label htmlFor="password">Mật khẩu:</label>
            <input
              type="password"
              {...register("password", { required: "Mật khẩu trống" })}
              id="password"
              placeholder="Your password"
            />
          </div>
          {(error && <p className="error-message">{error}</p>) ||
            (response && <p className="success-message">{response}</p>)}
          {!props.user && loginMethod === "phone" && (
            <p onClick={loginbyemail}>Đăng nhập bằng địa chỉ email</p>
          )}
          {!props.user && loginMethod === "email" && (
            <p onClick={loginbyphone}>Đăng nhập bằng số điện thoại</p>
          )}
          <br />
          {!props.user && <button type="submit">Đăng nhập</button>}
        </form>
        {!response && (
          <div className="signup-link">
            <Link to="/signup">Đăng ký</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
