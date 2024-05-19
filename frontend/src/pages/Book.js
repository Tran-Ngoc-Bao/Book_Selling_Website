import React from 'react';
import BookGrid from '../components/products/BookGrid'
import Sidebar from '../components/sidebar/SideBar';
import styles from './Book.module.css';

function Book() {

 
  return (
    <div className={styles.mainContainer}>
      <Sidebar  />
      <BookGrid  />
    </div>
  );
}


export default Book