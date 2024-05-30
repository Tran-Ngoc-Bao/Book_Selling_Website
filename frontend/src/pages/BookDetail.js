import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import bookdetail from "./BookDetail.module.css";
import BookList from "../components/products/BookList";
import axios from "axios";
import { addCartAsync, calTotalPrice } from "../redux/features/cart/cartSlice";
import { PrductDetail_setPurchase } from "../redux/features/product/purchaseSlice";
import { useSelector, useDispatch } from "react-redux";
import Popup from "../components/products/PopUp";
import CommentBox from "../components/products/CommentBox";
import CommentList from "../components/products/CommentList";
function BookDetail(props) {
  // Access the URL parameters using useParams
  const dispatch = useDispatch();
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setErr] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [buy, setBuy] = useState(false);

  const [feedbacks, setFeedbacks] = useState();
  const login = useSelector((state) => state.user.login);

  function closeBuy() {
    setBuy(false);
  }
  useEffect(() => {
    {
      async function fetchBook() {
        const response = await axios.get(`/api/books/getone/${id}`);
        setBook(response.data);
        setFeedbacks(response.data.feedbacks);
        console.log("day la feedback tu server", response.data.feedbacks);
      }

      fetchBook();
    }
  }, [id]);

  useEffect(() => {
    setErr(null);
  }, [id]);

  async function AddToCart() {
    const rep = await dispatch(addCartAsync(id));
    setErr(rep);
  }

  function AddtoPurchase() {
    const obj = {
      bookid: id,
      quantity: quantity,
      pricePerBook: book.price,
      totalprice: quantity * book.price,
    };
    console.log("add to :", obj);
    try {
      const rep = dispatch(PrductDetail_setPurchase(obj));
      setBuy(true);
    } catch (err) {
      setErr(err);
    }
  }
  const Increase = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const Decrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <div>
      {book && (
        <div>
          <div className={bookdetail.book}>
            <img
              className={bookdetail.main_img}
              src={`../images/${id}.jpeg`}
              alt="anh"
            />

            <div className={bookdetail.bookdetail}>
              <p className={bookdetail.title}>{book.title}</p>

              <div className={bookdetail.author}>
                <p>Tác giả: </p>
                <div className={bookdetail.author_name}>
                  {book.authors.map((author) => (
                    <p key={author}>{author}</p>
                  ))}
                </div>

                <div className={bookdetail.genre}>
                  <p>Thể loại: </p>
                  <div className={bookdetail.genre_name}>
                    {book.genres.map((genre) => (
                      <p key={genre}>{genre}</p>
                    ))}
                  </div>
                </div>

                <p className={bookdetail.price}>${book.price}</p>

                <div className={bookdetail.rate_price}>
                  <p className={bookdetail.rating}>{book.rate}/5</p>
                  <p className={bookdetail.sold}>sold: {book.sold}</p>
                </div>
              </div>
              <div className={bookdetail.detail}></div>

              <button onClick={Increase}>+</button>
              <span>{quantity}</span>
              <button onClick={Decrease}>-</button>
              <br />
              <br />
              <button onClick={AddToCart} className={bookdetail.cart}>
                Add to cart
              </button>
              <p>{error}</p>

              <button className={bookdetail.buy} onClick={AddtoPurchase}>
                {" "}
                Buy now
              </button>
              <Popup isOpen={buy} onClose={closeBuy}></Popup>
            </div>
          </div>
          <BookList name="Sách được gợi ý" />
          <h3>Bình luận của khách hàng: </h3>
          <div className={bookdetail.comment_section}>
            <CommentList feedback={feedbacks} />
          </div>
          <div>
            <h3>Nhận xét của bạn: </h3>
            <CommentBox setFeedbacks={setFeedbacks} />
          </div>
        </div>
      )}
    </div>
  );
}

export default BookDetail;
