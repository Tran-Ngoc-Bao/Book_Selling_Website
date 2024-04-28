import React, { useEffect, useState } from 'react'
import axios from "axios";
import UserContext from "../../UserContext";
import { useContext } from "react";

function CartItem(props) {
    // const [bookC,setBookC]=useState(0)
    const { user, accesstk } = useContext(UserContext);

    const [quantity, setQuantity]=useState(1)
    const [book,setBook]=useState(null)
    const { cost, setCost,bookid, addToCost } = props;

    useEffect(() => {
        async function booka() {
            const fetchedBook = await axios.get(`/api/books/${bookid}`);
            setBook(fetchedBook.data);
            console.log(fetchedBook.data.price);
            console.log(cost)
            addToCost(fetchedBook.data.price)
        }
        booka()
    }, [user]);

    // price = props.cost+book.price
    // props.setCost(price)
    
function increase(prev) {
    setQuantity(quantity + 1);
    setCost(prevCost => prevCost + book.price);
}

function decrease(prev) {
    if(quantity>1){
        setQuantity(quantity - 1);
    setCost(prevCost => prevCost - book.price);
    }
}

function remove() {
    // Calculate the price of the removed book
    const removedBookPrice = book.price * quantity;
    // Update the cart and cost states
    setCost(prevCost => prevCost - removedBookPrice);
    // Remove the book from the parent component's cart state using its id
    props.remove(bookid);
  }


  return (
    <div>
        {book&&<p>{book.title}</p> }
        {book&&<img src={`../images/${book._id}.jpeg`} width={70} height={70} alt={'small book'} />}
        {book&&<button onClick={increase}>+</button>}
        <span>{quantity}</span>
        {book&&<button onClick={decrease}>-</button> }
        <button onClick= {remove}>Remove</button>
    </div>
    
  )
}

export default CartItem