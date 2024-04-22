import React from 'react';
import { Link } from 'react-router-dom'; // Import the Link component from react-router-dom
import {useForm} from 'react-hook-form'
import { useState } from 'react';
import axios from 'axios';

function Login(props) {
  const [error, setError] = useState(null)
  const[respone,setRespone]= useState(null)

  const {register, handleSubmit}=useForm()
  const onSubmit = async (data) => {
    try {
      const response = await axios.post('api/customers/login', data,{
        headers:{ accessToken:  'xxx', 
                  'Content-Type':  'application/json' }
      }); 
      console.log(response.data); // Log the response from the API
      setRespone(response.data.message)
      setError(null)
      props.setUser(response.data.existingCustomer)
      console.log(props.user)
    } catch (error) {
      console.error('Error:', error); // Log any errors that occur during the API request
      setError(error.response.data.message)
      setRespone(null)
      props.setUser(null)
    }
    
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate >
        <div>
          <label htmlFor="phone">Số điện thoại:</label>
          <input type="text" {...register("phone",{required:"Số điện thoại không được để trống"})} id="phone" placeholder="Your phone number" />
        </div>
        <div>
          <label htmlFor="password">Mật khẩu:</label>
          <input type="password" {...register("password",{required:"Mật khẩu trống"})} id="password" placeholder="Your password" />
        </div>
        {(error&&<p>{error}</p>)||(respone&&<p>{respone}</p>)}
        <button type="submit">Đăng nhập</button>
      </form>
      {/* Use the Link component to navigate to the signup page */}
      {(!respone)&&<Link to="/signup"><p>Đăng ký</p></Link>}
    </div>
  );
}

export default Login;
