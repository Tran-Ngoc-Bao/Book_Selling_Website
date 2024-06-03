import {  createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getnewTk, logout as tokenLogout } from './tokenSlide';

export const userSlice = createSlice({
name:"user_info",
  initialState: {
    // Initial state goes here
    login: false,
    isadmin : false,
    user:{_id : "",
      address: '',
      bank: null, 
      birthday: null, 
      gender: null, 
      email: null, 
      phone: null, 
      name: null, 
      password: null,
    },
      error: null
  },
  reducers: {
    setUser: (state, action) => {
      console.log("thong tin dang nhap: ",action.payload)
      
      const { _id, address, bank, birthday, email, gender, name, phone, password } = action.payload;
       ; 
      return { ...state, user:{ _id, address, bank, birthday, email, gender, name, phone, password }, login : true };
    },
    updateUser: (state, action) => {
      console.log("trong ham update", action.payload)
      const {  address, bank, birthday, email, gender, name, phone, password } = action.payload; 
      return {  ...state, user:{  address, bank, birthday, email, gender, name, phone, password }};
    },
    setError:(state, action) =>{
      return { ...state,error: action.payload };
    },
    setAdmin:(state)=>{
      return{ ...state,isadmin:true };
    },    
    logOut: (state) => {
      return {
        // Initial state goes here
        login: false,
        isadmin : false,
        user:{_id : "",
          address: null,
          bank: null, 
          birthday: null, 
          gender: null, 
          email: null, 
          phone: null, 
          name: null, 
          password: null,
        },
          error: null
      };
    },
  }
});

export const { setUser, updateUser,setError,logOut,setAdmin } = userSlice.actions;

    export function sentUser (user){
    return async function sentUserBythunk(dispatch,getState){
        let { address, bank, birthday, email, gender, name, phone, password, ...rest }=user// object truyen vao
        let temp =getState().user.user
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
            const response = await axios.put(`/api/customers/update/${tk._id}`, newuser, {
                headers: {
                    token: tk.accessTk
                }
                });
                // console.log(response.data.updatedCustomer)
                dispatch(setError("success"))
                console.log("response",response.data)
        dispatch(updateUser(response.data.updatedCustomer))
        }catch(error){
          try{
            const newtk = await dispatch(getnewTk())
            try{
              const response = await axios.put(`/api/customers/update/${tk._id}`, newuser, {
                  headers: {
                      token: newtk
                  }
                  });
                  // console.log(response.data.updatedCustomer)
          dispatch(updateUser(response.data.updatedCustomer))
          dispatch(setError("success"))
          }catch(err){
            console.log(err)
          }

        }catch(err){
          console.log(err)
          dispatch(setError(err))
        }
    } 
    }}


     export const logoutAsync = () => {
      return async (dispatch) => {
        await dispatch(tokenLogout());
        dispatch(logOut());
      };
    };
    
export default userSlice.reducer;
