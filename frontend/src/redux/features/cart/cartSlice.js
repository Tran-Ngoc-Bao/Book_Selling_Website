import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import{getnewTk} from '../user/tokenSlide'

export const cartSlice = createSlice({
  name: 'cart_info',
  initialState: {
    cart: [],
    price: 0,
    book:[]
  },
  reducers: {
    setCart: (state, action) => {
      const { cart } = action.payload;
      
      // Remove _id field from each object in the cart array
      const updatedCart = cart.map(item => {
        const { _id, ...rest } = item;
        return rest;
      });
      return {...state,cart:updatedCart}
    }
    ,
    addToCart: (state, action) => {
      const  _id  = action.payload;
      let isIn = false;
      // Check if item is already in cart
      for (let i = 0; i < state.cart.length; i++) {
        if (state.cart[i].bookid === _id) {
          isIn = true;
          return state;
        }
      }
      if (!isIn) {
        // If item is not in cart, add it
        state.cart.push({ bookid: _id, quantity: 1 });
      }
    },
    removeFromCart:(state,action)=>{
      const  bookid  = action.payload;
      const newcart=state.cart.filter((item)=>bookid!==item.bookid)
      console.log("remove thanh cong: ",newcart)
      return { ...state, cart: newcart };
    },
    addInfo:(state,action)=>{
      console.log("this is: ",action.payload)
      return {...state,book:action.payload}
    },
    calTotalPrice:(state,action)=>{
      let total=0
      const books= state.book
      books.forEach((item) => {
        total += item.price;
      });
      return {...state,price:total}
    }
  },
});

function getInfoBookinCart() {
  return async function GetinfoBythunk(dispatch, getState) {
    try {
      let container = getState().cart;
      let arr = container.cart;
      let infoarr = await Promise.all(
        arr.map(async (item) => {
          try {
            const response = await axios.get(`/api/books/getone/${item.bookid}`);
            const { _id, title, price } = response.data;
            console.log(title);
            return { _id, title, price };
          } catch (error) {
            console.log(error);
            return null;
          }
        })
      );
      console.log("This is infoarr:", infoarr);
      dispatch(addInfo(infoarr.filter(item => item !== null))); // Dispatch action with filtered infoarr
    } catch (error) {
      console.error(error);
    }
  };
}

function updateBackEndCart() {
  return async function updateCartBE(dispatch, getState) {
    let tk = getState().token
    let container = await getState().cart.cart;
    // const newcart=container.filter((item)=>bookid!==item.bookid)
    console.log("day laf:" ,container)
    try {
      const response = await axios.put(
        `/api/customers/update/${tk._id}`,
         {cart: container} ,
        {
          headers: {
            token:  tk.accessTk,
          },
        }
      );
      console.log("New cart from backend:", response.data);

      dispatch(setCart(response.data.updatedCustomer));

    } catch (error) {
      console.error("Error updating cart:", error);
      try{
        const newtk = await dispatch(getnewTk())
        const response = await axios.put(
          `/api/customers/update/${tk._id}`,
          {cart: container} ,
          {
            headers: {
              token:  newtk,
            },
          }
        );
        console.log("New cart from backend:", response.data);
        dispatch(setCart(response.data.updatedCustomer));
      
      }catch(err){
        console.error("Error updating cart with new token:", err);
      }
    }
  }
}



  export  const  setIntialCart = (rep) => {
    return async (dispatch) => {
      await dispatch(setCart(rep));
      await dispatch(getInfoBookinCart());
      dispatch(calTotalPrice())
    };
  };

  export const addCartAsync = (prop) => {
    return async (dispatch, getState) => {
      try {
        const { user, cart } = getState();
        if (!user.login) {
          return ("not logged in");
        }
        // Dispatch 'addToCart' action and wait for its completion
        await dispatch(addToCart(prop));
        // Check if the item was successfully added to the cart
        const updatedCart = getState().cart;
        if (updatedCart === cart) {
          // throw new Error("Item already in the cart");
          return("Item already added to cart");
        }
  
        // Dispatch other actions
        await dispatch(getInfoBookinCart());
        dispatch(calTotalPrice());
        dispatch(updateBackEndCart());
  
        // Dispatch action to indicate success
        return("Item added to cart");
      } catch (error) {
        console.error("Error adding item to cart:", error);
        // Dispatch action to indicate error
       return ("failed")
      }
    };
  };
  

  export const removeCartAsync=(prop)=>{
    return async (dispatch) => {
      await dispatch(removeFromCart(prop))
      await dispatch(getInfoBookinCart())
      await dispatch(calTotalPrice())
    dispatch(updateBackEndCart())}
  }


export const { setCart, addToCart,addInfo,calTotalPrice,removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
