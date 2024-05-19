import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userSlice'
import cartReducer from './features/cart/cartSlice'
import tokenReducer from './features/user/tokenSlide'
import  purchaseReducer from './features/product/purchaseSlice'
import productReducer from './features/product/productSlice'

// const middleware = getDefaultMiddleware();

export default configureStore({
  reducer: {
    token:tokenReducer,
    user: userReducer,
    cart: cartReducer,
    purchase: purchaseReducer,
    product: productReducer
  }
})

