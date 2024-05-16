import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from './BookCard';
import './BookGrid.css';

function BookGrid() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/api/books/getall');
        console.log(response.data);
        setBooks(response.data.books);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="book-grid">
      {books.map(book => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
}

export default BookGrid;
