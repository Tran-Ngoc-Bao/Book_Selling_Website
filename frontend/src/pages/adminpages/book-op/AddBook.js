import React, { useState } from "react";
import styles from "./AddBook.module.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getnewTk } from "../../../redux/features/user/tokenSlide";
import ImageUpload from "./ImageUpload"; // Import the ImageUpload component

const AddBook = ({ isOpen, onClose, children }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.accessTk);

  const [bookData, setBookData] = useState({
    authors: "",
    description: "",
    genres: "",
    price: "",
    publishinghouseid: "",
    rate: "0",
    sold: "0",
    title: "",
    year: "",
    quantity: " ",
    feedbacks: [],
  });
  const [bookId, setBookId] = useState(null); // State to store the ID of the newly created book

  function closed() {
    setBookData({
      authors: "",
      description: "",
      genres: "",
      price: "",
      publishinghouseid: "",
      rate: "0",
      sold: "0",
      title: "",
      quantity: "",
      year: "",
      feedbacks: [],
    });
    onClose();
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("/api/books/admin/create", bookData, {
        headers: {
          token: token, // Assuming you're using Bearer token
        },
      });
      console.log(response);
      setBookId(response.data.insertedId); // Set the ID of the newly created book
      alert("Thêm sách thành công");
    } catch (error) {
      const newtk = await dispatch(getnewTk());
      try {
        const response = await axios.post("/api/books/admin/create", bookData, {
          headers: {
            token: newtk, // Assuming you're using Bearer token
          },
        });
        console.log(response);
        setBookId(response.data.insertedId); // Set the ID of the newly created book
        alert("Thêm sách thành công");
      } catch (err) {
        console.error("Error creating book:", error);
      }
    }
  }

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <h1>Create New Book</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Tên sách:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={bookData.title}
            onChange={handleChange}
            placeholder="Nhập tên sách: "
          />

          <label htmlFor="description">Mô tả sách:</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            cols="50"
            value={bookData.description}
            onChange={handleChange}
            placeholder="Nhập mô tả sách"
          ></textarea>

          <label htmlFor="authors">Tác giả:</label>
          <input
            type="text"
            id="authors"
            name="authors"
            value={bookData.authors}
            onChange={handleChange}
            placeholder="Tên tác giả: "
          />

          <label htmlFor="genres">Thể loại:</label>
          <input
            type="text"
            id="genres"
            name="genres"
            value={bookData.genres}
            onChange={handleChange}
            placeholder="Lịch sử, Văn học, Khoa học, Thần thoại, Huyền bí"
          />

          <label htmlFor="price">Giá bán:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={bookData.price}
            onChange={handleChange}
            placeholder="Nhập giá bán"
          />

          <label htmlFor="quantity">Số lượng:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={bookData.quantity}
            onChange={handleChange}
            placeholder="Nhập số lượng"
          />

          <label htmlFor="publishinghouseid">ID nhà xuất bản:</label>
          <input
            type="text"
            id="publishinghouseid"
            name="publishinghouseid"
            value={bookData.publishinghouseid}
            onChange={handleChange}
            placeholder="Nhập ID nhà xuất bản"
          />

          <label htmlFor="year">Năm xuất bản:</label>
          <input
            type="number"
            id="year"
            name="year"
            value={bookData.year}
            onChange={handleChange}
            placeholder="Nhập năm xuất bản"
          />

          <button type="submit">Submit</button>
        </form>
        {/* Conditionally render ImageUpload component within the overlay */}
        {bookId && <ImageUpload bookId={bookId} closed={closed} />}
      </div>
    </div>
  );
};

export default AddBook;
