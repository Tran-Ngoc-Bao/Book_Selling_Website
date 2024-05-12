import React from "react";
import BookList from "../components/products/BookList";

function Bkbosto(props) {
  return (
    <div>
      <div className="books">
        <BookList name="Promotion" user={props.user} /> {/*chua xu ly query*/}
        <BookList name="New Arrivals" user={props.user} />{" "}
        {/*chua xu ly query*/}
      </div>
    </div>
  );
}

export default Bkbosto;
