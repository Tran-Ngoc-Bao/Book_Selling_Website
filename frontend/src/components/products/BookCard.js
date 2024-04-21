import React from "react";
import './BookCard.css'
function BookCard({ book }) {
  return (
    <div className="BookCards_container">
      <div className="book-item">
        <a href={`/bookdetail/${book._id}`}>
            <img src={`../images/${book._id}.jpeg`} width={200} height={200} alt={book.title} />
        </a>
        <div className="book-content">
          <a href={`/bookdetail/${book._id}`}>
          <p className="book-title">{book.title}</p>
        </a>
        <p>Sold: {book.sold}</p>
        <p>Price: {book.price}$</p>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
