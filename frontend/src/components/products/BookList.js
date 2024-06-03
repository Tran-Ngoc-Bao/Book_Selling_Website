import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";
import booklist from "./BookList.module.css";
import axios from "axios";
function BookList(props) {
  const [books, setBooks] = useState(null);
  const sort = props.query;

  useEffect(() => {
    fetchData();
    async function fetchData() {
      try {
        const response = await axios.get(`/api/books/getall?sortBy=${sort}`);
        console.log(response.data);
        setBooks(response.data.books);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }, []);

  // function change(newlimit) {
  //   setLimit(newlimit);
  // }
  return (
    <div className={booklist.container}>
      <span className={booklist.name}>{props.name}</span>
      <div className={booklist.list_container}>
        {books &&
          books.map((book) => (
            <React.Fragment key={book._id}>
              <br />
              <BookCard book={book} user={props.user} />
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
