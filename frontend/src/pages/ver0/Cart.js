import React, { useEffect, useState } from "react";
import CartItem from "../components/products/CartItem";
import UserContext from "../UserContext";
import { useContext } from "react";
import Popup from "../components/products/PopUp";
import axios from "axios";

function Cart(props) {
  const [buy, setBuy] = useState(false);
  function doBuy() {
    setBuy(true);
  }
  function closeBuy() {
    setBuy(false);
  }
  const [cost, setCost] = useState(0);
  function addToCost(price) {
    setCost((prevCost) => prevCost + price);
  }
  function removeFromCost(price) {
    setCost((prevCost) => prevCost - price);
  }
  const [purchase, setPurchase] = useState([]);

  function addToPurchase(item) {
    if (purchase.length !== 0) {
      let newpurchase = purchase.filter((curitem) => {
        return curitem.id !== item.id;
      });
      newpurchase = [...newpurchase, item];
      setPurchase(newpurchase);
      console.log("thanh toan: ", newpurchase);
    } else {
      setPurchase([...purchase, item]);
      console.log("thanh toan: ", [...purchase, item]);
    }
  }

  function removeFromPurchase(item) {
    if (purchase.length !== 0) {
      let newpurchase = purchase.filter((curitem) => {
        return curitem.id !== item.id;
      });
      setPurchase(newpurchase);
      console.log("thanh toan: ", newpurchase);
    }
  }

  const { user, getCart, accesstk } = useContext(UserContext);
  const [ccart, setCart] = useState(props.giohang.current);

  useEffect(()=>{
    setCart(props.giohang.current)
  },[props.giohang])

  const [purchasecost, setPurchasecost] = useState(0);
  function getPurchaseCost() {
    let temp = 0;
    for (let i = 0; i < purchase.length; i++) {
      temp += purchase[i].totalprice;
    }
    setPurchasecost(temp);
  }


  // remove book from cart
  async function remove(removebookid) {
    // Prepare new cart without the removed book
    const newcart = ccart.filter((item) => item.bookid !== removebookid);
    const cart = newcart.map((book) => {
      const { _id, ...rest } = book;
      return rest;
    });

    // Send the updated cart to the backend
    try {
      const response = await axios.put(
        `/api/customers/update/${user._id}`,
        { cart },
        {
          headers: {
            token: accesstk,
          },
        }
      );
      console.log("New cart from backend:", response.data.updatedCustomer.cart);
      setCart(response.data.updatedCustomer.cart);
      props.giohang.current=response.data.updatedCustomer.cart
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  }

  return (
    <>
    {console.log(props.giohang.current)}
      {user ? (
        <div>
          <div>Giỏ hàng</div>
          {ccart.map((book) => (
            <CartItem
              key={book.bookid}
              cost={cost}
              bookid={book.bookid}
              remove={remove}
              addToCost={addToCost}
              removeFromCost={removeFromCost}
              addToPurchase={addToPurchase}
              removeFromPurchase={removeFromPurchase}
            />
          ))}
          <p>Tổng giá trị giỏ hàng: {cost}$</p>
          <button
            className="Buy"
            onClick={() => {
              doBuy();
              getPurchaseCost();
            }}
          >
            Thanh toán
          </button>
          <Popup isOpen={buy} onClose={closeBuy}>
            <div className="Buycontainer">
              <h2>Kiem tra don hang</h2>
              {console.log(purchase)}
              {purchase &&
                purchase.map((item) => (
                  <div className="row" key={item.name}>
                    <br/>
                    <img
                      src={`../images/${item.id}.jpeg`}
                      width={50}
                      height={50}
                      alt={"buy book"}
                    />
                    <p>ten san pham: {item.name}</p>
                    <p>So luong: {item.quantity}</p>
                    <p>tam tinh: {item.totalprice}</p>
                    <br/>
                    <hr
                      style={{
                        color: "red",
                        backgroundColor: "red",
                        height: 3,
                        border: "none",
                      }}
                    />
                  </div>
                ))}
              <p>tk ngan hang {user.bank.name}</p>
              <p>so tk {user.bank.seri}</p>
              <p>Ship toi {user.address}</p>
              <p>tien don hang {purchasecost}</p>
              <p>tien ship</p>
              <hr
                style={{
                  color: "black",
                  backgroundColor: "black",
                  height: 5,
                }}
              />
              <p>Tong cong</p>
              <button className="order">Dat hang</button>
            </div>
          </Popup>
        </div>
      ) : (
        <p>Đăng nhập để xem giỏ hàng</p>
      )}
    </>
  );
}

export default Cart;
