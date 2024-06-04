import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getnewTk } from "../../../../redux/features/user/tokenSlide";
import BookDetailAdminStyles from "./BookDetailAdmin.module.css";

function BookDetailAdmin() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [formValues, setFormValues] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const isadmin = useSelector((state) => state.user.isadmin);
  const token = useSelector((state) => state.token.accessTk);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchBook() {
      const response = await axios.get(`/api/books/getone/${id}`);
      setBook(response.data);
      const { _id, authors, genres, ...rest } = response.data;
      setFormValues({
        ...rest,
        authors: authors.join(", "),
        genres: genres.join(", "),
      });
    }

    fetchBook();
  }, [id]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  const handleFormSubmit = async () => {
    const updatedFormValues = {
      ...formValues,
      authors: formValues.authors.split(",").map((author) => author.trim()),
      genres: formValues.genres.split(",").map((genre) => genre.trim()),
    };
    try {
      const response = await axios.put(
        `/api/books/update/${id}`,
        updatedFormValues,
        {
          headers: {
            token: token,
          },
        }
      );
      console.log(response);
      setBook(updatedFormValues);
      setEditMode(false);
      alert(response.data.message);
    } catch (error) {
      const newtk = await dispatch(getnewTk());
      try {
        const response = await axios.put(
          `/api/books/update/${id}`,
          updatedFormValues,
          {
            headers: {
              token: newtk,
            },
          }
        );
        console.log(response);
        setBook(updatedFormValues);
        setEditMode(false);
        alert(response.data.message);
      } catch (err) {
        console.error("Error updating book:", error);
      }
    }
  };

  return (
    <div className={BookDetailAdminStyles.container}>
      {isadmin && book && (
        <div>
          <img
            className={BookDetailAdminStyles.image}
            src={`http://localhost:8000/images/${id}.jpeg`}
            width={200}
            height={200}
            alt={book.title}
          />
          <form
            className={BookDetailAdminStyles.form}
            onSubmit={handleFormSubmit}
          >
            <div className={BookDetailAdminStyles.formGroup}>
              <label className={BookDetailAdminStyles.label} htmlFor="title">
                Tên sách:
              </label>
              <input
                className={BookDetailAdminStyles.input}
                id="title"
                type="text"
                value={formValues.title}
                onChange={handleInputChange}
                readOnly={!editMode}
              />
            </div>
            <div className={BookDetailAdminStyles.formGroup}>
              <label className={BookDetailAdminStyles.label} htmlFor="authors">
                Tác giả:
              </label>
              <input
                className={BookDetailAdminStyles.input}
                id="authors"
                type="text"
                value={formValues.authors}
                onChange={handleInputChange}
                readOnly={!editMode}
              />
            </div>
            <div className={BookDetailAdminStyles.formGroup}>
              <label className={BookDetailAdminStyles.label} htmlFor="genres">
                Thể loại:
              </label>
              <input
                className={BookDetailAdminStyles.input}
                id="genres"
                type="text"
                value={formValues.genres}
                onChange={handleInputChange}
                readOnly={!editMode}
              />
            </div>
            <div className={BookDetailAdminStyles.formGroup}>
              <label className={BookDetailAdminStyles.label} htmlFor="price">
                Giá bán:
              </label>
              <input
                className={BookDetailAdminStyles.input}
                id="price"
                type="number"
                value={formValues.price}
                onChange={handleInputChange}
                readOnly={!editMode}
              />
            </div>
            <div className={BookDetailAdminStyles.formGroup}>
              <label className={BookDetailAdminStyles.label} htmlFor="quantity">
                Số lượng:
              </label>
              <input
                className={BookDetailAdminStyles.input}
                id="quantity"
                type="number"
                value={formValues.quantity}
                onChange={handleInputChange}
                readOnly={!editMode}
              />
            </div>
            <div className={BookDetailAdminStyles.formGroup}>
              <label
                className={BookDetailAdminStyles.label}
                htmlFor="description"
              >
                Mô tả sách:
              </label>
              <textarea
                className={BookDetailAdminStyles.textarea}
                id="description"
                value={formValues.description}
                onChange={handleInputChange}
                readOnly={!editMode}
                style={{ width: "100%", whiteSpace: "pre-wrap" }}
                cols={30}
                rows={10}
              ></textarea>
            </div>
            <div className={BookDetailAdminStyles.formGroup}>
              <label className={BookDetailAdminStyles.label} htmlFor="year">
                Năm xuất bản:
              </label>
              <input
                className={BookDetailAdminStyles.input}
                id="year"
                type="number"
                value={formValues.year}
                onChange={handleInputChange}
                readOnly={!editMode}
              />
            </div>
            <p className={BookDetailAdminStyles.mode}>
              Đây là: {editMode ? "Edit Mode" : "View Mode"}
            </p>
            {editMode ? (
              <div className={BookDetailAdminStyles.buttons}>
                <button
                  className={`${BookDetailAdminStyles.button} ${BookDetailAdminStyles.cancel}`}
                  onClick={(event) => {
                    event.preventDefault();
                    setEditMode(false);
                  }}
                >
                  Quay lại
                </button>
                <button
                  className={`${BookDetailAdminStyles.button} ${BookDetailAdminStyles.submit}`}
                  onClick={async (event) => {
                    event.preventDefault();
                    setEditMode(false);
                    await handleFormSubmit();
                    console.log(formValues);
                  }}
                >
                  Submit
                </button>
              </div>
            ) : (
              <button
                className={`${BookDetailAdminStyles.button} ${BookDetailAdminStyles.edit}`}
                onClick={(event) => {
                  event.preventDefault();
                  setEditMode(true);
                }}
              >
                Edit
              </button>
            )}
          </form>
        </div>
      )}
    </div>
  );
}

export default BookDetailAdmin;
