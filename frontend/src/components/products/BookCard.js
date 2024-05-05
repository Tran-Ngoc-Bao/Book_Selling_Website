import React from "react";
import './BookCard.css'
import { Link } from 'react-router-dom';

function BookCard({ book, user }) {
  return (
    <div className="BookCards_container">
      <div className="book-item">
        <Link to={{ 
          pathname: `/bookdetail/${book._id}`, 
          state: { user: user }
        }}>
          <img src={`../images/${book._id}.jpeg`} width={200} height={200} alt={book.title} />
        </Link>
        <div className="book-content">
          <Link to={{ 
            pathname: `/bookdetail/${book._id}`, 
            state: { user: user }
          }}>
            <p className="book-title">{book.title}</p>
          </Link>
          <p>Sold: {book.sold}</p>
          <p>Price: {book.price}$</p>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
