import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";
import "./BookList.css";
function BookList(props) {
  const [books, setBooks] = useState(null);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(12);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(`/api/books?p=${page}&limit=${limit}`);
      if (response.ok) {
        const json = await response.json();
        setBooks(json);
      }
    };
    fetchBooks();
  }, [page, limit]);

  // function nextPage() {
  //   setPage((prevPage) => prevPage + 1); // Correctly update page state
  // }

  // function backPage() {
  //   if (page > 0) {
  //     setPage((prevPage) => prevPage - 1); // Correctly update page state
  //   }
  // }

  function change(newlimit) {
    setLimit(newlimit);
  }
  return (
    <div className="container">
      <h2>{props.name}</h2>
      <div className="list-container">
        {books &&
          books.map((book) => (
            <React.Fragment key={book._id}>
              <br />
              <BookCard book={book} />
            </React.Fragment>
          ))}
      </div>

      {/* <button onClick={backPage}>PREVIOUS</button>
      <button onClick={nextPage}>NEXT</button>
      <br />
      <button
        onClick={() => {
          change(12);
        }}
      >
        12
      </button>
      <button
        onClick={() => {
          change(24);
        }}
      >
        24
      </button>
      <button
        onClick={() => {
          change(48);
        }}
      >
        48
      </button> */}
    </div>
  );
}

export default BookList;
