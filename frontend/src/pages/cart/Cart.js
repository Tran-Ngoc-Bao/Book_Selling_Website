import React, { useEffect, useState } from "react";
import CartItem from "../../components/products/cartItem/CartItem";
import Popup from "../../components/products/PopUp";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addCartAsync,
  removeCartAsync,
} from "../../redux/features/cart/cartSlice";
import { Cart_setPurchase } from "../../redux/features/product/purchaseSlice";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import CartStyle from "./Cart.module.css";

// cart va purchase
// purchase co dang  bookbuy:[],totalPrice:0,shipprice:0,
// quan ly local = purchase_local
// khi an thanh toan thi hop nhat purchase_local voi purchase.bookbuy = ham Cart_setPurchase
// truyen cho Cart Item
// truyen cho pop up
function Cart() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { login } = user;
  const cart_info = useSelector((state) => state.cart);
  const { book, price } = cart_info; // chua id sach, ten sach, gia sach

  const [buy, setBuy] = useState(false);
  const [purchase, setPurchase] = useState([]);

  async function doBuy() {
    console.log("day la pc", purchase);
    const reply = await dispatch(Cart_setPurchase(purchase));
    setBuy(true);
  }
  function closeBuy() {
    setBuy(false);
  }

  function addToPurchase(item) {
    if (purchase.length !== 0) {
      // co the ko can check lap khi add to purchase
      let newpurchase = purchase.filter((curitem) => {
        return curitem.bookid !== item.bookid;
      });
      newpurchase = [...newpurchase, item];
      setPurchase(newpurchase);
      dispatch(Cart_setPurchase(newpurchase));
      console.log("thanh toan: ", newpurchase);
    } else {
      setPurchase([...purchase, item]);
      console.log("thanh toan: ", [...purchase, item]);
    }
  }

  function removeFromPurchase(item) {
    if (purchase.length !== 0) {
      let newpurchase = purchase.filter((curitem) => {
        return curitem.bookid !== item.bookid;
      });
      setPurchase(newpurchase);
      dispatch(Cart_setPurchase(newpurchase));
      console.log("thanh toan: ", newpurchase);
    }
  }

  const [purchasecost, setPurchasecost] = useState(0);
  function getPurchaseCost() {
    let temp = 0;
    for (let i = 0; i < purchase.length; i++) {
      temp += purchase[i].totalprice;
    }
    setPurchasecost(temp);
  }

  function rmCart(id) {
    dispatch(removeCartAsync(id));
  }

  return (
    <div className={CartStyle.cart_page}>
      <Header />

      <div className={CartStyle.cart_page_content}>
        <>
          {login ? (
            <div className={CartStyle.log_in_notification}>
              <h3 className={CartStyle.log_in_title}>Giỏ hàng</h3>
              {(book.length==0)?(
                <h3>Giỏ hàng trống</h3>
              ):(
                <div className={CartStyle.added_product}>
                {book.map((book) => (
                  <CartItem
                    key={book._id}
                    _id={book._id}
                    remove={rmCart}
                    addToPurchase={addToPurchase}
                    removeFromPurchase={removeFromPurchase}
                  />
                ))}
                 <button
                className={CartStyle.buy_button}
                onClick={async () => {
                  await doBuy();
                  getPurchaseCost();
                }}
              >
                Thanh toán
              </button>
              
              <Popup isOpen={buy} onClose={closeBuy}></Popup>
              </div>
              )}
            </div>
          ) : (
            <div className={CartStyle.no_login_notification}>
              <span className={CartStyle.no_login_title}>
                Đăng nhập để xem giỏ hàng của bạn
              </span>
              <div className={CartStyle.no_login_notification_link}>
                <Link to="/login">
                  <p>Đăng nhập</p>
                </Link>
              </div>
            </div>
          )}
        </>
      </div>

      <Footer />
    </div>
  );
}

export default Cart;
