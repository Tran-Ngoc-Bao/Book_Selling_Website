import React from "react";
import bookcard from "./BookCard.module.css";
import { Link } from "react-router-dom";

function BookCard({ book }) {
  return (
    <div className={bookcard.BookCards_container}>
      <div className={bookcard.book_item}>
        <Link
          to={{
            pathname: `/bookdetail/${book._id}`,
          
          }}
        >
          <img
            src={`../images/${book._id}.jpeg`}
            width={200}
            height={200}
            alt={book.title}
          />
        </Link>
        <div className={bookcard.book_content}>
          <Link
            to={{
              pathname: `/bookdetail/${book._id}`,
              
            }}
          >
            <p className={bookcard.book_title}>{book.title}</p>
          </Link>
          <p>Đã bán: {book.sold}</p>
          <p>Giá: { book.price.toLocaleString()} VND</p>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
