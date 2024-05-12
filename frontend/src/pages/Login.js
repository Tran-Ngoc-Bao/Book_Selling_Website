import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/features/user/userSlice";
import { setCart, setIntialCart } from "../redux/features/cart/cartSlice";
import {
  setToken,
  selectAccessToken,
  selectAccToken,
} from "../redux/features/user/tokenSlide";
import login from "./Login.module.css";

function Login(props) {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [loginMethod, setLoginMethod] = useState("phone");
  const [user, setUser1] = useState(null);

  function loginbyphone() {
    setLoginMethod("phone");
  }
  function loginbyemail() {
    setLoginMethod("email");
  }

  const { register, handleSubmit } = useForm();

  // dang nhap
  const onSubmit = async (data) => {
    try {
      const response = await axios.post("api/customers/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Assuming the response contains user data
      setUser1(response.data.existingCustomer); // Set user state with user data from response
      console.log(response.data.existingCustomer);
      setResponse(response.data.message); // Set response state with message from response
      setError(null); // Clear error state
      // const user = response.data.existingCustomer;
      // const { _id, address, bank, birthday, email, gender, name, phone, password, ...rest } = user;
      // const user_info={ _id, address, bank, birthday, email, gender, name, phone, password}
      dispatch(setToken(response.data));
      dispatch(setUser(response.data.existingCustomer || null));
      dispatch(setIntialCart(response.data.existingCustomer || null));

      let a = dispatch(selectAccToken());
      console.log(a);
    } catch (error) {
      console.error("Error:", error);
      setError(error.response);
      setResponse(null);
      setUser1(null); // Reset user state if login fails
    }
  };

  return (
    <div className={login.login_container}>
      <div className={login.form_container}>
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
          {(error && <p className={login.error_message}>{error}</p>) ||
            (response && <p className={login.success_message}>{response}</p>)}

          {!user && loginMethod === "phone" && (
            <p onClick={loginbyemail}>Đăng nhập bằng địa chỉ email</p>
          )}
          {!user && loginMethod === "email" && (
            <p onClick={loginbyphone}>Đăng nhập bằng số điện thoại</p>
          )}
          <br />
          {!user && <button type="submit">Đăng nhập</button>}
        </form>
        {!response && (
          <div className={login.signup_link}>
            <Link to="/signup">Đăng ký</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
