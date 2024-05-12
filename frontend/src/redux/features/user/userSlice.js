import {  createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import{getnewTk} from './tokenSlide'

export const userSlice = createSlice({
name:"user_info",
  initialState: {
    // Initial state goes here
    _id : null,
    address: null,
    bank: null, 
    birthday: null, 
    gender: null, 
    email: null, 
    phone: null, 
    name: null, 
    password: null,
  },
  reducers: {
    setUser: (state, action) => {
      const { _id, address, bank, birthday, email, gender, name, phone, password, ...rest } = action.payload;
      const user_info = { _id, address, bank, birthday, email, gender, name, phone, password }; 
      return { ...state, ...user_info };
    },
    updateUser: (state, action) => {
      const { address, bank, birthday, gender, email, phone, name, password, ...rest } = action.payload;
      const user_info = { address, bank, birthday, gender, name, password }; 
      return { ...state, ...user_info };
    }
  }
});

export const { setUser, updateUser } = userSlice.actions;

    export function sentUser (user){
    return async function sentUserBythunk(dispatch,getState){
        let { address, bank, birthday, email, gender, name, phone, password, ...rest }=user// object truyen vao
        let temp =getState().user // state hien tai

        //  console.log("day la: ",temp._id)
        let tk = getState().token
        // console.log("day la token: ",tk.accessTk)
        let  newuser
        if(email===temp.email){
          if (phone===temp.phone){
            newuser={address, bank, birthday, gender, name, password}
          }else{
            newuser={address, bank, birthday, gender, name, password,phone}
          }
        }else{
          if (phone===temp.phone){
            newuser={address, bank, birthday, gender, name, password,email}
          }
          else{
            newuser={address, bank, birthday, gender, name, password,phone,email}
          }
        }
          
    
        try{
            const response = await axios.put(`/api/customers/update/${temp._id}`, newuser, {
                headers: {
                    token: tk.accessTk
                }
                });
                // console.log(response.data.updatedCustomer)
        dispatch(updateUser(response.data.updatedCustomer))
        }catch(error){
          try{
            const newtk = await dispatch(getnewTk())
            try{
              const response = await axios.put(`/api/customers/update/${temp._id}`, newuser, {
                  headers: {
                      token: newtk
                  }
                  });
                  // console.log(response.data.updatedCustomer)
          dispatch(updateUser(response.data.updatedCustomer))
          }catch(err){
            console.log(err)
          }

        }catch(err){
          console.log(err)
        }
    } 
    }}

    export const showUserinfo = ()=> {return async function Show (dispatch,getState)
      {const a= await getState().user
        const { _id, address, bank, birthday, email, gender, name, phone, password, ...rest } =a;
        const t={_id, address, bank, birthday, email, gender, name, phone, password}
      return t
     }};

export default userSlice.reducer;
