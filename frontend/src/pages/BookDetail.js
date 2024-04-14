import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

function BookDetail() {
  // Access the URL parameters using useParams
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const response = await fetch(`/book/${id}`);
      if (response.ok) {
        const json = await response.json();
        setBook(json);
      }
    };
    fetchBook();
  }, [id]);

  // Destructure properties from the book object outside the return statement
  const { Title, Authors, Genre, Price, Feedback } = book || {};

  // Now you can use the book ID (id) to fetch book details or perform other actions
  // For demonstration, let's just display the book ID
  return (
    <div>
      <h2>Book Detail</h2>
      <p>Book ID: {id}</p>
      {/* Render book details */}
      <p>Title: {Title}</p>
      <p>Authors: {Authors}</p>
      <p>Genre: {Genre}</p>
      <p>Price: {Price}</p>

      <p>
        Feedback:
        {Feedback ? (
          Feedback.map((feedback) => (
            <div key={feedback.CustomerId}>
              <p>
                User: {feedback.Name} rate {feedback.Rate}
              </p>
              <p>Review: {feedback.Text}</p>
            </div>
          ))
        ) : (
          <p>No feedback available</p>
        )}
      </p>

      {console.log(book)}
    </div>
  );
}

export default BookDetail;
