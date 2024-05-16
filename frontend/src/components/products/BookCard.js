import React from "react";
import bookcard from "./BookCard.module.css";
import { Link } from "react-router-dom";

function BookCard({ book }) {
  return (
<<<<<<< Updated upstream
    <div className={bookcard.BookCards_container}>
      <div className={bookcard.book_item}>
        <Link
          to={{
            pathname: `/bookdetail/${book._id}`,
            state: { user: user },
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
              state: { user: user },
            }}
          >
            <p className={bookcard.book_title}>{book.title}</p>
=======
    <div className="BookCards_container">
      <div className="book-item">
        <Link to={{ 
          pathname: `/bookdetail/${book._id}`, 
        }}>
          <img src={`../images/${book._id}.jpeg`} width={200} height={200} alt={book.title} />
        </Link>
        <div className="book-content">
          <Link to={{ 
            pathname: `/bookdetail/${book._id}`, 
          }}>
            <p className="book-title">{book.title}</p>
>>>>>>> Stashed changes
          </Link>
          <p>Sold: {book.sold}</p>
          <p>Price: {book.price}$</p>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
