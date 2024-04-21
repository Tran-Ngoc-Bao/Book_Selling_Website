import React from "react";
import { Link } from "react-router-dom";

function BookCard({ book }) {
  return (
    <div className="productCard_container">
      {/* Pass the book ID as a parameter in the URL */}
      <Link to={`/books/${book._id}`}>
        <div className="bookContent">
          <p>Product Name: {book.Title}</p>
          <p>Author Name: {book.Authors}</p>
          <p>Rating: {book.Rate}</p>
          <p>Sold: {book.Sold}</p>
          <p>Price: {book.Price}</p>
        </div>
      </Link>
    </div>
  );
}

export default BookCard;
