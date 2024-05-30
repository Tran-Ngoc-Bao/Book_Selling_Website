import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BookCardforadmin from './BookCardforadmin';
import { nextpageasync, prevpageasync } from '../../../../redux/features/product/productSlice';
import styles from './BookGridforAdmin.module.css'; // Import the CSS module

function BookGridforAdmin() {
  const dispatch = useDispatch();
  const { books, pagination } = useSelector(state => state.product);

  const next = async () => {
    await dispatch(nextpageasync());
  };

  const prev = async () => {
    await dispatch(prevpageasync());
  };

  return (
    <div className={styles.container}>
      <div className={styles['book-grid']}> {/* Use the CSS module class */}
        {books.length > 0 ? (
          books.map(book => (
            <BookCardforadmin key={book._id} book={book} />
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>
      
      <div className={styles.pagination}> {/* Use the CSS module class */}
        <button onClick={prev} disabled={pagination.currpage === 1}>Previous Page</button>
        <p>{pagination.currpage}/{pagination.maxpage}</p>
        <button onClick={next} disabled={pagination.currpage === pagination.maxpage}>Next Page</button>
      </div>
    </div>
  );
}

export default BookGridforAdmin;
