import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import bookdetail from "./BookDetail.module.css";
import BookList from "../components/products/BookList";
import axios from "axios";
import { addCartAsync } from "../redux/features/cart/cartSlice";
import { useSelector, useDispatch } from "react-redux";

function BookDetail(props) {
  // Access the URL parameters using useParams
  const dispatch = useDispatch();
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setErr] = useState(null);

  useEffect(() => {
    {
      async function fetchBook() {
        const response = await axios.get(`/api/books/${id}`);

        setBook(response.data);
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

  return (
    <div>
      {book && (
        <div>
          <div className={bookdetail.book}>
            <img
              className={bookdetail.main_image}
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
              <button onClick={AddToCart} className={bookdetail.cart}>
                Add to cart
              </button>
              <p>{error}</p>

              <button className={bookdetail.buy}> Buy now</button>
            </div>
          </div>
          <BookList name="Sách được gợi ý" />

          <div className={bookdetail.comment_section}>
            <p>Feedbacks</p>
            {book.feedbacks == null && <p>Chưa có đánh giá</p>}
            {book.feedbacks != null && (
              <div className={bookdetail.comment}>
                {book.feedbacks != null && (
                  <div className={bookdetail.comment}>
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
