import React,{useState} from "react";
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';

// truyen bien user vao. check
//show ra
// submit

function Customer_info(props) {
  const[login,setLogin]=useState(props.user)
  console.log(props.user)
  const { register, handleSubmit, formState, getValues } = useForm();
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(getValues())
    let sent={...getValues(), birthday:{$date:`${convertToISO8601(getValues().birthday)}`}}
    console.log("sent = ",sent)
    // gui backend
    // cap nhat gia tri log in,
    // gui yeu cau cap nhat bien user toan cuc ?
  };


//xu ly ngay sinh
  function convertToYYYYMMDD(isoDateString) {
    const date = new Date(isoDateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    console.log( typeof isoDateString);
    return `${year}-${month}-${day}`;
}

// convert nguoc lai de submit
// convert nguoc lai de gui data base
function convertToISO8601(dateString) {
  const parts = dateString.split('-');
  const year = parseInt(parts[0]);
  const month = parseInt(parts[1]) - 1; // Month is zero-indexed in JavaScript Date object
  const day = parseInt(parts[2]);

  const date = new Date(Date.UTC(year, month, day));
  return date.toISOString();
  
}


  return (
    <div>
      <h2>Customer Information</h2>
      {login && (
        <form onSubmit={handleSubmit(onSubmit)} noValidate="">
          <div>
            <label htmlFor="name">Tên người dùng:</label>
            <input
              type="text"
              id="name"
              {...register("name", {
                required: "Tên không được bỏ trống",
              } )}
              defaultValue={login.name}
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
              defaultValue={login.phone}
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
              defaultValue={login.email}
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
              defaultChecked={login.gender==="Male"}
            />
            <label htmlFor="nam">Nam</label>
            <input
              type="radio"
              id="nu"
              value="Female"
              {...register("gender", { required: true })}
              defaultChecked={login.gender==="Female"}
            />
            <label htmlFor="nu">Nữ</label>
            <p>{errors.gender && errors.gender.message}</p>
          </div>

          <div>
            <label htmlFor="birthday">Ngày sinh:</label>
            <input
              type="date"
              id="birthday"
              {...register("birthday", {
                required: "Ngày sinh không được bỏ trống",
              })}
              defaultValue={`${convertToYYYYMMDD(login.birthday)}`}
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
              defaultValue={login.address}
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
              defaultValue={login.bank.name}
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
              defaultValue={login.bank.seri}
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
              defaultValue={login.password}
            />
            <p>{errors.password && errors.password.message}</p>
          </div>
          <button type="submit">Đổi</button>
        </form>
      )}
      {!props.user && (
        <>
          <p>Hãy đăng nhập để xem thông tin</p>
          <Link to="/login">
            <p>Đăng nhập</p>
          </Link>
        </>
      )}
    </div>
  );
}

export default Customer_info;