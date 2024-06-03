import React from "react";
import BookGrid from "../components/products/BookGrid";
import Sidebar from "../components/sidebar/SideBar";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import styles from "./Book.module.css";

function Book() {
  return (
    <div className={styles.mainContainer}>
      <Header />
      <div className={styles.page_content}>
        <Sidebar />
        <BookGrid />
      </div>

      <Footer />
    </div>
  );
}

export default Book;
