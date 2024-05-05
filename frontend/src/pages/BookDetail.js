import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./BookDetail.css";
import BookList from "../components/products/BookList";
import UserContext from "../UserContext";
import { useContext } from "react";
import axios from "axios";

function BookDetail(props) {
  // Access the URL parameters using useParams
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setErr] = useState(null);
  const { user, logout, accesstk, getnewTk, setAccessTk, refreshtk, cart , setCart} = useContext(UserContext);
  const {giohang}= props
  useEffect(() => {
    if(user){async function fetchBook() {
      const response = await fetch(`/api/books/${id}`);
      if (response.ok) {
        const json = await response.json();
        setBook(json);
      }
    }
    
  fetchBook()};}
  , [user,refreshtk])

// bo truong __id tu cart lay ve tu server
function remove__id (getcart ){
  let repcart=[]
      getcart.map((book) => {
        let bookrep = {};
        bookrep.bookid = book.bookid;
        bookrep.quantity = book.quantity;
        repcart.push(bookrep);
      });
  return repcart
}

// Check if the book is already in the cart
function addcheckCart (checkcart){
  const isBookInCart = (checkcart.some((item) => item.bookid === id));
      if (!isBookInCart) {
        // If the book is not in the cart, add it
        const newbook = {
          bookid: id,
          quantity: 1,
        };
        checkcart.push(newbook);
      return checkcart
    }
    else{
      setErr("Sách đã có trong giỏ hàng")
    }
}

// prepare the cart to sent
function GetReadyCart(cart){
  const sentCart = { cart };
  console.log("cart send to backend:",sentCart);
  return sentCart
}

async function SentCart(readycart){
  try{
    const response = await axios.put(`/api/customers/update/${user._id}`, readycart, {
      headers: {
        token: accesstk,
      },
    });
    console.log("updated cart from backend:",response.data.updatedCustomer.cart);
    const newcart = response.data.updatedCustomer.cart
    giohang.current = newcart
    console.log(newcart)
  }catch (err){
    console.log(err)
    setErr(err)
  }
}

  async function AddToCart() {
    // if(user){
    console.log(user)
    console.log(giohang)
    let cartwoID= remove__id(giohang.current) // bo id 
    console.log('cart gốc: ',cartwoID)
    let added = addcheckCart(cartwoID) // them phan tu
    console.log('cart thêm mới: ',cartwoID)
    console.log(cartwoID!==added)

    let sentcart =GetReadyCart(added) // goi vao object
    console.log(sentcart)
    await SentCart(sentcart) // gui và nhan reply
    if(cartwoID!==added){ // neu them thanh cong
  
      let updatedCart=await SentCart(sentcart) // gui và nhan reply
      setCart(updatedCart) // cap nhat cart
      console.log("cart from backend:",updatedCart)
      setErr("Đã thêm vào giỏ hàng thành công")
    // }
    // else{
    //   setErr("Hãy đăng nhập")
    //   console.log(user)
    // }

    }
  }


  return (
    <div>
      {book && (
        <div>
          <div className="book">
            <img className="main-img" src={`../images/${id}.jpeg`} alt="anh" />

            <div className="bookdetail">
              <p className="title">{book.title}</p>

              <div className="author">
                <p>Tác giả: </p>
                <div className="author-name">
                  {book.authors.map((author) => (
                    <p key={author}>{author}</p>
                  ))}
                </div>

                <div className="genres">
                  <p>Thể loại: </p>
                  <div className="genre-name">
                    {book.genres.map((genre) => (
                      <p key={genre}>{genre}</p>
                    ))}
                  </div>
                </div>

                <p className="price">${book.price}</p>

                <div className="rate&price">
                  <p className="rating">{book.rate}/5</p>
                  <p className="sold">sold: {book.sold}</p>
                </div>
              </div>
              <div className="detail"></div>
              <button onClick={AddToCart} className="cart">
                Add to cart
              </button>
              <p>{error}</p>

              <button className="Buy"> Buy now</button>
            </div>
          </div>
          <BookList name="Sách được gợi ý" />

          <div className="Comment-section">
            <p>Feedbacks</p>
            {book.feedbacks == null && <p>Chưa có đánh giá</p>}
            {book.feedbacks != null && (
              <div className="comments">
                {book.feedbacks != null && (
                  <div className="comments">
                    {book.feedbacks.map((feedback) => (
                      <div key={feedback.customerid}>
                        <p>User: {feedback.customerid}</p>
                        <p>Đánh giá {feedback.rate}/5</p>
                        <p>Nhận xét: {feedback.text} </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default BookDetail;
