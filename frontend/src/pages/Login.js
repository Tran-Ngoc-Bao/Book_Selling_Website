import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./Login.css";

function Login(props) {
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await axios.post("api/customers/login", data, {
        headers: {
          accessToken: "xxx",
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      setResponse(response.data.message);
      setError(null);
      props.setUser(response.data.existingCustomer);
    } catch (error) {
      console.error("Error:", error);
      setError(error.response.data.message);
      setResponse(null);
      props.setUser(null);
    }
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div>
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
          <button type="submit">Đăng nhập</button>
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
