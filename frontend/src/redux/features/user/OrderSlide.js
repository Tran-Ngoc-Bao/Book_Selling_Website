import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getnewTk } from "./tokenSlide";
import {removeCartAsync} from '../cart/cartSlice'
import {resetPurchase} from '../product/purchaseSlice'

export const orderSlice = createSlice({
  name: "order_info",
  initialState: {
    order_list: [],
  },
  reducers: {
    setList: (state, action) => {
      return { ...state, order_list: action.payload };
    },
  },
});

export function getOrder() {
  return async function fetchOrder(dispatch, getState) {
    let id = await getState().token._id;
    // const id = user.user._id;
    let token = await getState().token;
    try {
      const rep = await axios.get(`/api/customers/order/${id}`, {
        headers: {
          token: token.accessTk,
        },
      });
      console.log(rep);
      dispatch(setList(rep.data));
    } catch {
      try {
        const newtk = await dispatch(getnewTk());
        const rep = await axios.get(`/api/customers/order/${id}`, {
          headers: {
            token: newtk,
          },
        });
        console.log(rep);
        dispatch(setList(rep.data));
      } catch (err) {
        console.log(err);
      }
    }
  };
}
export function createOrder() {
  return async function newOrder(dispatch, getState) {
    await dispatch(getOrder())
    let id = await getState().token._id;
    let tk = await getState().token;
    let order = await getState().order.order_list;
    let purchase = await getState().purchase.bookbuy;
    let neworder = [];
    // make copy of current order
    order.map((item) => {
      const book = {
        bookid: item.bookid,
        shipprice: 20000,
        quantity: item.quantity,
        status: item.status,
      };
      neworder.push(book);
    });

    // add book from purchase to the neworder
    purchase.map((item) => {
      const book = {
        bookid: item.bookid,
        shipprice: 20000,
        quantity: item.quantity,
        status: "CGH",
      };
      neworder.push(book);
    });
    // update the order backend
    try {
      const response = await axios.put(
        `/api/customers/update/${id}`,
        { order: neworder },
        {
          headers: {
            token: tk.accessTk,
          },
        }
      );
      // console.log(response.data.updatedCustomer)
      dispatch(setList(response.data.updatedCustomer.order))
      alert(response.data.message)
      // when the order is success
        // delete ordered items from cart
      purchase.map(async (item) => {
        await dispatch(removeCartAsync(item.bookid))
      })
        // set purchase to null
        dispatch(resetPurchase())
      return true
    } catch (error) {
      try {
        const newtk = await dispatch(getnewTk());
        try {
          const response = await axios.put(
            `/api/customers/update/${id}`,
            { order: neworder },
            {
              headers: {
                token: newtk,
              },
            }
          );
          // console.log(response.data.updatedCustomer)
          dispatch(setList(response.data.updatedCustomer.order))
          alert(response.data.message)
          // when the order is success
            // delete ordered items from cart
          purchase.map(async (item) => {
            await dispatch(removeCartAsync(item.bookid))
          })
            // set purchase to null
            dispatch(resetPurchase())
            return true
        } catch (err) {
          console.log(err);
          return false
        }
      } catch (err) {
        console.log(err);
        
      }
    }
  };
}
export const { setList } = orderSlice.actions;
export default orderSlice.reducer;
