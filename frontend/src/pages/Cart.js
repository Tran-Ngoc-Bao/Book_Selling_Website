import React, { useEffect, useState } from 'react';
import CartItem from '../components/products/CartItem';
import UserContext from "../UserContext";
import { useContext } from "react";
import axios from "axios";

function Cart(props) {
  const [cost, setCost] = useState(0);
  const addToCost = (price) => {
    setCost(prevCost => prevCost + price);
  };
  
  const { user, getCart, accesstk } = useContext(UserContext);
  const [ccart, setCart] = useState([]);

  // Fetch cart data
  useEffect(() => {
    const fetchCart = async () => {
      if (!user) return;
      try {
        const cartData = await getCart(user._id, accesstk);
        setCart(cartData);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, [user, accesstk]);

  // remove book from cart
  async function remove(removebookid) {
    // Prepare new cart without the removed book
    const newcart = ccart.filter(item => item.bookid !== removebookid);
    const cart = newcart.map(book => {
      const { _id, ...rest } = book;
      return rest;
    });
    
    // Send the updated cart to the backend
    try {
      const response = await axios.put(`/api/customers/update/${user._id}`, {cart}, {
        headers: {
          token: accesstk,
        },
      });
      console.log("New cart from backend:", response.data.updatedCustomer.cart);
      setCart(response.data.updatedCustomer.cart)
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  }
  

  return (
    <>
      {console.log(typeof ccart, ccart)}
      {user ? (
        <div>
          <div>Giỏ hàng</div>
          {ccart.map((book) => (
            <CartItem key={book.bookid} cost={cost} setCost={setCost} bookid={book.bookid} remove={remove} addToCost={addToCost}/>
          ))}
          <p>Tổng giá trị giỏ hàng: {cost}$</p>
        </div>
      ) : (
        <p>Đăng nhập để xem giỏ hàng</p>
      )}
    </>
  );
}

export default Cart;
