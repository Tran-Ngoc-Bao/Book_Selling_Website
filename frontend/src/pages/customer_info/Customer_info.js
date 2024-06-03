import React, { useState, useMemo, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Link } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual, useStore } from "react-redux";
import { sentUser, showUserinfo } from "../../redux/features/user/userSlice";
import CustomerInfoStyle from "./Customer_info.module.css";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";

function Customer_info() {
  const dispatch = useDispatch();

  const user_info = useSelector((state) => state.user);
  const login = user_info.login

  const count = useRef(0);
  // console.log(user_info);

  const defaultname = useRef(null);
  const defaultaddress = useRef(null);
  const defaultbank = useRef(null);
  const defaultbirthday = useRef(null);
  const defaultemail = useRef(null);
  const defaultgender = useRef(null);
  const defaultpassword = useRef(null);
  const defaultphone = useRef(null);

  const { register, handleSubmit, formState, getValues, control, setValue } =
    useForm({
      mode: "onSubmit",
      defaultValues: {
        name: defaultname.current,
        address: defaultaddress.current,
        bank: defaultbank.current,
        birthday: convertToYYYYMMDD(defaultbirthday.current),
        email: defaultemail.current,
        gender: defaultgender.current,
        password: defaultpassword.current,
        phone: defaultphone.current,
      },
    });
  const { errors } = formState;

  useEffect(() => {
    async function hello() {
      const data = user_info.user
      defaultname.current = data.name;
      console.log("this is user name: ", defaultname.current);
      defaultaddress.current = data.address;
      defaultbank.current = data.bank;
      defaultbirthday.current = data.birthday;
      defaultemail.current = data.email;
      defaultgender.current = data.gender;
      defaultpassword.current = data.password;
      defaultphone.current = data.phone;
      setValue("name", defaultname.current);
      setValue("address", defaultaddress.current);
      setValue("bank", defaultbank.current);
      setValue("birthday", convertToYYYYMMDD(defaultbirthday.current));
      setValue("email", defaultemail.current);
      setValue("gender", defaultgender.current);
      setValue("password", defaultpassword.current);
      setValue("phone", defaultphone.current);

      console.log("rerender");
    }
    hello();

    return;
  }, [user_info]);
  useEffect(() => {
    console.log("rerender 2 ");
  });

  // Convert date to YYYY-MM-DD format
  function convertToYYYYMMDD(isoDateString) {
    const date = new Date(isoDateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // Convert date to ISO 8601 format
  function convertToISO8601(dateString) {
    const parts = dateString.split("-");
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1;
    const day = parseInt(parts[2]);
    const date = new Date(Date.UTC(year, month, day));
    return date.toISOString();
  }

  function onSubmit(data) {
    // Prepare data for submission
    const sent = {
      ...getValues(),
      birthday: `${convertToISO8601(getValues().birthday)}`,
    };
    dispatch(sentUser(sent));
    console.log("new user",sent)
    count.current++;
  }

  return (
    <div className={CustomerInfoStyle.page_container}>
      <Header />
      <div className={CustomerInfoStyle.information_container}>
        <span className={CustomerInfoStyle.information_title}>
          Customer Information
        </span>
        {login && (
          <div className={CustomerInfoStyle.login_notification}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate="">
              <div>
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
              <p>{errors.name && errors.name.message}</p>

              <div>
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

              <div>
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

              <div>
                <label>Giới tính:</label>
                <input
                  type="radio"
                  id="nam"
                  value="Male"
                  {...register("gender", {
                    required: "Giới tính không được bỏ trống",
                  })}
                  defaultChecked={defaultgender === "Male"}
                />
                <label htmlFor="nam">Nam</label>
                <input
                  type="radio"
                  id="nu"
                  value="Female"
                  {...register("gender", { required: true })}
                  defaultChecked={defaultgender === "Female"}
                />
                <label htmlFor="nu">Nữ</label>
                <p>{errors.gender && errors.gender.message}</p>
              </div>

              <div>
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

              <div>
                <label htmlFor="address">Địa chỉ:</label>
                <input
                  type="text"
                  id="address"
                  {...register("address", {
                    required: "Địa chỉ không được bỏ trống",
                  })}
                  // defaultValue={defaultaddress.current}
                />
                <p>{errors.address && errors.address.message}</p>
              </div>

              <div>
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

              <div>
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

              <div>
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
              <button type="submit">Đổi</button>
            </form>
            <DevTool control={control} />
          </div>
        )}
        {!login && (
          <>
            <div className={CustomerInfoStyle.no_login_notification}>
              <span className={CustomerInfoStyle.label}>
                Hãy đăng nhập để xem thông tin
              </span>
              <div className={CustomerInfoStyle.no_login_notification_link}>
                <Link to="/login">
                  <p>Đăng nhập</p>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default React.memo(Customer_info);
