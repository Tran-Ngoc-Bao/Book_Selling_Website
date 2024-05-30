import { createSlice } from '@reduxjs/toolkit';


export const purchaseSlice = createSlice({
  name: 'purchase_info',
  initialState: {
    bookbuy:[],
    totalPrice:0,
    shipprice:0,
  },
  reducers: {
    PrductDetail_setPurchase: (state, action) => { //take object argument
      const { bookid, quantity,pricePerBook, totalprice } = action.payload;

      const book=[{bookid:bookid,quantity:quantity,pricePerBook:pricePerBook,totalprice:totalprice }]
      const price = pricePerBook*quantity
      console.log("day la2: ", price)
      return {...state,bookbuy:book,totalPrice:price }
    }
    ,
    Cart_setPurchase: (state, action) => { 
      let cost = 0;
      action.payload.map((item) => {
          cost += item.price * item.quantity;
          return undefined; // Explicitly return undefined
      });
      return { ...state, bookbuy: action.payload, totalPrice: cost };
  },
  resetPurchase : (state,action)=>{
    return {
      bookbuy:[],
      totalPrice:0,
      shipprice:0,
    }
  }
  
    },
})
    
// function to send to backend thanh toans


export const { PrductDetail_setPurchase,Cart_setPurchase,resetPurchase } = purchaseSlice.actions;

export default purchaseSlice.reducer;
