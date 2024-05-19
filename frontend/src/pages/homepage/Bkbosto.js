import React from "react";
import BookList from "../../components/products/BookList";
import HomePageStyle from "./Bkbosto.module.css";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";

function Bkbosto(props) {
  return (
    <div className={HomePageStyle.homepage}>
      <Header />

      <div className={HomePageStyle.banner}>
        <img
          src={require("../../images/banner/banner.png")}
          alt="facebook"
          className={HomePageStyle.top_banner}
        />
      </div>
      <div className={HomePageStyle.promotion_books}>
        <span className={HomePageStyle.promotion_books_label}>
          Sách bán chạy nhất
        </span>
        <div className={HomePageStyle.promotion_books_product}>
          <BookList user={props.user} /> {/*chua xu ly query*/}
        </div>
      </div>
      <div className={HomePageStyle.new_books}>
        <span className={HomePageStyle.new_books_label}>Sách mới nhập</span>
        <div className={HomePageStyle.new_books_product}>
          <BookList user={props.user} /> {/*chua xu ly query*/}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Bkbosto;
