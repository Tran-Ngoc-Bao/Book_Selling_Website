// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// function Customer_info() {
//   const id = '661b2c722899767175a64fa4';
//   const [customer, setCustomer] = useState(null);

//   useEffect(() => {
//     async function fetchCustomer() {
//       try {
//         const response = await fetch(`api/customer?id=${id}`);
//         if (response.ok) {
//           const json = await response.json();
//           setCustomer(json);
//         } else {
//           throw new Error('Failed to fetch customer data');
//         }
//       } catch (error) {
//         console.error('Error fetching customer data:', error);
//       }
//     }

//     fetchCustomer();
//   }, [id]);

//   return (
    // <div>
    //   <h2>Customer Information</h2>
    //   <form action="/customer" method="post">
    //     <div>
    //       <label htmlFor="name">Tên người dùng:</label>
    //       <input type="text" id="name" name="name" value={customer?.name || ''} />
    //     </div>
    //     <div>
    //       <label htmlFor="phone">Số điện thoại:</label>
    //       <input type="text" id="phone" name="phone" value={customer?.phone || ''} />
    //     </div>
    //     <div>
    //       <label htmlFor="email">Địa chỉ email:</label>
    //       <input type="text" id="email" name="email" value={customer?.email || ''} />
    //     </div>
    //     <div>
    //       <label>Giới tính:</label>
    //       <input type="radio" id="nam" name="gender" value="Nam" checked={customer?.gender === 'Nam'} />
    //       <label htmlFor="nam">Nam</label>
    //       <input type="radio" id="nu" name="gender" value="Nu" checked={customer?.gender === 'Nu'} />
    //       <label htmlFor="nu">Nữ</label>
    //     </div>
    //     <div>
    //       <label htmlFor="birthday">Ngày sinh:</label>
    //       <input type="date" id="birthday" name="birthday" value={customer?.birthday || ''} />
    //     </div>
    //     <div>
    //       <label htmlFor="address">Địa chỉ:</label>
    //       <input type="text" id="address" name="address" value={customer?.address || ''} />
    //     </div>
    //     <div>
    //       <label htmlFor="bankName">Tên ngân hàng:</label>
    //       <input type="text" id="bankName" name="bankName" value={customer?.bank?.name || ''} />
    //     </div>
    //     <div>
    //       <label htmlFor="bankSeri">Số seri thẻ:</label>
    //       <input type="text" id="bankSeri" name="bankSeri" value={customer?.bank?.seri || ''} />
    //     </div>
    //     <div>
    //       <label htmlFor="password">Mật khẩu:</label>
    //       <input type="password" id="password" name="password" value={customer?.password || ''} />
    //     </div>
    //     <button type="submit">Đổi</button>
    //   </form>
    // </div>
//   );
// }

// export default Customer_info;
import React from 'react'
import {useForm} from 'react-hook-form'
function Customer_info() {
  const {register, handleSubmit,formState} = useForm()
  const {errors}=formState
  const onSubmit =(data)=>{console.log(data)}
  return (
    <div>
    <h2>Customer Information</h2>
    <form onSubmit={handleSubmit(onSubmit)} noValidate="">
      <div>
        <label htmlFor="name">Tên người dùng:</label>
        <input type="text" id="name"  {... register("name",{
          required:"Tên không được bỏ trống"
        })}/>
      </div>
      <p>{errors.name && errors.name.message}</p>
      

      <div>
        <label htmlFor="phone">Số điện thoại:</label>
        <input type="text" id="phone" {... register("phone",{
          required:"Số điện thoại không được bỏ trống"
        })} />
        <p>{errors.phone && errors.phone.message}</p>
      </div>
      
      <div>
        <label htmlFor="email">Địa chỉ email:</label>
        <input type="text" id="email"{... register("email",{
          required:"Địa chỉ email không được bỏ trống",
          pattern:{
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Định dạng email sai"
          }
        })} />
        <p>{errors.email && errors.email.message}</p>
      </div>

      <div>
        <label>Giới tính:</label>
        <input type="radio" id="nam"  value="Nam" {...register("gender", { required: "Giới tính không được bỏ trống" })}/>
        <label htmlFor="nam">Nam</label>
        <input type="radio" id="nu" {...register("gender", { required: true })} />
        <label htmlFor="nu">Nữ</label>
        <p>{errors.gender && errors.gender.message}</p>
      </div>

      <div>
        <label htmlFor="birthday">Ngày sinh:</label>
        <input type="date" id="birthday" {...register("birthday", { required: "Ngày sinh không được bỏ trống" })} />
        <p>{errors.birthday && errors.birthday.message}</p>
      </div>

      <div>
        <label htmlFor="address">Địa chỉ:</label>
        <input type="text" id="address" {...register("address", { required: "Địa chỉ không được bỏ trống" })} />
        <p>{errors.address && errors.address.message}</p>
      </div>

      <div>
        <label htmlFor="bankName">Tên ngân hàng:</label>
        <input type="text" id="bankName" {...register("bankName", { required: "Tên ngân hàng không được bỏ trống"})} />
        <p>{errors.bankName && errors.bankName.message}</p>
      </div>

      <div>
        <label htmlFor="bankSeri">Số seri thẻ:</label>
        <input type="text" id="bankSeri"  {...register("bankSeri", { required: "Số tài khoản không được bỏ trống" })} />
        <p>{errors.bankSeri && errors.bankSeri.message}</p>
      </div>

      <div>
        <label htmlFor="password">Mật khẩu:</label>
        <input type="password" id="password" {...register("password", { required: "Mật khẩu không được bỏ trống" })} />
        <p>{errors.password && errors.password.message}</p>
      </div>
      <button type="submit">Đổi</button>
    </form>
  </div>
  )
}

export default Customer_info