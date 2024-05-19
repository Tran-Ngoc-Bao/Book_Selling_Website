import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BookCard from './BookCard';
import './BookGrid.css';
import { nextpageasync, prevpageasync } from '../../redux/features/product/productSlice';

function BookGrid() {
  const dispatch = useDispatch();
  const { books, pagination } = useSelector(state => state.product);

  const next = async () => {
    await dispatch(nextpageasync());
  };

  const prev = async () => {
    await dispatch(prevpageasync());
  };

  return (
    <div>
      <div className="book-grid">
        {books.length > 0 ? (
          books.map(book => (
            <BookCard key={book._id} book={book} />
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>
      
      <div className="pagination">
        <button onClick={prev} disabled={pagination.currpage === 1}>Previous Page</button>
        <p>{pagination.currpage}/{pagination.maxpage}</p>
        <button onClick={next} disabled={pagination.currpage === pagination.maxpage}>Next Page</button>
      </div>
    </div>
  );
}

export default BookGrid;
