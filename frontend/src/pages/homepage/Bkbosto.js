import React from "react";
import BookList from "../../components/products/BookList";
import HomePageStyle from "./Bkbosto.module.css";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";

function Bkbosto(props) {
  return (
    <div className={HomePageStyle.Container}>
      <Header style={{ zIndex: 10000 }} />
      <div className={HomePageStyle.homepage}>
        <div className={HomePageStyle.banner}>
          <img
            src={require("../../images/banner/banner.png")}
            alt="facebook"
            className={HomePageStyle.top_banner}
            style={{ zIndex: 10 }} // Use double curly braces for inline styles in JSX
          />
        </div>
        <div className={HomePageStyle.promotion_books}>
          <span className={HomePageStyle.promotion_books_label}>
            Sách bán chạy nhất
          </span>
          <div className={HomePageStyle.promotion_books_product}>
            <BookList user={props.user} query={"sold"} /> {/*chua xu ly query*/}
          </div>
        </div>
        <div className={HomePageStyle.new_books}>
          <span className={HomePageStyle.new_books_label}>
            Sách được đánh giá cao nhất
          </span>
          <div className={HomePageStyle.new_books_product}>
            <BookList user={props.user} query={"rate"} /> {/*chua xu ly query*/}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default Bkbosto;
