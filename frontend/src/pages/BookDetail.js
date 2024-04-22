import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./BookDetail.css";
import BookList from "../components/products/BookList";
function BookDetail() {
  // Access the URL parameters using useParams
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetchBook();
    async function fetchBook() {
      const response = await fetch(`/api/books/${id}`);
      if (response.ok) {
        const json = await response.json();
        setBook(json);
      }
    }
  }, []);

  // Destructure properties from the book object outside the return statement
  // Now you can use the book ID (id) to fetch book details or perform other actions
  // For demonstration, let's just display the book ID

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
              <button className="cart"> Add to cart</button>
              <button className="Buy"> Buy now</button>
            </div>
          </div>
          <BookList name="Sách được gợi ý" />

          <div className="Comment-section">
            <p>Feedbacks</p>
            {book.feedbacks == null &&(
              <p>Chưa có đánh giá</p>
            ) }
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
