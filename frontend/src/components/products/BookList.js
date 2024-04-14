import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";

function BookList(props) {
  const [books, setBooks] = useState(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(`/books?p=${page}`);
      if (response.ok) {
        const json = await response.json();
        setBooks(json);
      }
    };
    fetchBooks();
  }, [page]);

  function nextPage() {
    setPage((prevPage) => prevPage + 1); // Correctly update page state
  }

  function backPage() {
    if (page > 0) {
      setPage((prevPage) => prevPage - 1); // Correctly update page state
    }
  }

  return (
    <>
      {books &&
        books.map((book) => (
          <React.Fragment key={book._id}>
            <br />
            <BookCard book={book} />
          </React.Fragment>
        ))}
      <button onClick={backPage}>PREVIOUS</button>
      <button onClick={nextPage}>NEXT</button>
    </>
  );
}

export default BookList;
