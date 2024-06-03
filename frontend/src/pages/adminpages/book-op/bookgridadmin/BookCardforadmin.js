import React from "react";
import bookcard from "./BookCardforadmin.module.css";
import { Link } from "react-router-dom";

function BookCardforadmin({ book }) {
  return (
    <div className={bookcard.BookCards_container}>
      <div className={bookcard.book_item}>
      <Link
          to={{
            pathname: `/admin/book/${book._id}`,
          
          }}
        >
         <img
            src={`../images/${book._id}.jpeg`}
            width={50}
            height={50}
            alt={book.title}
          />
       </Link>
        <div className={bookcard.book_content}>
            <p className={bookcard.book_title}>{book.title}</p>
        </div>
        
      </div>
      <p className={bookcard.bookid}>{book._id}</p>
    </div>
  );
}

export default BookCardforadmin;
