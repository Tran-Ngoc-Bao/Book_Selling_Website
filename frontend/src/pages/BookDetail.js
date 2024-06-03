import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import bookdetail from "./BookDetail.module.css";
import BookList from "../components/products/BookList";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import axios from "axios";
import { addCartAsync, calTotalPrice } from "../redux/features/cart/cartSlice";
import { PrductDetail_setPurchase } from "../redux/features/product/purchaseSlice";
import { useSelector, useDispatch } from "react-redux";
import Popup from "../components/products/PopUp";
import CommentBox from "../components/products/CommentBox";
import CommentList from "../components/products/CommentList";
import { NumericFormat } from "react-number-format";
function BookDetail(props) {
  // Access the URL parameters using useParams
  const dispatch = useDispatch();
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setErr] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [buy, setBuy] = useState(false);

  const [feedbacks, setFeedbacks] = useState();
  const login = useSelector((state) => state.user.login);

  function closeBuy() {
    setBuy(false);
  }
  useEffect(() => {
    {
      async function fetchBook() {
        const response = await axios.get(`/api/books/getone/${id}`);
        setBook(response.data);
        setFeedbacks(response.data.feedbacks);
        console.log("day la feedback tu server", response.data.feedbacks);
      }

      fetchBook();
    }
  }, [id]);

  useEffect(() => {
    setErr(null);
  }, [id]);

  async function AddToCart() {
    const rep = await dispatch(addCartAsync(id));
    setErr(rep);
  }

  function AddtoPurchase() {
    const obj = {
      bookid: id,
      quantity: quantity,
      pricePerBook: book.price,
      totalprice: quantity * book.price,
    };
    console.log("add to :", obj);
    try {
      const rep = dispatch(PrductDetail_setPurchase(obj));
      setBuy(true);
    } catch (err) {
      setErr(err);
    }
  }
  const Increase = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const Decrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <div className={bookdetail.page_container}>
      <Header />

      {book && (
        <div className={bookdetail.page_content}>
          <div className={bookdetail.book}>
            <img
              className={bookdetail.main_img}
              src={`../images/${id}.jpeg`}
              alt="anh"
            />
            <div className={bookdetail.bookdetail}>
              <div className={bookdetail.main_detail}>
                <p className={bookdetail.title}>{book.title}</p>{" "}
                <div className={bookdetail.author}></div>
                <span className={bookdetail.author_title}>Tác giả: </span>
                <div className={bookdetail.author_name}>
                  {book.authors.map((author) => (
                    <p key={author}>{author}</p>
                  ))}
                </div>
                <div className={bookdetail.genre}>
                  <span className={bookdetail.genre_title}>Thể loại: </span>
                  <div className={bookdetail.genre_name}>
                    {book.genres.map((genre) => (
                      <p key={genre}>{genre}</p>
                    ))}
                  </div>
                </div>
                <NumericFormat
                  value={book.price}
                  thousandSeparator=","
                  readOnly="true"
                  suffix=" VND"
                />
                <div className={bookdetail.rate_price}>
                  <p className={bookdetail.rating}>{book.rate}/5</p>
                  <p className={bookdetail.sold}>Đã bán: {book.sold}</p>
                </div>
              </div>

              <div className={bookdetail.price_control}>
                <p className={bookdetail.price}>
                  {book.price.toLocaleString()} VND
                </p>
                <div className={bookdetail.quantity_control}>
                  <button
                    className={bookdetail.setQuantity_button}
                    onClick={Increase}
                  >
                    +
                  </button>
                  <span className={bookdetail.quantity}>{quantity}</span>
                  <button
                    className={bookdetail.setQuantity_button}
                    onClick={Decrease}
                  >
                    -
                  </button>
                </div>

                <button onClick={AddToCart} className={bookdetail.cart}>
                  Thêm vào giỏ hàng
                </button>
                <p>{error}</p>

                <button className={bookdetail.buy} onClick={AddtoPurchase}>
                  {" "}
                  Mua ngay
                </button>
              </div>

              <Popup isOpen={buy} onClose={closeBuy}></Popup>
            </div>
          </div>
          <h3>Mô tả sách</h3>
          <textarea
            readOnly={true}
            value={book.description}
            style={{ width: "100%", whiteSpace: "pre-wrap" }}
            cols={30}
            rows={10}
          ></textarea>

          <div className={bookdetail.comment_section}>
            <span>Bình luận của khách hàng: </span>
            <CommentList feedback={feedbacks} />
          </div>
          <div className={bookdetail.your_comment}>
            <span>Nhận xét của bạn: </span>
            <CommentBox setFeedbacks={setFeedbacks} />
          </div>
          <BookList name="Sách được gợi ý" />
        </div>
      )}

      <Footer />
    </div>
  );
}

export default BookDetail;
