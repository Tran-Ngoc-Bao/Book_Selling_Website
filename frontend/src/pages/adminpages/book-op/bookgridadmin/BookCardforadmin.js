import React from "react";
import bookcard from "./BookCardforadmin.module.css";


function BookCardforadmin({ book }) {
  return (
    <div className={bookcard.BookCards_container}>
      <div className={bookcard.book_item}>
         <img
            src={`../images/${book._id}.jpeg`}
            width={50}
            height={50}
            alt={book.title}
          />
       
        <div className={bookcard.book_content}>
            <p className={bookcard.book_title}>{book.title}</p>
        </div>
        
      </div>
      <p className={bookcard.bookid}>{book._id}</p>
    </div>
  );
}

export default BookCardforadmin;
