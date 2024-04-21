import React from "react";
import BookList from "../components/products/BookList";

function Bkbosto() {
  

  return (
    <div>
      <h1>Home page</h1>
      <div className="books">
      <BookList name ='Promotion'/> {/*chua xu ly query*/}
      <BookList name ='New Arrivals'/> {/*chua xu ly query*/}
      </div>
    </div>
  );
}

export default Bkbosto;
