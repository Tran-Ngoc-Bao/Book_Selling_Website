import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const tokenSlice = createSlice({
  name: 'token_info',
  initialState: {
    accessTk: 0,
    refreshTk: null,
    _id: null
  },
  reducers: {
    setToken: (state, action) => {
      const { accessToken, refreshToken, existingCustomer,...rest } = action.payload;
      console.log("hello", accessToken)
      return {
        ...state,
        accessTk: accessToken,
        _id: existingCustomer._id,
        refreshTk: refreshToken
      };
    },
    updaterefreshTk:(state,action)=>{
      const {access_token}=action.payload;
      return {
        ...state,
        accessTk:action.payload
      }
    },
    selectAccessToken: (state) => {
      console.log("day la state: ", state.accessTk)
      return {...state,accessTk: state.accessTk}
  },
  logout:(state)=>{return{
    accessTk: 0,
    refreshTk: null,
    _id: null
  }}
}});

export function getnewTk (){
  return async function getnewTkbyThunk(dispatch,getState){
    console.log(getState().token.refreshTk)
    try{
      const response = await axios.post(
        '/api/customers/refreshtoken',
        {},
        {
          headers: {
            token: await getState().token.refreshTk
          }
        }
      );
      console.log(response)
      dispatch(updaterefreshTk(response.data.access_token))
      return response.data.access_token
    }catch(error){
      console.log(error)
    }
  }}
export const { setToken,updaterefreshTk,selectAccessToken,logout } = tokenSlice.actions;
 export const selectAccToken = ()=> {return async function Acc (dispatch,getState){const a= await getState().token.refreshTk
  return a
 }};
export const selectRefreshToken = (state) => state.token_info.refreshTk;

export default tokenSlice.reducer;

