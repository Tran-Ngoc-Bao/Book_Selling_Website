import React, { useEffect, useState,useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { DevTool } from "@hookform/devtools";
import signupStyles from "./Signup.module.css";
import Map from '../components/map/mapcomponent'
// import { useSelector, useDispatch } from 'react-redux';
// import {setUser} from '../redux/features/user/userSlice'
// import {setCart} from '../redux/features/cart/cartSlice'
// import {setToken,selectAccessToken,selectAccToken} from '../redux/features/user/tokenSlide'


function Signup(props) {
  const { register, handleSubmit, control, formState } = useForm({
    mode: "onSubmit",
  });

  const [error, setError] = useState(null);
  const { errors } = formState;

  const [userAddr, setUserAddr] = useState('');
  

// dang nhap
const onSubmit = async (data) => {
  try {
    const response = await axios.post("api/customers/signup", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if(response.statusText==="Created"){
      setError("Đã tạo thành công")
    }
  }catch(err){
    setError(err)
  };
}

  return (
    <div className={signupStyles.signup}>
      <h2>Đăng ký</h2>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} noValidate="">
            <div className={signupStyles.formGroup}>
              <label htmlFor="name">Tên người dùng:</label>
              <input
                type="text"
                id="name"
                {...register("name", {
                  required: "Tên không được bỏ trống",
                })}
                // defaultValue={defaultname.current}
              />
            </div>
            {/* <p>{errors.name && errors.name.message}</p> */}

            <div className={signupStyles.formGroup}>
              <label htmlFor="phone">Số điện thoại:</label>
              <input
                type="text"
                id="phone"
                {...register("phone", {
                  required: "Số điện thoại không được bỏ trống",
                })}
                //  defaultValue={defaultphone.current}
              />
              <p>{errors.phone && errors.phone.message}</p>
            </div>

            <div className={signupStyles.formGroup}>
              <label htmlFor="email">Địa chỉ email:</label>
              <input
                type="text"
                id="email"
                {...register("email", {
                  required: "Địa chỉ email không được bỏ trống",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Định dạng email sai",
                  },
                })}
                //  defaultValue={defaultemail.current}
              />
              <p>{errors.email && errors.email.message}</p>
            </div>

            <div className={signupStyles.formGroup}>
              <label>Giới tính:</label>
              <div className={signupStyles.gender_label}>
                <input
                  type="radio"
                  id="nam"
                  value="Male"
                  {...register("gender", {
                    required: "Giới tính không được bỏ trống",
                  })}
                  //  defaultChecked={defaultgender==="Male"}
                />
                <label htmlFor="nam">Nam</label>
                <input
                  type="radio"
                  id="nu"
                  value="Female"
                  {...register("gender", { required: true })}
                  // defaultChecked={defaultgender==="Female"}
                />
                <label htmlFor="nu">Nữ</label>
                <p>{errors.gender && errors.gender.message}</p>
                </div>
           </div>         
          <div className={signupStyles.formGroup}>
          <label htmlFor="birthday">Ngày sinh:</label>
          {/* {console.log(user_info.birthday)} */}
          <input
            type="date"
            id="birthday"
            {...register("birthday", {
              required: "Ngày sinh không được bỏ trống",
            })}
            // defaultValue={`${convertToYYYYMMDD(defaultbirthday.current)}`}
          />
          <p>{errors.birthday && errors.birthday.message}</p>
        </div>
            <br/>
          <Map userAddr={userAddr} setUserAddr={setUserAddr}/>
        <div>
          <label htmlFor="address">Địa chỉ:</label>
          <input
              type="text"
              id="address"
              {...register("address", {
                required: "Địa chỉ không được bỏ trống",
              })}
              // defaultValue={defaultaddress.current}
              value={userAddr}
            />
          <p>{errors.address && errors.address.message}</p>
          </div>
            <div className={signupStyles.formGroup}>
              <label htmlFor="bankName">Tên ngân hàng:</label>
              <input
                type="text"
                id="bankName"
                {...register("bank.name", {
                  required: "Tên ngân hàng không được bỏ trống",
                })}
                // defaultValue={defaultbank.name}
              />
              <p>{errors.bankName && errors.bankName.message}</p>
            </div>

            <div className={signupStyles.formGroup}>
              <label htmlFor="bankSeri">Số seri thẻ:</label>
              <input
                type="text"
                id="bankSeri"
                {...register("bank.seri", {
                  required: "Số tài khoản không được bỏ trống",
                })}
                // defaultValue={defaultbank.seri}
              />
              <p>{errors.bankSeri && errors.bankSeri.message}</p>
            </div>

            <div className={signupStyles.formGroup}>
              <label htmlFor="password">Mật khẩu:</label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: "Mật khẩu không được bỏ trống",
                })}
                // defaultValue={defaultpassword.current}
              />
              <p>{errors.password && errors.password.message}</p>
            </div>
            <button type="submit">Đăng Ký</button>
            <p>{error}</p>
          </form>
          <DevTool control={control} />
        </div>
        
        </div>
    );
}


export default Signup;
