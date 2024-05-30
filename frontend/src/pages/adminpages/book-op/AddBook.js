import React, { useState } from "react";
import styles from "./AddBook.module.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getnewTk } from "../../../redux/features/user/tokenSlide";
import ImageUpload from "./ImageUpload"; // Import the ImageUpload component

const AddBook = ({ isOpen, onClose,children }) => {
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
        <span className={styles.close} onClick={onClose}>&times;</span>
        <h1>Create New Book</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={bookData.title}
            onChange={handleChange}
            placeholder="Enter book title"
          />

          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            cols="50"
            value={bookData.description}
            onChange={handleChange}
            placeholder="Enter book description"
          ></textarea>

          <label htmlFor="authors">Authors:</label>
          <input
            type="text"
            id="authors"
            name="authors"
            value={bookData.authors}
            onChange={handleChange}
            placeholder="Author names separated by commas"
          />

          <label htmlFor="genres">Genres:</label>
          <input
            type="text"
            id="genres"
            name="genres"
            value={bookData.genres}
            onChange={handleChange}
            placeholder="Genres separated by commas"
          />

          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={bookData.price}
            onChange={handleChange}
            placeholder="Enter price"
          />

          <label htmlFor="publishinghouseid">Publishing House ID:</label>
          <input
            type="text"
            id="publishinghouseid"
            name="publishinghouseid"
            value={bookData.publishinghouseid}
            onChange={handleChange}
            placeholder="Enter publishing house ID"
          />

          <label htmlFor="year">Year:</label>
          <input
            type="number"
            id="year"
            name="year"
            value={bookData.year}
            onChange={handleChange}
            placeholder="Enter year of publication"
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
